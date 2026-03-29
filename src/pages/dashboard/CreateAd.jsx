import { useState } from "react";
import { Button } from "../../components/ui/button";
import { ImageUpload } from "../../components/ui/image-upload";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  ArrowLeft,
  Download,
  Plus,
  Image as ImageIcon,
  Video,
  Sparkles,
  Clock,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

const adTemplates = {
  productShowcase:
    "Create a stunning product showcase ad featuring the uploaded clothing item. Use a clean, modern background with bold typography highlighting the brand. Make it scroll-stopping and premium looking.",
  saleBanner:
    "Design a vibrant sale banner ad for the uploaded clothing product. Include eye-catching '% OFF' text, urgency elements, and a trendy layout perfect for social media ads.",
  ugcStyle:
    "Generate a UGC-style ad with a human model wearing the uploaded clothing item. Make it look natural, authentic, and relatable — like a real customer testimonial video thumbnail.",
  instagramAd:
    "Create a high-converting Instagram ad for the uploaded clothing item. Use aesthetic gradients, bold call-to-action elements, and fashion-forward styling.",
  storyAd:
    "Generate a vertical story ad (9:16) featuring the uploaded clothing product with trendy animations-ready layout, swipe-up CTA area, and lifestyle branding.",
};

const CreateAd = () => {
  const [ads, setAds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState(adTemplates.productShowcase);
  const [selectedTemplate, setSelectedTemplate] = useState("productShowcase");
  const [adType, setAdType] = useState("image");
  const [adTitle, setAdTitle] = useState("");
  const [targetPlatform, setTargetPlatform] = useState("instagram");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);

  const platforms = [
    { value: "instagram", label: "Instagram" },
    { value: "facebook", label: "Facebook" },
    { value: "youtube", label: "YouTube" },
    { value: "tiktok", label: "TikTok" },
    { value: "whatsapp", label: "WhatsApp Status" },
  ];

  const generateAd = async () => {
    if (!image && !imageUrl) {
      toast.error("Please upload a product image");
      return;
    }
    if (!adTitle.trim()) {
      toast.error("Please enter an ad title");
      return;
    }

    setIsLoading(true);

    try {
      // Dummy API simulation
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const dummyResult = {
        id: Date.now().toString(),
        title: adTitle,
        type: adType,
        platform: targetPlatform,
        prompt,
        template: selectedTemplate,
        sourceImage: imageUrl || URL.createObjectURL(image),
        generatedUrl:
          adType === "image"
            ? "https://placehold.co/1080x1080/1a1a2e/e94560?text=AI+Generated+Ad"
            : "https://placehold.co/1080x1920/1a1a2e/e94560?text=AI+Video+Ad",
        createdAt: new Date().toISOString(),
        status: "completed",
      };

      setGeneratedResult(dummyResult);
      setAds((prev) => [dummyResult, ...prev]);
      toast.success("Ad generated successfully!");
    } catch {
      toast.error("Failed to generate ad. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAd = (id) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
    toast.success("Ad deleted");
  };

  const downloadAd = (ad) => {
    const link = document.createElement("a");
    link.href = ad.generatedUrl;
    link.download = `${ad.title}-ad.${ad.type === "image" ? "png" : "mp4"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setShowForm(false);
    setGeneratedResult(null);
    setImage(null);
    setImageUrl("");
    setAdTitle("");
    setPrompt(adTemplates.productShowcase);
    setSelectedTemplate("productShowcase");
    setAdType("image");
    setTargetPlatform("instagram");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                AI Ad Creator
              </h1>
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">Coming Soon</span>
            </div>
            <p className="text-muted-foreground mt-1">
              Create stunning image & video ads for your clothing store
            </p>
          </div>
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" /> Create New Ad
            </Button>
          )}
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="bg-white/[0.03] rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-pink-400" />
                New Ad
              </h2>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            </div>

            {!generatedResult && !isLoading && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left - Form */}
                <div className="space-y-5">
                  {/* Ad Title */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Ad Title</Label>
                    <Input
                      value={adTitle}
                      onChange={(e) => setAdTitle(e.target.value)}
                      placeholder="e.g. Summer Collection Launch"
                      className="bg-white/[0.05] text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Ad Type */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Ad Type</Label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setAdType("image")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                          adType === "image"
                            ? "bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-pink-400 ring-1 ring-pink-500/30"
                            : "bg-white/[0.05] text-muted-foreground hover:bg-white/[0.08]"
                        }`}
                      >
                        <ImageIcon className="h-4 w-4" /> Image Ad
                      </button>
                      <button
                        onClick={() => setAdType("video")}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                          adType === "video"
                            ? "bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-pink-400 ring-1 ring-pink-500/30"
                            : "bg-white/[0.05] text-muted-foreground hover:bg-white/[0.08]"
                        }`}
                      >
                        <Video className="h-4 w-4" /> Video Ad (UGC)
                      </button>
                    </div>
                  </div>

                  {/* Target Platform */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Target Platform</Label>
                    <div className="flex flex-wrap gap-2">
                      {platforms.map((p) => (
                        <button
                          key={p.value}
                          onClick={() => setTargetPlatform(p.value)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            targetPlatform === p.value
                              ? "bg-pink-500/20 text-pink-400 ring-1 ring-pink-500/30"
                              : "bg-white/[0.05] text-muted-foreground hover:bg-white/[0.08]"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Template */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Ad Style</Label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(adTemplates).map(([key]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedTemplate(key);
                            setPrompt(adTemplates[key]);
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            selectedTemplate === key
                              ? "bg-violet-500/20 text-violet-400 ring-1 ring-violet-500/30"
                              : "bg-white/[0.05] text-muted-foreground hover:bg-white/[0.08]"
                          }`}
                        >
                          {key === "productShowcase" && "Product Showcase"}
                          {key === "saleBanner" && "Sale Banner"}
                          {key === "ugcStyle" && "UGC Style"}
                          {key === "instagramAd" && "Instagram Ad"}
                          {key === "storyAd" && "Story Ad"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prompt */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Prompt</Label>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={5}
                      className="bg-white/[0.05] text-foreground placeholder:text-muted-foreground resize-none"
                      placeholder="Describe your ad..."
                    />
                  </div>
                </div>

                {/* Right - Image Upload */}
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-foreground">Product Image</Label>
                    <ImageUpload
                      value={imageUrl}
                      onChange={(file) => setImage(file)}
                      onUrlChange={(url) => setImageUrl(url)}
                      placeholder="Upload product image"
                    />
                  </div>

                  <Button
                    onClick={generateAd}
                    className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white py-6 text-lg"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate {adType === "image" ? "Image" : "Video"} Ad
                  </Button>
                </div>
              </div>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 animate-spin opacity-30" />
                  <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-pink-400 animate-pulse" />
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Generating your {adType} ad with AI...
                </p>
                <p className="text-xs text-muted-foreground/60">
                  This may take a few seconds
                </p>
              </div>
            )}

            {/* Result */}
            {generatedResult && !isLoading && (
              <div className="flex flex-col items-center space-y-6">
                <div className="relative group">
                  {generatedResult.type === "image" ? (
                    <img
                      src={generatedResult.generatedUrl}
                      alt={generatedResult.title}
                      className="max-w-md w-full rounded-2xl shadow-2xl shadow-pink-500/10"
                    />
                  ) : (
                    <div className="max-w-md w-full aspect-[9/16] rounded-2xl bg-white/[0.05] flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Video className="h-12 w-12 text-pink-400 mx-auto" />
                        <p className="text-muted-foreground text-sm">
                          Video preview
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => downloadAd(generatedResult)}
                    variant="outline"
                    className="text-foreground"
                  >
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                  <Button
                    onClick={resetForm}
                    className="bg-gradient-to-r from-pink-500 to-violet-500 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Create Another
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Ads Grid */}
        {ads.length > 0 && !showForm && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Your Ads ({ads.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {ads.map((ad) => (
                <div
                  key={ad.id}
                  className="group bg-white/[0.03] rounded-2xl overflow-hidden hover:bg-white/[0.06] transition-all"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={ad.generatedUrl}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-pink-500/80 text-white">
                        {ad.type}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-violet-500/80 text-white">
                        {ad.platform}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => downloadAd(ad)}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteAd(ad.id)}
                        className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-foreground text-sm font-medium truncate">
                      {ad.title}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">
                        {new Date(ad.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {ads.length === 0 && !showForm && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500/10 to-violet-500/10 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              No ads yet
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              Create your first AI-powered ad by uploading a product image and
              choosing an ad style.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Create Your First Ad
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreateAd;
