
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Bot, 
  Search, 
  Link2, 
  Code, 
  Network, 
  UploadCloud, 
  TrendingUp, 
  Mail,
  Twitter,
  Linkedin,
  Github
} from "lucide-react";

const LandingPage = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [pricingCycle, setPricingCycle] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    toast({
      title: "Thanks for subscribing!",
      description: "We'll keep you updated with the latest SEO tips and features.",
    });
    
    setEmail("");
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechGrowth",
      comment: "SEO.ai transformed our organic traffic within weeks. We've seen a 78% increase in search visibility and our keyword rankings have skyrocketed.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "David Chen",
      role: "SEO Specialist",
      company: "Digital First",
      comment: "The AI recommendations are spot-on. It's like having an expert SEO consultant available 24/7. The time savings alone are worth every penny.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Priya Patel",
      role: "Content Manager",
      company: "Elevate Media",
      comment: "The content optimization suggestions helped us improve our blog rankings by over 60%. Now our articles consistently rank on page 1.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    }
  ];

  const pricingPlans = [
    {
      name: "Freemium",
      price: pricingCycle === "monthly" ? "$0" : "$0",
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
      cta: "Start Free",
      variant: "outline" as const,
      highlighted: false,
      plan: 'free' as const
    },
    {
      name: "Pro",
      price: pricingCycle === "monthly" ? "$29" : "$290",
      period: pricingCycle === "monthly" ? "per month" : "per year",
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
      price: pricingCycle === "monthly" ? "$99" : "$990",
      period: pricingCycle === "monthly" ? "per month" : "per year",
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

  const features = [
    {
      title: "AI-Powered SEO Suggestions",
      description: "Our advanced AI analyzes your content and provides actionable recommendations to improve search rankings.",
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      color: "bg-primary/10"
    },
    {
      title: "Automated Keyword Optimization",
      description: "Discover high-impact keywords that align with user intent and your content goals.",
      icon: <Search className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-500/10"
    },
    {
      title: "Internal Linking & Schema Markup",
      description: "Build a robust site structure with smart internal linking suggestions and schema markup.",
      icon: <Link2 className="h-6 w-6 text-green-500" />,
      color: "bg-green-500/10"
    },
    {
      title: "Backlink Strategy Insights",
      description: "Identify high-quality backlink opportunities to boost domain authority and rankings.",
      icon: <Network className="h-6 w-6 text-yellow-500" />,
      color: "bg-yellow-500/10"
    },
    {
      title: "Real-time SEO Chatbot",
      description: "Get instant answers to your SEO questions from our advanced AI assistant.",
      icon: <Bot className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-500/10"
    },
    {
      title: "Schema Markup Generator",
      description: "Create and implement schema markup to enhance search visibility with rich snippets.",
      icon: <Code className="h-6 w-6 text-orange-500" />,
      color: "bg-orange-500/10"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="content-container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-xl">SEO.ai</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Features</Link>
            <Link to="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">How It Works</Link>
            <Link to="#pricing" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Pricing</Link>
            <Link to="#testimonials" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Testimonials</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Log In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_50%_at_50%_50%,rgba(13,17,23,0.05)_0%,rgba(13,17,23,0)_100%)]"></div>
          <div className="content-container relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-display">
                AI-Powered SEO Optimization<br className="hidden md:block" /> in <span className="text-primary relative inline-block">
                  Minutes
                  <svg className="absolute bottom-0 left-0 w-full h-3 text-primary/20 -z-10" viewBox="0 0 124 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 11.75C0.5 11.75 35 -11.25 62 11.75C89 34.75 123.5 11.75 123.5 11.75" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                Leverage AI to transform your content into search-optimized assets that rank higher, drive more traffic, and convert better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Optimizing for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="#how-it-works">
                    See How It Works
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative mt-16 rounded-xl border overflow-hidden shadow-2xl max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="SEO.ai Dashboard" 
                className="w-full h-auto relative z-10 transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-3 py-1 rounded-bl-md">
                Live Demo
              </div>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-70">
              <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.webp" alt="Client 1" className="h-8 object-contain" />
              <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.webp" alt="Client 2" className="h-8 object-contain" />
              <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.webp" alt="Client 3" className="h-8 object-contain" />
              <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.webp" alt="Client 4" className="h-8 object-contain" />
              <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.webp" alt="Client 5" className="h-8 object-contain" />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-slate-50">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Transforming Content into Search-Friendly Assets
              </h2>
              <p className="text-lg text-slate-600">
                Our intelligent platform uses AI to analyze and enhance your content 
                for maximum search visibility and user engagement.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border shadow-sm overflow-hidden hover-scale animate-on-scroll opacity-0">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                    <p className="text-slate-600 mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">AI-driven recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Real-time analysis</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Data-backed insights</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                How SEO.ai Works
              </h2>
              <p className="text-lg text-slate-600">
                Our streamlined process helps you optimize your content in minutes, 
                not hours. Just follow these simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 hidden md:block"></div>
              
              <div className="relative flex flex-col items-center text-center animate-on-scroll opacity-0">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 z-10">
                  <UploadCloud className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3">1. Upload Content</h3>
                <p className="text-slate-600">
                  Add your content by pasting text, uploading a file, or entering a URL.
                </p>
              </div>
              
              <div className="relative flex flex-col items-center text-center animate-on-scroll opacity-0">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 z-10">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3">2. AI Analysis</h3>
                <p className="text-slate-600">
                  Our AI analyzes your content for SEO opportunities and weak points.
                </p>
              </div>
              
              <div className="relative flex flex-col items-center text-center animate-on-scroll opacity-0">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 z-10">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3">3. Optimize Content</h3>
                <p className="text-slate-600">
                  Apply our AI-powered recommendations to optimize your content.
                </p>
              </div>
              
              <div className="relative flex flex-col items-center text-center animate-on-scroll opacity-0">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6 z-10">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3">4. Watch Rankings Rise</h3>
                <p className="text-slate-600">
                  Track your improved search rankings and organic traffic growth.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center animate-on-scroll opacity-0">
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Start Optimizing Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-slate-50">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Choose Your Plan
              </h2>
              <p className="text-lg text-slate-600 mb-10">
                Select the perfect plan for your SEO needs
              </p>
              
              <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg mb-10">
                <button 
                  className={`px-4 py-2 rounded-md text-sm font-medium ${pricingCycle === 'monthly' ? 'bg-white shadow-sm' : 'text-slate-600'}`}
                  onClick={() => setPricingCycle('monthly')}
                >
                  Monthly
                </button>
                <button 
                  className={`px-4 py-2 rounded-md text-sm font-medium ${pricingCycle === 'yearly' ? 'bg-white shadow-sm' : 'text-slate-600'}`}
                  onClick={() => setPricingCycle('yearly')}
                >
                  Yearly <span className="text-xs text-green-500 font-normal">(Save 16%)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={`${plan.highlighted ? 'border-primary shadow-lg ring-2 ring-primary ring-opacity-40' : 'border-border'} transition-all hover:shadow-md animate-on-scroll opacity-0`}
                >
                  <div className="p-6 border-b border-border">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      {plan.highlighted && <Sparkles className="h-5 w-5 text-yellow-500" />}
                      {plan.name}
                    </h3>
                    <div className="mb-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-slate-500 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-slate-600 text-sm">{plan.description}</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm font-medium text-slate-500 mb-2">Limitations:</p>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation) => (
                            <li key={limitation} className="flex items-start">
                              <span className="text-sm text-slate-500">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="p-6 pt-0">
                    <Link to="/subscription">
                      <Button 
                        className="w-full" 
                        variant={plan.variant}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 bg-white p-6 rounded-lg border shadow-sm max-w-3xl mx-auto animate-on-scroll opacity-0">
              <h3 className="text-xl font-bold mb-4">Looking for a custom plan?</h3>
              <p className="mb-4 text-slate-600">We offer custom pricing for agencies and enterprises with specific needs.</p>
              <Button variant="outline">Contact Sales</Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                What Our Customers Say
              </h2>
              <p className="text-lg text-slate-600">
                Discover how SEO.ai has transformed businesses and helped them achieve remarkable results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border shadow-sm animate-on-scroll opacity-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-600 mb-6 italic">"{testimonial.comment}"</p>
                    <div className="flex items-center gap-3">
                      <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 rounded-xl bg-white border p-8 shadow-lg flex flex-col md:flex-row gap-6 items-center max-w-4xl mx-auto animate-on-scroll opacity-0">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-3">Ready to boost your search rankings?</h3>
                <p className="text-slate-600 mb-6">
                  Join thousands of marketers and SEO professionals who have transformed their search performance with SEO.ai.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/dashboard">
                    <Button>Start for Free</Button>
                  </Link>
                  <Button variant="outline" asChild>
                    <Link to="#how-it-works">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
                  alt="SEO Growth Chart" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Start optimizing your content today
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join thousands of businesses using SEO.ai to boost their search rankings and drive more targeted traffic.
              </p>
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="mb-6">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-sm opacity-80">No credit card required. Cancel anytime.</p>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <span className="font-bold text-xl text-white">SEO.ai</span>
              </div>
              <p className="mb-6 text-slate-400">
                AI-powered SEO optimization tools to boost your search rankings and drive more organic traffic.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/api" className="text-slate-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#testimonials" className="text-slate-400 hover:text-white transition-colors">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} SEO.ai. All rights reserved.
              </p>
              
              <form onSubmit={handleEmailSubmit} className="flex w-full max-w-sm gap-2">
                <div className="flex-1">
                  <Label htmlFor="email" className="sr-only">Email</Label>
                  <Input 
                    id="email" 
                    placeholder="Enter your email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                <Button type="submit" size="sm">
                  Subscribe
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
