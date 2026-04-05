import { useState } from "react";
import { Button } from "../../components/ui/button";
import { ImageUpload } from "../../components/ui/image-upload";
import { Textarea } from "../../components/ui/textarea";
import axios from "axios";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { ArrowLeft, Download } from "lucide-react";
import { useAuthStore } from "../../stores/useAuthStore";
import { toast } from "sonner";

// Predefined prompt templates
const promptTemplates = {
  model: "Generate a high-quality 1:1 ratio image of an Indian model wearing the uploaded product. The model should stand in a stylish ecommerce pose with a fashionable background with a styling pose (if it is an accessory then focus on it no model). The product must look realistic, well-lit, and fashion-focused.",
  photoshoot: "Generate a professional product photoshoot image of the uploaded item. Use a modern studio setting with soft lighting, realistic textures, and a clean background. Highlight the product clearly for ecommerce use.",
  instagramPost: "Create a stylish socail media post featuring the uploaded product. Use an aesthetic background, vibrant colors, and trendy composition. The focus should remain on the product while looking social-media ready also a text on a fahionable way behind the model front of background, Text - New Arrival",
  instagramStory: "Generate a vertical Instagram Story image featuring the uploaded product. Use a minimal but modern layout with bold highlights, clean background, and attention-grabbing framing."
};

const GenerateModel = ({ field }) => {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState(promptTemplates.model);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState()
  const { currentUser } = useAuthStore()
  
  const [remaining, setRemaining] = useState(currentUser?.oneTimeCredits + currentUser?.subscriptionCredits)

  const [selectedType, setSelectedType] = useState("model");

  const generate = async () => {
    if (!image && !prompt) return;
    setIsLoading(true);
    const token = localStorage.getItem('token')
    const formData = new FormData();
    formData.append("image", image);
    formData.append("prompt", prompt);

    try {
      const sendData = await axios.post(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/api/generate-model`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // 👈 add your token here
          }
        }
      );

      setGeneratedImage(sendData.data.images[0]);
      setRemaining((prev) => prev - 5)
    } catch (error) {
      setError(error.data.message || "Cannot Generate Model")
      toast.error("Error creating model please try again later")
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "generated-model.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-row space-x-2">
        <p className="text-gray-500">Remaining Generations: </p>
        <p className="font-medium text-gray-900">
          {remaining}
        </p>
        <p>5 credits for each image genrations</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold">AI Model Image Generator</h1>

        {generatedImage && (
          <Button onClick={() => setGeneratedImage(null)} className="flex flex-row space-x-2">
            <ArrowLeft /> <span>Go Back</span>
          </Button>
        )}

        {!generatedImage && !isLoading && (
          <div className="w-full flex flex-col gap-4">
            <p className="text-gray-600 text-center">
              Upload your product image and select a generation style.
            </p>

            {/* Image Upload */}
            <ImageUpload
              value={field?.value}
              onChange={(file) => {
                setImage(file);
                if (!file) field?.onChange?.("");
              }}
              onUrlChange={(url) => {
                field?.onChange?.(url);
              }}
              placeholder="Upload product image or enter URL"
            />

            {/* Prompt Template Selector */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(promptTemplates).map((key) => (
                <Button
                  key={key}
                  variant={selectedType === key ? "default" : "outline"}
                  onClick={() => {
                    setSelectedType(key);
                    setPrompt(promptTemplates[key]);
                  }}
                >
                  {key === "model" && "AI Model"}
                  {key === "photoshoot" && "Photoshoot"}
                  {key === "instagramPost" && "Instagram Post"}
                  {key === "instagramStory" && "Instagram Story"}
                </Button>
              ))}
            </div>

            {/* Editable Prompt Box */}
            <Textarea
              placeholder="Enter your prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
            />

            <Button type="button" onClick={generate} className="w-full">
              Generate
            </Button>
          </div>
        )}

        {isLoading && (
          <div className="w-full h-64 bg-gray-200 animate-pulse rounded-xl" />
        )}

        {!isLoading && generatedImage && (
          <div className="relative mt-6">
            <img
              src={generatedImage}
              alt="Generated Model"
              className="max-w-sm rounded-xl shadow-lg"
            />
            <button
              onClick={downloadImage}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
              title="Download Image"
            >
              <Download className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default GenerateModel;