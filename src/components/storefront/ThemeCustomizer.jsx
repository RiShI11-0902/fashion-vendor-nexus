
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Palette, Layout, Moon, Sun } from "lucide-react";
import { useStoreManager } from "../../stores/useStoreManager";
import { toast } from "sonner";

const ThemeCustomizer = ({ storeId, currentTheme = {} }) => {
  const { updateStore } = useStoreManager();
  const [theme, setTheme] = useState({
    mode: currentTheme.mode || 'light',
    layout: currentTheme.layout || 'grid',
    primaryColor: currentTheme.primaryColor || 'blue',
    showBanner: currentTheme.showBanner !== false,
    compactMode: currentTheme.compactMode || false,
    ...currentTheme
  });

  const handleSave = () => {
    updateStore(storeId, { theme });
    toast.success("Theme updated successfully!");
  };

  const layoutOptions = [
    { value: 'grid', label: 'Grid Layout', description: 'Products in a grid formation' },
    { value: 'list', label: 'List Layout', description: 'Products in a vertical list' },
    { value: 'masonry', label: 'Masonry Layout', description: 'Pinterest-style layout' }
  ];

  const colorOptions = [
    { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
    { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
    { value: 'green', label: 'Green', color: 'bg-green-500' },
    { value: 'pink', label: 'Pink', color: 'bg-pink-500' },
    { value: 'orange', label: 'Orange', color: 'bg-orange-500' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="h-5 w-5 mr-2" />
          Theme Customization
        </CardTitle>
        <CardDescription>
          Customize the look and feel of your storefront
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Mode */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Theme Mode</Label>
          <RadioGroup 
            value={theme.mode} 
            onValueChange={(value) => setTheme({...theme, mode: value})}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="flex items-center">
                <Sun className="h-4 w-4 mr-1" />
                Light
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="flex items-center">
                <Moon className="h-4 w-4 mr-1" />
                Dark
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Layout Options */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center">
            <Layout className="h-4 w-4 mr-1" />
            Layout Style
          </Label>
          <RadioGroup 
            value={theme.layout} 
            onValueChange={(value) => setTheme({...theme, layout: value})}
          >
            {layoutOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <div>
                  <Label htmlFor={option.value} className="font-medium">
                    {option.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Primary Color */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Primary Color</Label>
          <div className="flex space-x-3">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => setTheme({...theme, primaryColor: color.value})}
                className={`w-8 h-8 rounded-full ${color.color} ${
                  theme.primaryColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                }`}
                title={color.label}
              />
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showBanner" className="font-medium">Show Store Banner</Label>
              <p className="text-sm text-muted-foreground">Display banner image at the top</p>
            </div>
            <Switch
              id="showBanner"
              checked={theme.showBanner}
              onCheckedChange={(checked) => setTheme({...theme, showBanner: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compactMode" className="font-medium">Compact Mode</Label>
              <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
            </div>
            <Switch
              id="compactMode"
              checked={theme.compactMode}
              onCheckedChange={(checked) => setTheme({...theme, compactMode: checked})}
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Theme Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default ThemeCustomizer;
