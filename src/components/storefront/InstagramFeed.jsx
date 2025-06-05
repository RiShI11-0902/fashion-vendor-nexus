
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Instagram, ExternalLink, Heart, MessageCircle } from "lucide-react";
import { useStoreManager } from "../../stores/useStoreManager";
import { toast } from "sonner";

const InstagramFeed = ({ storeId, currentSettings = {} }) => {
  const { updateStore } = useStoreManager();
  const [settings, setSettings] = useState({
    enabled: currentSettings.enabled || false,
    username: currentSettings.username || '',
    feedTitle: currentSettings.feedTitle || 'Follow us on Instagram',
    postsCount: currentSettings.postsCount || 6,
    showMetrics: currentSettings.showMetrics !== false,
    ...currentSettings
  });

  // Mock Instagram posts for preview
  const mockPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
      likes: 1234,
      comments: 56
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop",
      likes: 892,
      comments: 23
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop",
      likes: 2156,
      comments: 78
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop",
      likes: 765,
      comments: 34
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1506629905627-99d2994b29c5?w=300&h=300&fit=crop",
      likes: 1543,
      comments: 67
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop",
      likes: 998,
      comments: 45
    }
  ];

  const handleSave = () => {
    updateStore(storeId, { instagramFeed: settings });
    toast.success("Instagram feed settings updated!");
  };

  const handleUsernameChange = (value) => {
    setSettings({...settings, username: value.replace('@', '')});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Instagram className="h-5 w-5 mr-2" />
          Instagram Feed
        </CardTitle>
        <CardDescription>
          Display your Instagram posts on your storefront
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="enableFeed" className="font-medium">Enable Instagram Feed</Label>
            <p className="text-sm text-muted-foreground">Show Instagram posts on your store</p>
          </div>
          <Switch
            id="enableFeed"
            checked={settings.enabled}
            onCheckedChange={(checked) => setSettings({...settings, enabled: checked})}
          />
        </div>

        {settings.enabled && (
          <>
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Instagram Username</Label>
              <Input
                id="username"
                placeholder="your_instagram_handle"
                value={settings.username}
                onChange={(e) => handleUsernameChange(e.target.value)}
              />
            </div>

            {/* Feed Title */}
            <div className="space-y-2">
              <Label htmlFor="feedTitle">Feed Title</Label>
              <Input
                id="feedTitle"
                placeholder="Follow us on Instagram"
                value={settings.feedTitle}
                onChange={(e) => setSettings({...settings, feedTitle: e.target.value})}
              />
            </div>

            {/* Posts Count */}
            <div className="space-y-2">
              <Label htmlFor="postsCount">Number of Posts to Show</Label>
              <select 
                id="postsCount"
                value={settings.postsCount}
                onChange={(e) => setSettings({...settings, postsCount: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                <option value={3}>3 posts</option>
                <option value={6}>6 posts</option>
                <option value={9}>9 posts</option>
                <option value={12}>12 posts</option>
              </select>
            </div>

            {/* Show Metrics */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showMetrics" className="font-medium">Show Likes & Comments</Label>
                <p className="text-sm text-muted-foreground">Display engagement metrics on posts</p>
              </div>
              <Switch
                id="showMetrics"
                checked={settings.showMetrics}
                onCheckedChange={(checked) => setSettings({...settings, showMetrics: checked})}
              />
            </div>

            {/* Preview */}
            <div className="space-y-3">
              <Label className="font-medium">Preview</Label>
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4 text-center">
                  {settings.feedTitle}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {mockPosts.slice(0, settings.postsCount).map((post) => (
                    <div key={post.id} className="relative group cursor-pointer">
                      <img 
                        src={post.image} 
                        alt="Instagram post"
                        className="w-full aspect-square object-cover rounded"
                      />
                      {settings.showMetrics && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center text-white text-sm">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              {post.likes}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {post.comments}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {settings.username && (
                  <div className="text-center mt-4">
                    <Button variant="outline" size="sm" className="inline-flex items-center">
                      <Instagram className="h-4 w-4 mr-2" />
                      @{settings.username}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <Button onClick={handleSave} className="w-full">
          Save Instagram Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default InstagramFeed;
