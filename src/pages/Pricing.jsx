import { Check, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { handlePayment, handleOrder } from "../lib/utils";
import { useAuthStore } from "../stores/useAuthStore";
import { useState } from "react";

const Pricing = () => {
  const { currentUser } = useAuthStore();
  const [loading, setLoading] = useState();
  const [isSubscription, setIsSubscription] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "/month",
      description: "Get started with up to 10 products and basic analytics.",
      features: [
        "Up to 10 products",
        "Unlimited orders",
        "Basic analytics (orders & revenue)",
        "1 AI model generation",
      ],
      highlighted: false,
    },
    {
      name: "Starter",
      price: "₹1,000",
      period: "/month",
      description:
        "Perfect for small shops. Up to 40 products and 30 AI model generations/month.",
      features: [
        "Up to 30 products",
        "Unlimited orders",
        "Basic analytics dashboard",
        "40 AI model generations/month",
      ],
      highlighted: false,
    },
    {
      name: "Premium",
      price: "₹3,000",
      period: "/month",
      description:
        "Unlimited Products and Orders with 200 AI model generations/month.",
      features: [
        "Unlimited products",
        "Unlimited orders",
        "Full analytics dashboard",
        "200 AI model generations/month",
        "Access to new Features (extra charges may apply)",
        "Priority support",
      ],
      highlighted: true,
    },
  ];

  // Optional AI Packs
  const aiPacks = [
    {
      name: "100 AI Models Pack",
      price: "₹550",
      description:
        "100 AI model generations. Can be added to any plan or purchased standalone.",
    },
  ];

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
              Start free, upgrade when you need more. No hidden fees, no surprises.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center">
            {/* Plan Cards */}
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`w-full max-w-md mx-auto ${
                  plan.highlighted ? "border-primary shadow-xl" : ""
                }`}
              >
                <CardHeader className="text-center">
                  {plan.highlighted && (
                    <div className="inline-block bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full mb-4">
                      Most Popular
                    </div>
                  )}
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-lg">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                    size="lg"
                    disabled={loading && isSubscription}
                    onClick={() => {
                      if (plan.name !== "Free") {
                        setLoading(true);
                        setIsSubscription(true);
                        handlePayment(currentUser, setLoading, setIsSubscription, plan.name);
                      }
                    }}
                  >
                    {plan.name === "Free" ? (
                      "Get Started Free"
                    ) : loading && isSubscription ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      `Get ${plan.name}`
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {/* AI Packs Card */}
            <Card className="w-full max-w-md mx-auto border-dashed border-2 border-gray-300">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">AI Packs</CardTitle>
                <CardDescription className="text-base">
                  Buy additional AI model generations for any plan or standalone
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-5">
                  {aiPacks.map((pack, i) => (
                    <div key={i}>
                      <li className="flex items-center justify-between">
                        <div>
                          <div className="font-medium flex flex-row items-center justify-between">
                            {pack.name}
                            <span className="font-bold">{pack.price}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {pack.description}
                          </p>
                        </div>
                      </li>
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          disabled={loading}
                          onClick={() => handleOrder(currentUser, setLoading, true)}
                          className="flex items-center gap-2 w-fit"
                        >
                          {loading && !isSubscription ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Get Pack"
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in here
              </Link>
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              * Payments are not refundable upon cancellation of subscription.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;


// import { Check, Loader2 } from "lucide-react";
// import { Link } from "react-router-dom";
// import MainLayout from "../components/layout/MainLayout";
// import { Button } from "../components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
// import { handlePayment, handleOrder } from "../lib/utils";
// import { useAuthStore } from "../stores/useAuthStore";
// import { useState } from "react";

// const Pricing = () => {

//   const { currentUser } = useAuthStore()
//   const [loading, setLoading] = useState()
//   const [isSubscription, setIsSubscription] = useState(false)
//   const plans = [
//     {
//       name: "Free",
//       price: "₹0",
//       period: "/month",
//       description: "Get started with up to 10 products and basic analytics.",
//       features: [
//         "Up to 10 products",
//         "Unlimited orders",
//         "Basic analytics (orders & revenue)",
//         "1 AI model generation"
//       ],
//       highlighted: false
//     },
//     {
//       name: "Premium",
//       price: "₹3,000",
//       period: "/month",
//       description: "Unlimited Products and Orders with 200 AI model generations/month.",
//       features: [
//         "Unlimited products",
//         "Unlimited orders",
//         "Full analytics dashboard",
//         "200 AI model generations/month",
//         "Access to new Features ( extra charges may apply)",
//         "Priority support"
//       ],
//       highlighted: true
//     }
//   ];

//   // Optional AI Packs
//   const aiPacks = [
//     {
//       name: "100 AI Models Pack",
//       price: "₹550",
//       description: "100 AI model generations. Can be added to any plan or purchased standalone."
//     }
//   ];

//   return (
//     <MainLayout>
//       <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
//         <div className="container mx-auto px-4 py-16">
//           {/* Header */}
//           <div className="text-center mb-16">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">
//               Simple, Transparent Pricing
//             </h1>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Start free, upgrade when you need more. No hidden fees, no surprises.
//             </p>
//           </div>

//           {/* Pricing Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">

//             {/* Plan Cards (Free & Premium) */}
//             {plans.map((plan, index) => (
//               <Card
//                 key={index}
//                 className={`w-full max-w-md mx-auto ${plan.highlighted ? "border-primary shadow-xl" : ""}`}
//               >
//                 <CardHeader className="text-center">
//                   {plan.highlighted && (
//                     <div className="inline-block bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full mb-4">
//                       Most Popular
//                     </div>
//                   )}
//                   <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
//                   <CardDescription className="text-base">{plan.description}</CardDescription>
//                   <div className="mt-4">
//                     <span className="text-4xl font-bold">{plan.price}</span>
//                     <span className="text-muted-foreground text-lg">{plan.period}</span>
//                   </div>
//                 </CardHeader>

//                 <CardContent>
//                   <ul className="space-y-3">
//                     {plan.features.map((feature, i) => (
//                       <li key={i} className="flex items-center">
//                         <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
//                         <span className="text-sm">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>

//                 <CardFooter>
//                   <Button
//                     className="w-full"
//                     variant={plan.highlighted ? "default" : "outline"}
//                     size="lg"
//                     disabled={loading && isSubscription} // prevent multiple clicks
//                     onClick={() => {
//                       if (plan.name !== "Free") {
//                         setLoading(true); // ✅ set before calling payment
//                         setIsSubscription(true)
//                         handlePayment(currentUser, setLoading, setIsSubscription, false);
//                       }
//                     }}
//                   >
//                     {plan.name === "Free" ? (
//                       "Get Started Free"
//                     ) : loading && isSubscription ? (
//                       <div className="flex items-center gap-2">
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         Processing...
//                       </div>
//                     ) : (
//                       "Get Premium"
//                     )}
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}

//             {/* AI Packs Card (Third Box) */}
//             <Card className="w-full max-w-md mx-auto border-dashed border-2 border-gray-300">
//               <CardHeader className="text-center">
//                 <CardTitle className="text-2xl font-bold">AI Packs</CardTitle>
//                 <CardDescription className="text-base">
//                   Buy additional AI model generations for any plan or standalone
//                 </CardDescription>
//               </CardHeader>

//               <CardContent>
//                 <div className="space-y-5">
//                   {aiPacks.map((pack, i) => (
//                     <div className="">
//                       <li key={i} className="flex items-center justify-between">
//                         <div>
//                           <div className="font-medium flex flex-row items-center justify-between">
//                             {pack.name}
//                             <span className="font-bold">{pack.price}</span>
//                           </div>
//                           <p className="text-sm text-muted-foreground">{pack.description}</p>
//                         </div>
//                       </li>
//                       <div class="flex justify-end">
//                         <Button
//                           size="sm"
//                           disabled={loading}
//                           onClick={() => handleOrder(currentUser, setLoading, true)}
//                           className="flex items-center gap-2 w-fit"
//                         >
//                           {loading && !isSubscription ? (
//                             <>
//                               <Loader2 className="h-4 w-4 animate-spin" />
//                               Processing...
//                             </>
//                           ) : (
//                             "Get Pack"
//                           )}
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>


//             </Card>

//           </div>


//           {/* Additional Info */}
//           <div className="text-center mt-12">
//             <p className="text-muted-foreground">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-primary hover:underline font-medium"
//               >
//                 Sign in here
//               </Link>
//             </p>
//             <p className="text-sm text-muted-foreground mt-4">
//               * Payments are not refundable upon cancellation of subscription.
//             </p>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default Pricing;
