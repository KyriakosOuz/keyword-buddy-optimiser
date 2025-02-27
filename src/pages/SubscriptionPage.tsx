
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SubscriptionPage() {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'enterprise' | null>(null);

  const handleSubscribe = (plan: 'free' | 'pro' | 'enterprise') => {
    setSelectedPlan(plan);
    toast({
      title: "Subscription selected",
      description: `You've selected the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan.`,
    });
  };

  const plans = [
    {
      name: "Freemium",
      price: "$0",
      period: "forever",
      description: "Basic SEO tools for beginners",
      features: [
        "Content analysis",
        "Basic SEO score",
        "3 keyword suggestions",
        "Meta tags generator"
      ],
      limitations: [
        "Limited to 5 analyses per day",
        "No API access",
        "No AI chatbot",
        "No advanced reports"
      ],
      cta: "Current Plan",
      variant: "outline" as const,
      highlighted: false,
      plan: 'free' as const
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Advanced tools for professionals",
      features: [
        "Unlimited content analyses",
        "Advanced SEO recommendations",
        "Unlimited keyword suggestions",
        "Schema markup generator",
        "Internal linking suggestions",
        "AI chatbot assistance",
        "Priority support"
      ],
      limitations: [],
      cta: "Subscribe Now",
      variant: "default" as const,
      highlighted: true,
      plan: 'pro' as const
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "Complete solution for agencies",
      features: [
        "Everything in Pro",
        "API access",
        "White-label reports",
        "Team collaboration",
        "Advanced analytics",
        "Dedicated account manager",
        "Custom integrations"
      ],
      limitations: [],
      cta: "Contact Sales",
      variant: "outline" as const,
      highlighted: false,
      plan: 'enterprise' as const
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-90">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-center text-gray-900">SEO.ai Subscription</h1>
          <div className="w-24"></div> {/* Empty div for flex spacing */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Choose Your Plan</h2>
          <p className="text-center text-muted-foreground mb-10">
            Select the perfect plan for your SEO needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`${plan.highlighted ? 'border-primary shadow-lg ring-2 ring-primary ring-opacity-40' : 'border-border'} transition-all hover:shadow-md`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {plan.highlighted && <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />}
                    {plan.name}
                  </CardTitle>
                  <div>
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Limitations:</p>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation) => (
                          <li key={limitation} className="flex items-start">
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.variant}
                    onClick={() => handleSubscribe(plan.plan)}
                    disabled={selectedPlan === plan.plan}
                  >
                    {selectedPlan === plan.plan ? "Selected" : plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-10 bg-white p-6 rounded-lg border shadow-sm">
            <h3 className="text-xl font-bold mb-4">Looking for a custom plan?</h3>
            <p className="mb-4">We offer custom pricing for agencies and enterprises with specific needs.</p>
            <Button variant="outline">Contact Sales</Button>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              All plans include our base features. Upgrade or downgrade at any time.
              <br />
              Have questions? Check our <span className="text-primary cursor-pointer">FAQ</span> or contact <span className="text-primary cursor-pointer">support</span>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
