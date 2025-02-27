
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Search, FileText, BarChart } from "lucide-react";

export function LandingHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-44">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 to-background z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="content-container relative z-10">
        {/* Hero content */}
        <div className="max-w-3xl mx-auto text-center">
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
            Elevate Your Content with Precise SEO Intelligence
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance"
          >
            Transform your content into highly optimized, search-friendly assets that 
            drive organic traffic with our intelligent AI analysis and recommendations.
          </motion.p>
          
          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link to="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </motion.div>
        </div>
        
        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          <div className="flex flex-col items-center text-center p-6 rounded-xl glass-card hover-scale">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Keyword Intelligence</h3>
            <p className="text-muted-foreground">
              Discover high-performing keywords that align perfectly with your content and audience intent.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-xl glass-card hover-scale">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Content Optimization</h3>
            <p className="text-muted-foreground">
              Get actionable suggestions to enhance your content structure, readability, and search relevance.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 rounded-xl glass-card hover-scale">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Performance Insights</h3>
            <p className="text-muted-foreground">
              Track the impact of your optimizations with clear metrics and competitive analysis.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LandingHero;
