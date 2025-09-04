import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

const Pricing = () => {
  const freePlan = {
    name: "Free",
    price: "Gs. 0",
    period: "/month",
    description: "Free forever.",
    features: [
      "Up to 10 products",
      "Unlimited orders",
      "Store customization",
      "Promotional prices",
      "Customer data collection"
    ],
    highlighted: true
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start selling online with our free plan. No hidden fees, no surprises.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="flex justify-center">
            <Card className={`w-full max-w-md ${freePlan.highlighted ? 'border-primary shadow-lg' : ''}`}>
              <CardHeader className="text-center">
                {freePlan.highlighted && (
                  <div className="inline-block bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full mb-4">
                    Most Popular
                  </div>
                )}
                <CardTitle className="text-2xl font-bold">{freePlan.name}</CardTitle>
                <CardDescription className="text-base">{freePlan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{freePlan.price}</span>
                  <span className="text-muted-foreground text-lg">{freePlan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {freePlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Link to="/signup" className="w-full">
                  <Button 
                    className="w-full" 
                    variant={freePlan.highlighted ? "default" : "outline"}
                    size="lg"
                  >
                    Get Started Free
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;