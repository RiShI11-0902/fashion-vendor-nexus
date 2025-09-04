import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import { Layout, Grid, List, Grid3x3, Type, Spacing } from "lucide-react";
import { useStoreManager } from "../../stores/useStoreManager";
import { toast } from "sonner";

const LayoutCustomizer = ({ storeId, currentSettings = {} }) => {
  const { updateStore } = useStoreManager();
  const [settings, setSettings] = useState({
    layout: currentSettings.layout || 'grid',
    gridColumns: currentSettings.gridColumns || 3,
    cardSpacing: currentSettings.cardSpacing || 'medium',
    showProductBadges: currentSettings.showProductBadges !== false,
    showPrices: currentSettings.showPrices !== false,
    showDescriptions: currentSettings.showDescriptions !== false,
    compactMode: currentSettings.compactMode || false,
    headerStyle: currentSettings.headerStyle || 'minimal',
    navigationStyle: currentSettings.navigationStyle || 'pills',
    footerStyle: currentSettings.footerStyle || 'simple',
    containerWidth: currentSettings.containerWidth || 'standard',
    ...currentSettings
  });

  const handleSave = () => {
    updateStore(storeId, { layoutSettings: settings });
    toast.success("Layout settings updated successfully!");
  };

  const layoutOptions = [
    { value: 'grid', label: 'Grid Layout', description: 'Products in a grid formation', icon: Grid },
    { value: 'list', label: 'List Layout', description: 'Products in a vertical list', icon: List },
    { value: 'masonry', label: 'Masonry Layout', description: 'Pinterest-style staggered layout', icon: Grid3x3 },
    { value: 'carousel', label: 'Carousel', description: 'Horizontal scrolling products', icon: Layout }
  ];

  const spacingOptions = [
    { value: 'compact', label: 'Compact', description: 'Minimal spacing' },
    { value: 'medium', label: 'Medium', description: 'Balanced spacing' },
    { value: 'spacious', label: 'Spacious', description: 'Extra breathing room' }
  ];

  const headerStyles = [
    { value: 'minimal', label: 'Minimal', description: 'Clean and simple' },
    { value: 'centered', label: 'Centered', description: 'Logo and nav centered' },
    { value: 'sidebar', label: 'Sidebar', description: 'Navigation on the side' },
    { value: 'split', label: 'Split', description: 'Logo left, nav right' }
  ];

  const containerWidths = [
    { value: 'narrow', label: 'Narrow', description: 'Max 768px wide' },
    { value: 'standard', label: 'Standard', description: 'Max 1200px wide' },
    { value: 'wide', label: 'Wide', description: 'Max 1400px wide' },
    { value: 'full', label: 'Full Width', description: 'Uses full screen' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Layout Style */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Layout className="h-5 w-5 mr-2" />
            Layout Style
          </CardTitle>
          <CardDescription>How products are displayed</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={settings.layout} 
            onValueChange={(value) => setSettings({...settings, layout: value})}
          >
            {layoutOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50">
                <RadioGroupItem value={option.value} id={option.value} />
                <option.icon className="h-4 w-4 text-muted-foreground" />
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

      {/* Grid Columns (only show for grid layout) */}
      {settings.layout === 'grid' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Grid className="h-5 w-5 mr-2" />
              Grid Columns
            </CardTitle>
            <CardDescription>Number of product columns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Columns: {settings.gridColumns}</Label>
              <Slider
                value={[settings.gridColumns]}
                onValueChange={(value) => setSettings({...settings, gridColumns: value[0]})}
                max={6}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Recommended: 3-4 columns for desktop, automatically adjusts for mobile
            </div>
          </CardContent>
        </Card>
      )}

      {/* Spacing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Spacing className="h-5 w-5 mr-2" />
            Card Spacing
          </CardTitle>
          <CardDescription>Space between product cards</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={settings.cardSpacing} 
            onValueChange={(value) => setSettings({...settings, cardSpacing: value})}
          >
            {spacingOptions.map((option) => (
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

      {/* Container Width */}
      <Card>
        <CardHeader>
          <CardTitle>Container Width</CardTitle>
          <CardDescription>Maximum width of your store content</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={settings.containerWidth} 
            onValueChange={(value) => setSettings({...settings, containerWidth: value})}
          >
            {containerWidths.map((option) => (
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

      {/* Header Style */}
      <Card>
        <CardHeader>
          <CardTitle>Header Style</CardTitle>
          <CardDescription>Store header layout and navigation</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={settings.headerStyle} 
            onValueChange={(value) => setSettings({...settings, headerStyle: value})}
          >
            {headerStyles.map((option) => (
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

      {/* Product Display Options */}
      <Card>
        <CardHeader>
          <CardTitle>Product Display</CardTitle>
          <CardDescription>What to show on product cards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showPrices" className="font-medium">Show Prices</Label>
              <p className="text-sm text-muted-foreground">Display product prices</p>
            </div>
            <Switch
              id="showPrices"
              checked={settings.showPrices}
              onCheckedChange={(checked) => setSettings({...settings, showPrices: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showDescriptions" className="font-medium">Show Descriptions</Label>
              <p className="text-sm text-muted-foreground">Display product descriptions</p>
            </div>
            <Switch
              id="showDescriptions"
              checked={settings.showDescriptions}
              onCheckedChange={(checked) => setSettings({...settings, showDescriptions: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showProductBadges" className="font-medium">Show Product Badges</Label>
              <p className="text-sm text-muted-foreground">Show "New", "Sale", etc. badges</p>
            </div>
            <Switch
              id="showProductBadges"
              checked={settings.showProductBadges}
              onCheckedChange={(checked) => setSettings({...settings, showProductBadges: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compactMode" className="font-medium">Compact Mode</Label>
              <p className="text-sm text-muted-foreground">Reduce padding and margins</p>
            </div>
            <Switch
              id="compactMode"
              checked={settings.compactMode}
              onCheckedChange={(checked) => setSettings({...settings, compactMode: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="lg:col-span-2">
        <Button onClick={handleSave} className="w-full" size="lg">
          Save Layout Settings
        </Button>
      </div>
    </div>
  );
};

export default LayoutCustomizer;