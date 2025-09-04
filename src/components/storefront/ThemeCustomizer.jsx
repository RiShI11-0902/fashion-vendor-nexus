
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
    primaryColor: currentTheme.primaryColor || 'blue',
    secondaryColor: currentTheme.secondaryColor || 'gray',
    accentColor: currentTheme.accentColor || 'pink',
    backgroundColor: currentTheme.backgroundColor || 'white',
    textColor: currentTheme.textColor || 'dark',
    borderRadius: currentTheme.borderRadius || 'medium',
    colorScheme: currentTheme.colorScheme || 'modern',
    gradient: currentTheme.gradient || 'none',
    shadowStyle: currentTheme.shadowStyle || 'soft',
    animation: currentTheme.animation || 'subtle',
    ...currentTheme
  });

  const handleSave = () => {
    updateStore(storeId, { theme });
    toast.success("Theme updated successfully!");
  };

  const colorSchemes = [
    { value: 'modern', label: 'Modern', description: 'Clean and contemporary' },
    { value: 'vintage', label: 'Vintage', description: 'Classic and timeless' },
    { value: 'minimalist', label: 'Minimalist', description: 'Simple and elegant' },
    { value: 'vibrant', label: 'Vibrant', description: 'Bold and energetic' },
    { value: 'pastel', label: 'Pastel', description: 'Soft and gentle' },
    { value: 'monochrome', label: 'Monochrome', description: 'Black and white' }
  ];

  const primaryColors = [
    { value: 'blue', label: 'Ocean Blue', color: 'bg-blue-500' },
    { value: 'purple', label: 'Royal Purple', color: 'bg-purple-500' },
    { value: 'green', label: 'Forest Green', color: 'bg-green-500' },
    { value: 'pink', label: 'Rose Pink', color: 'bg-pink-500' },
    { value: 'orange', label: 'Sunset Orange', color: 'bg-orange-500' },
    { value: 'red', label: 'Cherry Red', color: 'bg-red-500' },
    { value: 'teal', label: 'Turquoise', color: 'bg-teal-500' },
    { value: 'indigo', label: 'Deep Indigo', color: 'bg-indigo-500' },
    { value: 'yellow', label: 'Golden Yellow', color: 'bg-yellow-500' },
    { value: 'slate', label: 'Slate Gray', color: 'bg-slate-500' }
  ];

  const secondaryColors = [
    { value: 'gray', label: 'Neutral Gray', color: 'bg-gray-400' },
    { value: 'blue-gray', label: 'Blue Gray', color: 'bg-blue-gray-400' },
    { value: 'warm-gray', label: 'Warm Gray', color: 'bg-stone-400' },
    { value: 'cool-gray', label: 'Cool Gray', color: 'bg-slate-400' }
  ];

  const gradientOptions = [
    { value: 'none', label: 'No Gradient' },
    { value: 'sunset', label: 'Sunset' },
    { value: 'ocean', label: 'Ocean' },
    { value: 'forest', label: 'Forest' },
    { value: 'rainbow', label: 'Rainbow' },
    { value: 'cosmic', label: 'Cosmic' }
  ];

  const borderRadiusOptions = [
    { value: 'none', label: 'Sharp', description: 'No rounded corners' },
    { value: 'small', label: 'Subtle', description: 'Slightly rounded' },
    { value: 'medium', label: 'Modern', description: 'Medium rounded' },
    { value: 'large', label: 'Soft', description: 'Very rounded' },
    { value: 'full', label: 'Pills', description: 'Fully rounded' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Color Scheme */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Palette className="h-5 w-5 mr-2" />
            Color Scheme
          </CardTitle>
          <CardDescription>Choose a pre-designed color palette</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup 
            value={theme.colorScheme} 
            onValueChange={(value) => setTheme({...theme, colorScheme: value})}
          >
            {colorSchemes.map((scheme) => (
              <div key={scheme.value} className="flex items-center space-x-2">
                <RadioGroupItem value={scheme.value} id={scheme.value} />
                <div>
                  <Label htmlFor={scheme.value} className="font-medium">
                    {scheme.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{scheme.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Theme Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Moon className="h-5 w-5 mr-2" />
            Theme Mode
          </CardTitle>
          <CardDescription>Light or dark appearance</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={theme.mode} 
            onValueChange={(value) => setTheme({...theme, mode: value})}
            className="flex space-x-6"
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
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="auto" id="auto" />
              <Label htmlFor="auto">Auto</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Primary Color */}
      <Card>
        <CardHeader>
          <CardTitle>Primary Color</CardTitle>
          <CardDescription>Main brand color for buttons and accents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {primaryColors.map((color) => (
              <button
                key={color.value}
                onClick={() => setTheme({...theme, primaryColor: color.value})}
                className={`aspect-square rounded-lg ${color.color} ${
                  theme.primaryColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                } hover:scale-105 transition-transform`}
                title={color.label}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Secondary Color */}
      <Card>
        <CardHeader>
          <CardTitle>Secondary Color</CardTitle>
          <CardDescription>Supporting color for backgrounds and text</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {secondaryColors.map((color) => (
              <button
                key={color.value}
                onClick={() => setTheme({...theme, secondaryColor: color.value})}
                className={`h-12 rounded-lg ${color.color} ${
                  theme.secondaryColor === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                } hover:scale-105 transition-transform flex items-center justify-center text-white font-medium`}
                title={color.label}
              >
                {color.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Border Radius */}
      <Card>
        <CardHeader>
          <CardTitle>Corner Style</CardTitle>
          <CardDescription>Roundness of buttons and cards</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={theme.borderRadius} 
            onValueChange={(value) => setTheme({...theme, borderRadius: value})}
          >
            {borderRadiusOptions.map((option) => (
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
        </CardContent>
      </Card>

      {/* Gradient Background */}
      <Card>
        <CardHeader>
          <CardTitle>Background Gradient</CardTitle>
          <CardDescription>Add a gradient background effect</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={theme.gradient} 
            onValueChange={(value) => setTheme({...theme, gradient: value})}
          >
            {gradientOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="font-medium">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="lg:col-span-2">
        <Button onClick={handleSave} className="w-full" size="lg">
          Save Theme Settings
        </Button>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
