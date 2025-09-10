import { useState } from "react";
import { Button } from "../../components/ui/button";
import { ImageUpload } from "../../components/ui/image-upload";
import { Input } from "../../components/ui/input";
import axios from "axios";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { ArrowLeft, Download } from "lucide-react";

const GenerateModel = ({ field }) => {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState(
    "Generate a high-quality 1:1 ratio image of an Indian model wearing the product shown in the reference image The model should be standing in a stylish pose, similar to an ecommerce product catalog photo. The background should be clean, minimal. The clothing or accessory should be clearly visible, well-lit, and natural-looking. Make the model appear realistic, fashionable, and professional, suitable for online shopping platforms."
  );
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    if (!image && !prompt) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("prompt", prompt);

    try {
      const sendData = await axios.post(
        "http://localhost:5000/api/generate-model",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setGeneratedImage(sendData.data.images[0]);
    } catch (error) {
      console.log(error);
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

//   const downloadImage = () => {
//     const link = document.createElement("a");
//     link.href = generatedImage;
//     link.download = "generated-model.png";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center gap-6 p-8 max-w-2xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl font-semibold">AI Model Generator</h1>

        {/* Back Button */}
        {generatedImage && (
          <Button
            onClick={() => setGeneratedImage(null)}
            className="flex flex-row space-x-2"
          >
            <ArrowLeft /> <span>Go Back</span>
          </Button>
        )}

        {/* Initial Form */}
        {!generatedImage && !isLoading && (
          <div className="w-full flex flex-col gap-4">
            <p className="text-gray-600 text-center">
              Upload your product image and provide a prompt. Our AI will
              generate a model wearing your product.
            </p>

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

            <Input
              placeholder="Enter your prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <Button type="button" onClick={generate} className="w-full">
              Generate
            </Button>
          </div>
        )}

        {/* Loader */}
        {isLoading && (
          <div className="w-full h-64 bg-gray-200 animate-pulse rounded-xl" />
        )}

        {/* Generated Image */}
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


// import { useState } from "react";
// import { Button } from "../../components/ui/button";
// import { ImageUpload } from "../../components/ui/image-upload";
// import { Input } from "../../components/ui/input";
// import axios from "axios";
// import DashboardLayout from "../../components/layout/DashboardLayout";
// import { ArrowLeft, Download } from "lucide-react";

// const GenerateModel = ({ field }) => {
//     const [image, setImage] = useState(null);
//     const [prompt, setPrompt] = useState("Generate an indian model wearing this product");
//     const [generatedImage, setGeneratedImage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);

//     const generate = async () => {
//         if (!image && !prompt) return;
//         setIsLoading(true);


//         const formData = new FormData();
//         formData.append("image", image);
//         formData.append("prompt", prompt);

//         try {
//             const sendData = await axios.post("http://localhost:5000/api/generate-model", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });
//             console.log(sendData);
//             setGeneratedImage(sendData.data.images[0]);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const downloadImage = () => {
//         const link = document.createElement("a");
//         link.href = generatedImage;
//         link.download = "generated-model.png";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     return (
//         <DashboardLayout>
//             <div className="flex flex-col items-center justify-center gap-6 p-8 max-w-2xl mx-auto">
//                 {/* Heading */}
//                 <h1 className="text-3xl font-semibold">AI Model Generator</h1>
//                 {generatedImage && <Button onClick={setGeneratedImage(null)} className="flex flex-row space-x-2">
//                     <ArrowLeft /> <p>Go Back</p>
//                 </Button>}
//                 {
//                     !generatedImage && <div className="w-full flex flex-col gap-4">
//                         <p className="text-gray-600 text-center">
//                             Upload your product image and provide a prompt.
//                             Our AI will generate a model wearing your product.
//                         </p>
//                         <ImageUpload
//                             value={field?.value}
//                             onChange={(file) => {
//                                 setImage(file);
//                                 if (!file) field?.onChange?.("");
//                             }}
//                             onUrlChange={(url) => {
//                                 field?.onChange?.(url);
//                             }}
//                             placeholder="Upload product image or enter URL"
//                         />

//                         <Input
//                             placeholder="Enter your prompt"
//                             value={prompt}
//                             onChange={(e) => setPrompt(e.target.value)}
//                         />

//                         <Button type="button" onClick={generate} className="w-full">
//                             Generate
//                         </Button>
//                     </div>
//                 }

//                 {/* Generated Image with overlay download */}
//                 {/* {generatedImage && (
//                     <div className="relative mt-6">
//                         <img
//                             src={generatedImage}
//                             alt="Generated Model"
//                             className="max-w-sm rounded-xl shadow-lg"
//                         />

//                         <button
//                             onClick={downloadImage}
//                             className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
//                             title="Download Image"
//                         >
//                             <Download className="w-5 h-5 text-gray-700" />
//                         </button>
//                     </div>
//                 )} */}
//                 {isLoading ? (
//                     <div className="w-full h-64 bg-gray-200 animate-pulse rounded-xl" />
//                 ) : generatedImage ? (
//                     <div className="relative mt-6">
//                         <img
//                             src={generatedImage}
//                             alt="Generated Model"
//                             className="max-w-sm rounded-xl shadow-lg"
//                         />

//                         <button
//                             onClick={downloadImage}
//                             className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
//                             title="Download Image"
//                         >
//                             <Download className="w-5 h-5 text-gray-700" />
//                         </button>
//                     </div>
//                 ) : null}

//             </div>
//         </DashboardLayout>
//     );
// };

// export default GenerateModel;
