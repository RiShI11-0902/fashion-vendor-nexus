
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HelpCircle, Package, RefreshCw, CreditCard, Truck } from "lucide-react";

const StoreFAQ = ({ customFAQs = [], storePolicy = {} }) => {
  const defaultFAQs = [
    {
      id: "shipping",
      icon: <Truck className="h-4 w-4" />,
      question: "What are your shipping options and delivery times?",
      answer: storePolicy.shipping || "We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All orders are processed within 1-2 business days. Free shipping is available on orders over $75."
    },
    {
      id: "returns",
      icon: <RefreshCw className="h-4 w-4" />,
      question: "What is your return policy?",
      answer: storePolicy.returns || "We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in original condition with tags attached. Return shipping costs are covered by the customer unless the item was defective or incorrect."
    },
    {
      id: "refunds",
      icon: <CreditCard className="h-4 w-4" />,
      question: "How long do refunds take to process?",
      answer: storePolicy.refunds || "Refunds are processed within 3-5 business days after we receive your returned item. The refund will be issued to your original payment method. Please allow 5-10 business days for the refund to appear on your statement."
    },
    {
      id: "sizing",
      icon: <Package className="h-4 w-4" />,
      question: "How do I choose the right size?",
      answer: "We provide detailed size charts for each product. If you're between sizes, we recommend sizing up. For any sizing questions, feel free to contact us before placing your order. We're happy to help!"
    },
    {
      id: "exchanges",
      icon: <RefreshCw className="h-4 w-4" />,
      question: "Do you offer exchanges?",
      answer: "Yes! We offer exchanges for different sizes or colors within 30 days of purchase. The item must be in original condition. Exchange shipping costs depend on the reason for the exchange."
    },
    {
      id: "care",
      icon: <Package className="h-4 w-4" />,
      question: "How should I care for my items?",
      answer: "Care instructions are included with each item and on the product page. Generally, we recommend washing in cold water and air drying to maintain quality and extend the life of your garments."
    }
  ];

  const allFAQs = [...defaultFAQs, ...customFAQs];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {allFAQs.map((faq, index) => (
            <AccordionItem key={faq.id || index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  {faq.icon}
                  <span>{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default StoreFAQ;
