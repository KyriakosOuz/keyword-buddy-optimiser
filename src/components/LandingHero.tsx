
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Search, FileText, BarChart, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function LandingHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleAudit = (e) => {
    e.preventDefault();
    if (!url) {
      toast({
        title: "Please enter a URL",
        description: "Enter a valid website URL to analyze",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      toast({
        title: "SEO Audit Complete!",
        description: "We've analyzed your website and found optimization opportunities.",
      });
    }, 3000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Particle animation
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: Math.random() * 10 + 5 + "px",
              height: Math.random() * 10 + 5 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDuration: Math.random() * 10 + 20 + "s",
              animationDelay: Math.random() * 5 + "s",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-44">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 to-background z-0"></div>
      
      {/* Interactive particle background */}
      <ParticleBackground />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="content-container relative z-10">
        {/* Hero content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 mr-2" />
            <span>AI-Powered SEO Optimization</span>
          </motion.div>
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-balance mb-6"
          >
            AI-Powered SEO Optimization – <span className="text-primary relative inline-block">
              Instantly
              <svg className="absolute -bottom-1 left-0 w-full h-2 text-primary/20" viewBox="0 0 124 24" fill="currentColor">
                <path d="M0.5 11.75C0.5 11.75 35 -11.25 62 11.75C89 34.75 123.5 11.75 123.5 11.75" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </span> Boost Your Rankings & Traffic!
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance"
          >
            Leverage AI to transform your content into search-optimized assets that rank higher, 
            drive more traffic, and convert better – all in minutes, not hours.
          </motion.p>
          
          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button size="lg" asChild className="w-full sm:w-auto bg-primary shadow-lg hover:shadow-xl transition-all">
              <Link to="/dashboard">
                Try AI SEO for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <a href="#how-it-works">See How It Works</a>
            </Button>
            <span className="text-sm text-muted-foreground mt-2 sm:mt-0">No Credit Card Required!</span>
          </motion.div>
        </div>
        
        {/* Live Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-3xl mx-auto mt-4 bg-white/90 rounded-xl shadow-lg border p-6"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Try a Free SEO Audit Now</h3>
          <form onSubmit={handleAudit} className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex-1">
              <Input
                type="url"
                placeholder="Enter your website URL (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Analyzing...
                </>
              ) : (
                <>Analyze My Site<ExternalLink className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </form>

          {showResults && (
            <div className="bg-slate-50 rounded-lg p-4 border animate-fade-in">
              <div className="mb-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{url}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="text-sm px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">SEO Score: 68/100</div>
                    <div className="text-sm text-muted-foreground">Optimization opportunities found</div>
                  </div>
                </div>
                <Link to="/dashboard">
                  <Button size="sm" variant="outline">See Full Report</Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium mb-1 flex items-center gap-1">
                    <Search className="h-3.5 w-3.5 text-red-500" />
                    Meta Tags Issues
                  </h5>
                  <p className="text-muted-foreground">Missing description & keyword-rich title</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium mb-1 flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5 text-amber-500" />
                    Content Gaps
                  </h5>
                  <p className="text-muted-foreground">Low keyword density & heading structure</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium mb-1 flex items-center gap-1">
                    <BarChart className="h-3.5 w-3.5 text-green-500" />
                    Ranking Potential
                  </h5>
                  <p className="text-muted-foreground">+35% with our AI optimization</p>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Link to="/dashboard">
                  <Button>Fix All Issues with AI</Button>
                </Link>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-center mt-4 gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Instant Analysis</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Free Basic Report</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No Sign-up Required</span>
            </div>
          </div>
        </motion.div>
        
        {/* Feature highlights */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-6 rounded-xl glass-card hover-scale group">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Keyword Intelligence</h3>
            <p className="text-muted-foreground mb-4">
              Discover high-performing keywords that align perfectly with your content and audience intent.
            </p>
            <Button variant="outline" size="sm" className="mt-auto" asChild>
              <Link to="/dashboard">See in Action</Link>
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-6 rounded-xl glass-card hover-scale group">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Content Optimization</h3>
            <p className="text-muted-foreground mb-4">
              Get actionable suggestions to enhance your content structure, readability, and search relevance.
            </p>
            <Button variant="outline" size="sm" className="mt-auto" asChild>
              <Link to="/dashboard">See in Action</Link>
            </Button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center p-6 rounded-xl glass-card hover-scale group">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Performance Insights</h3>
            <p className="text-muted-foreground mb-4">
              Track the impact of your optimizations with clear metrics and competitive analysis.
            </p>
            <Button variant="outline" size="sm" className="mt-auto" asChild>
              <Link to="/dashboard">See in Action</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default LandingHero;
