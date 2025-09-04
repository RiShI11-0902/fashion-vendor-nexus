import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Palette, Type, Image, Star, Badge, Sparkles } from "lucide-react";
import { useStoreManager } from "../../stores/useStoreManager";
import { toast } from "sonner";

const BrandingCustomizer = ({ storeId, currentSettings = {} }) => {
  const { updateStore } = useStoreManager();
  const [settings, setSettings] = useState({
    logoPosition: currentSettings.logoPosition || 'left',
    fontFamily: currentSettings.fontFamily || 'inter',
    headingFont: currentSettings.headingFont || 'same',
    fontSize: currentSettings.fontSize || 'medium',
    buttonStyle: currentSettings.buttonStyle || 'rounded',
    iconStyle: currentSettings.iconStyle || 'outline',
    customCSS: currentSettings.customCSS || '',
    watermark: currentSettings.watermark || '',
    showBranding: currentSettings.showBranding !== false,
    customFavicon: currentSettings.customFavicon || '',
    metaDescription: currentSettings.metaDescription || '',
    socialShareImage: currentSettings.socialShareImage || '',
    brandColors: currentSettings.brandColors || {
      primary: '#3B82F6',
      secondary: '#64748B',
      accent: '#EC4899'
    },
    ...currentSettings
  });

  const handleSave = () => {
    updateStore(storeId, { brandingSettings: settings });
    toast.success("Branding settings updated successfully!");
  };

  const fontFamilies = [
    { value: 'inter', label: 'Inter', description: 'Modern and clean' },
    { value: 'roboto', label: 'Roboto', description: 'Google\'s friendly font' },
    { value: 'opensans', label: 'Open Sans', description: 'Highly readable' },
    { value: 'playfair', label: 'Playfair Display', description: 'Elegant serif' },
    { value: 'montserrat', label: 'Montserrat', description: 'Geometric and modern' },
    { value: 'lora', label: 'Lora', description: 'Contemporary serif' },
    { value: 'nunito', label: 'Nunito', description: 'Rounded and friendly' },
    { value: 'poppins', label: 'Poppins', description: 'Versatile sans-serif' }
  ];

  const buttonStyles = [
    { value: 'rounded', label: 'Rounded', description: 'Modern rounded corners' },
    { value: 'square', label: 'Square', description: 'Sharp, clean edges' },
    { value: 'pill', label: 'Pill', description: 'Fully rounded edges' },
    { value: 'minimal', label: 'Minimal', description: 'Text-only buttons' }
  ];

  const iconStyles = [
    { value: 'outline', label: 'Outline', description: 'Line-based icons' },
    { value: 'filled', label: 'Filled', description: 'Solid icons' },
    { value: 'duotone', label: 'Duotone', description: 'Two-tone icons' }
  ];

  const logoPositions = [
    { value: 'left', label: 'Left', description: 'Logo on the left side' },
    { value: 'center', label: 'Center', description: 'Centered logo' },
    { value: 'right', label: 'Right', description: 'Logo on the right side' }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small', description: 'Compact text' },
    { value: 'medium', label: 'Medium', description: 'Standard size' },
    { value: 'large', label: 'Large', description: 'Larger, easier to read' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Type className="h-5 w-5 mr-2" />
            Typography
          </CardTitle>
          <CardDescription>Fonts and text styling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Font Family</Label>
            <Select 
              value={settings.fontFamily} 
              onValueChange={(value) => setSettings({...settings, fontFamily: value})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <div>
                      <div className="font-medium">{font.label}</div>
                      <div className="text-sm text-muted-foreground">{font.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Font Size</Label>
            <RadioGroup 
              value={settings.fontSize} 
              onValueChange={(value) => setSettings({...settings, fontSize: value})}
            >
              {fontSizes.map((size) => (
                <div key={size.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={size.value} id={size.value} />
                  <div>
                    <Label htmlFor={size.value} className="font-medium">
                      {size.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{size.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Logo & Branding */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Image className="h-5 w-5 mr-2" />
            Logo & Branding
          </CardTitle>
          <CardDescription>Logo placement and brand elements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Logo Position</Label>
            <RadioGroup 
              value={settings.logoPosition} 
              onValueChange={(value) => setSettings({...settings, logoPosition: value})}
            >
              {logoPositions.map((position) => (
                <div key={position.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={position.value} id={position.value} />
                  <div>
                    <Label htmlFor={position.value} className="font-medium">
                      {position.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{position.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="watermark">Watermark Text</Label>
            <Input
              id="watermark"
              placeholder="Your brand watermark..."
              value={settings.watermark}
              onChange={(e) => setSettings({...settings, watermark: e.target.value})}
            />
            <p className="text-sm text-muted-foreground">Subtle text overlay on images</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showBranding" className="font-medium">Show Branding</Label>
              <p className="text-sm text-muted-foreground">Display your brand elements</p>
            </div>
            <Switch
              id="showBranding"
              checked={settings.showBranding}
              onCheckedChange={(checked) => setSettings({...settings, showBranding: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Button & Icon Styles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Star className="h-5 w-5 mr-2" />
            Button & Icon Styles
          </CardTitle>
          <CardDescription>Interactive element styling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Button Style</Label>
            <RadioGroup 
              value={settings.buttonStyle} 
              onValueChange={(value) => setSettings({...settings, buttonStyle: value})}
            >
              {buttonStyles.map((style) => (
                <div key={style.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={style.value} id={style.value} />
                  <div>
                    <Label htmlFor={style.value} className="font-medium">
                      {style.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{style.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Icon Style</Label>
            <RadioGroup 
              value={settings.iconStyle} 
              onValueChange={(value) => setSettings({...settings, iconStyle: value})}
            >
              {iconStyles.map((style) => (
                <div key={style.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={style.value} id={style.value} />
                  <div>
                    <Label htmlFor={style.value} className="font-medium">
                      {style.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{style.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* SEO & Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Badge className="h-5 w-5 mr-2" />
            SEO & Metadata
          </CardTitle>
          <CardDescription>Search engine optimization settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              placeholder="Describe your store for search engines..."
              value={settings.metaDescription}
              onChange={(e) => setSettings({...settings, metaDescription: e.target.value})}
              rows={3}
            />
            <p className="text-sm text-muted-foreground">160 characters max for best results</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="socialShareImage">Social Share Image URL</Label>
            <Input
              id="socialShareImage"
              placeholder="https://example.com/share-image.jpg"
              value={settings.socialShareImage}
              onChange={(e) => setSettings({...settings, socialShareImage: e.target.value})}
            />
            <p className="text-sm text-muted-foreground">Image shown when sharing on social media</p>
          </div>
        </CardContent>
      </Card>

      {/* Custom Brand Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Palette className="h-5 w-5 mr-2" />
            Custom Brand Colors
          </CardTitle>
          <CardDescription>Fine-tune your brand colors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex space-x-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={settings.brandColors.primary}
                  onChange={(e) => setSettings({
                    ...settings, 
                    brandColors: {...settings.brandColors, primary: e.target.value}
                  })}
                  className="w-16 h-10"
                />
                <Input
                  value={settings.brandColors.primary}
                  onChange={(e) => setSettings({
                    ...settings, 
                    brandColors: {...settings.brandColors, primary: e.target.value}
                  })}
                  placeholder="#3B82F6"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex space-x-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={settings.brandColors.secondary}
                  onChange={(e) => setSettings({
                    ...settings, 
                    brandColors: {...settings.brandColors, secondary: e.target.value}
                  })}
                  className="w-16 h-10"
                />
                <Input
                  value={settings.brandColors.secondary}
                  onChange={(e) => setSettings({
                    ...settings, 
                    brandColors: {...settings.brandColors, secondary: e.target.value}
                  })}
                  placeholder="#64748B"
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accentColor">Accent Color</Label>
              <div className="flex space-x-2">
                <Input
                  id="accentColor"
                  type="color"
                  value={settings.brandColors.accent}
                  onChange={(e) => setSettings({
                    ...settings, 
                    brandColors: {...settings.brandColors, accent: e.target.value}
                  })}
                  className="w-16 h-10"
                />
                <Input
                  value={settings.brandColors.accent}
                  onChange={(e) => setSettings({
                    ...settings, 
                    brandColors: {...settings.brandColors, accent: e.target.value}
                  })}
                  placeholder="#EC4899"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom CSS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Sparkles className="h-5 w-5 mr-2" />
            Custom CSS
          </CardTitle>
          <CardDescription>Advanced styling customization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="customCSS">Custom CSS Code</Label>
            <Textarea
              id="customCSS"
              placeholder="/* Add your custom CSS here */
.custom-button {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}
"
              value={settings.customCSS}
              onChange={(e) => setSettings({...settings, customCSS: e.target.value})}
              rows={8}
              className="font-mono text-sm"
            />
            <p className="text-sm text-muted-foreground">
              Advanced users only. Be careful as this can break your store's styling.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="lg:col-span-2">
        <Button onClick={handleSave} className="w-full" size="lg">
          Save Branding Settings
        </Button>
      </div>
    </div>
  );
};

export default BrandingCustomizer;