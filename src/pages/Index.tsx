
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Zap, 
  BookOpen, 
  FileText, 
  BarChart,
  Link2,
  Code,
  Network,
  ExternalLink,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import LandingHero from "@/components/LandingHero";
import AiChatbot from "@/components/AiChatbot";
import { useRef, useState } from "react";

export default function Index() {
  const [pricingCycle, setPricingCycle] = useState("monthly");
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const pricingRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  
  const featuresControls = useAnimation();
  const howItWorksControls = useAnimation();
  const pricingControls = useAnimation();
  const testimonialsControls = useAnimation();
  const ctaControls = useAnimation();
  
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.2 });
  const pricingInView = useInView(pricingRef, { once: true, amount: 0.2 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (featuresInView) featuresControls.start("visible");
    if (howItWorksInView) howItWorksControls.start("visible");
    if (pricingInView) pricingControls.start("visible");
    if (testimonialsInView) testimonialsControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
  }, [
    featuresControls, 
    howItWorksControls, 
    pricingControls, 
    testimonialsControls, 
    ctaControls, 
    featuresInView, 
    howItWorksInView, 
    pricingInView, 
    testimonialsInView, 
    ctaInView
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      title: "AI-Powered Keyword Optimization",
      description: "Automatically find & insert the best keywords for maximum search visibility.",
      icon: <Search className="h-6 w-6 text-primary" />,
      color: "bg-primary/10"
    },
    {
      title: "AI-Driven Internal Linking",
      description: "Suggests contextual links to improve site structure and SEO ranking.",
      icon: <Link2 className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-500/10"
    },
    {
      title: "Schema Markup Automation",
      description: "Create and implement schema markup to help content appear in Google Rich Snippets.",
      icon: <Code className="h-6 w-6 text-green-500" />,
      color: "bg-green-500/10"
    },
    {
      title: "Backlink Strategy Insights",
      description: "Identify high-quality backlink opportunities to boost domain authority.",
      icon: <Network className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-500/10"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      description: "Basic SEO tools for beginners",
      price: {
        monthly: "$0",
        yearly: "$0",
      },
      period: {
        monthly: "per month",
        yearly: "per year",
      },
      features: [
        "Content analysis",
        "Basic SEO score",
        "3 keyword suggestions per day",
        "Meta tags generator"
      ],
      limitations: [
        "Limited to 3 analyses per day",
        "No API access",
        "No AI chatbot",
        "No advanced reports"
      ],
      cta: "Start Free",
      variant: "outline",
      highlighted: false
    },
    {
      name: "Pro",
      description: "Advanced tools for professionals",
      price: {
        monthly: "$29",
        yearly: "$290",
      },
      period: {
        monthly: "per month",
        yearly: "per year",
      },
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
      variant: "default",
      highlighted: true,
      savings: {
        yearly: "Save $58"
      }
    },
    {
      name: "Enterprise",
      description: "Complete solution for agencies",
      price: {
        monthly: "$99",
        yearly: "$990",
      },
      period: {
        monthly: "per month",
        yearly: "per year",
      },
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
      variant: "outline",
      highlighted: false,
      savings: {
        yearly: "Save $198"
      }
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechGrowth",
      comment: "SEO.ai transformed our organic traffic within weeks. We've seen a 78% increase in search visibility and our keyword rankings have skyrocketed.",
      metrics: {
        traffic: "+78%",
        conversions: "+42%",
        rankings: "Top 3"
      },
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "David Chen",
      role: "SEO Specialist",
      company: "Digital First",
      comment: "The AI recommendations are spot-on. It's like having an expert SEO consultant available 24/7. The time savings alone are worth every penny.",
      metrics: {
        traffic: "+65%",
        conversions: "+38%",
        rankings: "Top 5"
      },
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Priya Patel",
      role: "Content Manager",
      company: "Elevate Media",
      comment: "The content optimization suggestions helped us improve our blog rankings by over 60%. Now our articles consistently rank on page 1.",
      metrics: {
        traffic: "+92%",
        conversions: "+53%",
        rankings: "Page 1"
      },
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <AiChatbot />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <LandingHero />
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="content-container">
            <motion.div 
              ref={featuresRef}
              variants={containerVariants}
              initial="hidden"
              animate={featuresControls}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Transforming Content into Search-Friendly Assets
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Our intelligent platform uses AI to analyze and enhance your content 
                  for maximum search visibility and user engagement.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="group"
                  >
                    <Card className="border shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                      <div className="h-1 bg-primary w-full transform origin-left transition-all duration-300 group-hover:scale-x-110"></div>
                      <CardContent className="pt-6 h-full flex flex-col">
                        <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground mb-6">
                          {feature.description}
                        </p>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>AI-driven recommendations</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Real-time analysis</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>One-click implementation</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-auto self-start" asChild>
                          <Link to="/dashboard">
                            See in Action
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="content-container">
            <motion.div 
              ref={howItWorksRef}
              variants={containerVariants}
              initial="hidden"
              animate={howItWorksControls}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  How SEO.ai Works
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Our streamlined process helps you optimize your content in minutes, 
                  not hours. Just follow these simple steps.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 relative">
                <div className="absolute top-10 left-[16%] w-[68%] h-0.5 bg-gray-200 hidden md:block"></div>
                
                <motion.div variants={itemVariants} className="relative flex flex-col items-center text-center z-10">
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-pulse-soft">
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-3">1. Upload Content</h3>
                  <p className="text-muted-foreground">
                    Add your content by pasting text, uploading a file, or entering a URL.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="relative flex flex-col items-center text-center z-10">
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-pulse-soft">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-3">2. AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Our AI analyzes your content to identify optimization opportunities.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="relative flex flex-col items-center text-center z-10">
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-pulse-soft">
                      <BarChart className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-3">3. Get Results</h3>
                  <p className="text-muted-foreground">
                    Receive actionable recommendations and watch your rankings improve.
                  </p>
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants} className="mt-16 text-center">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Start Optimizing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="content-container">
            <motion.div 
              ref={pricingRef}
              variants={containerVariants}
              initial="hidden"
              animate={pricingControls}
              className="max-w-5xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Transparent, Simple Pricing
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                  Choose the plan that best fits your needs. No hidden fees or long-term contracts.
                </p>
                
                <div className="inline-flex p-1 border rounded-full bg-gray-50 mb-8">
                  <button
                    onClick={() => setPricingCycle("monthly")}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      pricingCycle === "monthly"
                        ? "bg-white shadow-sm text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setPricingCycle("yearly")}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                      pricingCycle === "yearly"
                        ? "bg-white shadow-sm text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    Yearly
                    <span className="ml-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">
                      Save 20%
                    </span>
                  </button>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <Card
                    key={index}
                    className={`border ${
                      plan.highlighted
                        ? "border-primary shadow-lg ring-1 ring-primary/30 relative"
                        : "shadow"
                    } overflow-hidden h-full`}
                  >
                    {plan.highlighted && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-bl-lg">
                          Most Popular
                        </div>
                      </div>
                    )}
                    <div className="p-6 border-b">
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {plan.description}
                      </p>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">
                          {plan.price[pricingCycle]}
                        </span>
                        <span className="text-muted-foreground ml-1">
                          {plan.period[pricingCycle]}
                        </span>
                      </div>
                      {pricingCycle === "yearly" && plan.savings && (
                        <div className="text-green-600 text-sm font-medium">
                          {plan.savings.yearly}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {plan.limitations.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-medium text-muted-foreground mb-2">
                            Limitations:
                          </p>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation, i) => (
                              <li key={i} className="text-sm text-muted-foreground">
                                {limitation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <Button
                        className="w-full mt-6"
                        variant={plan.variant as "default" | "outline"}
                        asChild
                      >
                        <Link to="/subscription">{plan.cta}</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </motion.div>
              
              <motion.div variants={itemVariants} className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Need a custom plan?</h3>
                <p className="text-muted-foreground mb-4">
                  We offer tailored solutions for enterprise needs. Get in touch with our sales team.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="content-container">
            <motion.div 
              ref={testimonialsRef}
              variants={containerVariants}
              initial="hidden"
              animate={testimonialsControls}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Trusted by Industry Leaders
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  See how businesses are achieving remarkable results with our AI-powered SEO platform.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full border hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                          />
                          <div>
                            <h3 className="font-semibold">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <div className="flex mb-3">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          
                          <p className="text-sm italic">"{testimonial.comment}"</p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 px-2 py-3 bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">
                              {testimonial.metrics.traffic}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Traffic
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">
                              {testimonial.metrics.conversions}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Conversions
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">
                              {testimonial.metrics.rankings}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Rankings
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <motion.div variants={itemVariants} className="mt-12 flex flex-wrap justify-center gap-12 items-center opacity-70">
                <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.webp" alt="Client Logo" className="h-6 object-contain" />
                <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.webp" alt="Client Logo" className="h-6 object-contain" />
                <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.webp" alt="Client Logo" className="h-6 object-contain" />
                <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.webp" alt="Client Logo" className="h-6 object-contain" />
                <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.webp" alt="Client Logo" className="h-6 object-contain" />
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="content-container">
            <motion.div 
              ref={ctaRef}
              variants={containerVariants}
              initial="hidden"
              animate={ctaControls}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-display font-bold mb-6"
              >
                Get Started with AI-Powered SEO Today
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl opacity-90 mb-8 max-w-3xl mx-auto"
              >
                Start optimizing your content and watch your search rankings soar.
              </motion.p>
              
              <motion.div variants={itemVariants} className="mb-8">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-primary hover:text-primary"
                  asChild
                >
                  <Link to="/dashboard">
                    Try AI SEO for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-8 items-center"
              >
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-white" />
                  <span className="text-sm">No Credit Card Required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-white" />
                  <span className="text-sm">7-Day Free Trial</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-white" />
                  <span className="text-sm">Cancel Anytime</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-white" />
                  <span className="text-sm">Trusted by 1,000+ Marketers</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
