
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { MessageSquare, HelpCircle, Plus, Trash2 } from "lucide-react";
import { useStoreManager } from "../../stores/useStoreManager";
import { toast } from "sonner";

const StoreFeatureSettings = ({ storeId, store }) => {
  const { updateStoreSettings, updateStorePolicies } = useStoreManager();
  
  const [settings, setSettings] = useState({
    enableFeedback: store?.settings?.enableFeedback !== false,
  });

  const [policies, setPolicies] = useState({
    shipping: store?.policies?.shipping || "",
    returns: store?.policies?.returns || "",
    refunds: store?.policies?.refunds || "",
  });

  const [customFAQs, setCustomFAQs] = useState(store?.customFAQs || []);

  const handleSettingsChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    updateStoreSettings(storeId, newSettings);
  };

  const handlePolicyChange = (key, value) => {
    const newPolicies = { ...policies, [key]: value };
    setPolicies(newPolicies);
  };

  const savePolicies = () => {
    updateStorePolicies(storeId, policies);
  };

  const addCustomFAQ = () => {
    setCustomFAQs([...customFAQs, { question: "", answer: "" }]);
  };

  const updateCustomFAQ = (index, field, value) => {
    const updated = customFAQs.map((faq, i) => 
      i === index ? { ...faq, [field]: value } : faq
    );
    setCustomFAQs(updated);
  };

  const removeCustomFAQ = (index) => {
    setCustomFAQs(customFAQs.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Feature Toggles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Store Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="feedback-toggle">Customer Feedback</Label>
              <p className="text-sm text-gray-600">Allow customers to leave reviews and ratings</p>
            </div>
            <Switch
              id="feedback-toggle"
              checked={settings.enableFeedback}
              onCheckedChange={(checked) => handleSettingsChange('enableFeedback', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Store Policies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Store Policies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="shipping-policy">Shipping Policy</Label>
            <Textarea
              id="shipping-policy"
              value={policies.shipping}
              onChange={(e) => handlePolicyChange('shipping', e.target.value)}
              placeholder="Describe your shipping options, delivery times, and costs..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="returns-policy">Returns Policy</Label>
            <Textarea
              id="returns-policy"
              value={policies.returns}
              onChange={(e) => handlePolicyChange('returns', e.target.value)}
              placeholder="Explain your return policy, timeframe, and conditions..."
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="refunds-policy">Refunds Policy</Label>
            <Textarea
              id="refunds-policy"
              value={policies.refunds}
              onChange={(e) => handlePolicyChange('refunds', e.target.value)}
              placeholder="Detail how refunds are processed and timing..."
              className="mt-1"
            />
          </div>

          <Button onClick={savePolicies}>Save Policies</Button>
        </CardContent>
      </Card>

      {/* Custom FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Custom FAQs
            </span>
            <Button onClick={addCustomFAQ} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {customFAQs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">FAQ {index + 1}</h4>
                <Button
                  onClick={() => removeCustomFAQ(index)}
                  variant="ghost"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <Label>Question</Label>
                <Input
                  value={faq.question}
                  onChange={(e) => updateCustomFAQ(index, 'question', e.target.value)}
                  placeholder="Enter your FAQ question..."
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Answer</Label>
                <Textarea
                  value={faq.answer}
                  onChange={(e) => updateCustomFAQ(index, 'answer', e.target.value)}
                  placeholder="Enter the answer..."
                  className="mt-1"
                />
              </div>
            </div>
          ))}
          
          {customFAQs.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              No custom FAQs yet. Add one to provide specific information about your store.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreFeatureSettings;
