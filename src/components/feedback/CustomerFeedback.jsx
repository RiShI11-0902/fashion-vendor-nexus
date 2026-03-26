import { useState } from "react";
import { Button } from "../ui/button";
import { Star, MessageSquare, X } from "lucide-react";
import { toast } from "sonner";
import { useStoreManager } from "../../stores/storeManager";

const CustomerFeedback = ({ storeId, feedbacks }) => {
  const [feedback, setFeedback] = useState(feedbacks);
  const { createStoreFeedback } = useStoreManager();
  const [showForm, setShowForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    customerName: "",
    rating: 5,
    comment: "",
    productName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.customerName || !newFeedback.comment) {
      toast.error("Please fill in all required fields");
      return;
    }
    const entry = {
      id: Date.now(),
      ...newFeedback,
      date: new Date().toISOString().split("T")[0],
    };
    await createStoreFeedback(storeId, newFeedback);
    setFeedback([entry, ...feedback]);
    setNewFeedback({ customerName: "", rating: 5, comment: "", productName: "" });
    setShowForm(false);
    toast.success("Thank you for your feedback!");
  };

  const avgRating =
    feedback?.length
      ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1)
      : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Customer Reviews</h3>
            {avgRating && (
              <div className="flex items-center gap-1.5">
                <span className="text-yellow-400 font-semibold text-sm">{avgRating}</span>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.round(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-xs">({feedback.length})</span>
              </div>
            )}
          </div>
        </div>
        <Button
          size="sm"
          variant={showForm ? "ghost" : "default"}
          onClick={() => setShowForm(!showForm)}
          className="gap-2"
        >
          {showForm ? <><X className="h-4 w-4" /> Cancel</> : "Write a Review"}
        </Button>
      </div>

      {/* Feedback Form */}
      {showForm && (
        <div className="bg-card rounded-xl p-5 space-y-4">
          <h4 className="font-semibold text-foreground">Share Your Experience</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Your Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={newFeedback.customerName}
                  onChange={(e) => setNewFeedback({ ...newFeedback, customerName: e.target.value })}
                  className="w-full px-3 py-2 bg-background rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  Product (Optional)
                </label>
                <input
                  type="text"
                  value={newFeedback.productName}
                  onChange={(e) => setNewFeedback({ ...newFeedback, productName: e.target.value })}
                  className="w-full px-3 py-2 bg-background rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Which product?"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Rating</label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNewFeedback({ ...newFeedback, rating: i + 1 })}
                  >
                    <Star
                      className={`h-6 w-6 transition-colors ${
                        i < newFeedback.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground hover:text-yellow-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Your Feedback <span className="text-primary">*</span>
              </label>
              <textarea
                value={newFeedback.comment}
                onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                className="w-full px-3 py-2 bg-background rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                rows="3"
                placeholder="Tell us about your experience..."
                required
              />
            </div>

            <Button type="submit" className="w-full">Submit Review</Button>
          </form>
        </div>
      )}

      {/* Reviews list */}
      {feedback?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedback.map((item) => (
            <div key={item.id} className="bg-card rounded-xl p-4 space-y-3 hover:shadow-lg hover:shadow-primary/5 transition-shadow">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                    {item.customerName?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-none">{item.customerName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                    />
                  ))}
                </div>
              </div>
              {item.productName && (
                <span className="inline-block text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {item.productName}
                </span>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed">{item.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-2xl bg-muted mx-auto flex items-center justify-center text-2xl mb-3">⭐</div>
          <p className="text-muted-foreground text-sm">No reviews yet. Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );
};

export default CustomerFeedback;
