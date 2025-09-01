
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const CustomerFeedback = ({ storeId, storeName, isEnabled = true }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      customerName: "Sarah M.",
      rating: 5,
      comment: "Amazing quality and fast shipping! Love the style.",
      date: "2024-06-08",
      productName: "Summer Dress"
    },
    {
      id: 2,
      customerName: "Jessica L.",
      rating: 4,
      comment: "Great fit and beautiful design. Will definitely order again!",
      date: "2024-06-07",
      productName: "Casual Top"
    }
  ]);

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    customerName: "",
    rating: 5,
    comment: "",
    productName: ""
  });

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!newFeedback.customerName || !newFeedback.comment) {
      toast.error("Please fill in all required fields");
      return;
    }

    const feedbackEntry = {
      id: Date.now(),
      ...newFeedback,
      date: new Date().toISOString().split('T')[0]
    };

    setFeedback([feedbackEntry, ...feedback]);
    setNewFeedback({ customerName: "", rating: 5, comment: "", productName: "" });
    setShowFeedbackForm(false);
    toast.success("Thank you for your feedback!");
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Customer Feedback
        </h3>
        <Button onClick={() => setShowFeedbackForm(!showFeedbackForm)}>
          {showFeedbackForm ? "Cancel" : "Leave Feedback"}
        </Button>
      </div>

      {showFeedbackForm && (
        <Card>
          <CardHeader>
            <CardTitle>Share Your Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  value={newFeedback.customerName}
                  onChange={(e) => setNewFeedback({ ...newFeedback, customerName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Product (Optional)</label>
                <input
                  type="text"
                  value={newFeedback.productName}
                  onChange={(e) => setNewFeedback({ ...newFeedback, productName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Which product did you purchase?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewFeedback({ ...newFeedback, rating: i + 1 })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${i < newFeedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Your Feedback</label>
                <textarea
                  value={newFeedback.comment}
                  onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows="4"
                  placeholder="Share your experience with this store..."
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {feedback.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium">{item.customerName}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">{renderStars(item.rating)}</div>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                </div>
                {item.productName && (
                  <Badge variant="outline" className="text-xs">
                    {item.productName}
                  </Badge>
                )}
              </div>
              <p className="text-gray-700 mt-2">{item.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerFeedback;
