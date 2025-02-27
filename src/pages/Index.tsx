
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles, Zap, BookOpen, FileText, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import LandingHero from "@/components/LandingHero";

export default function Index() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <LandingHero />
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Transforming Content into Search-Friendly Assets
              </h2>
              <p className="text-lg text-muted-foreground">
                Our intelligent platform uses AI to analyze and enhance your content 
                for maximum search visibility and user engagement.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border shadow-sm overflow-hidden hover-scale">
                <div className="h-2 bg-primary w-full"></div>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Keyword Intelligence</h3>
                  <p className="text-muted-foreground mb-4">
                    Discover high-impact keywords that align with user intent and your content goals.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Content-driven keyword extraction</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Related keyword suggestions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Competitive keyword analysis</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border shadow-sm overflow-hidden hover-scale">
                <div className="h-2 bg-blue-500 w-full"></div>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Content Optimization</h3>
                  <p className="text-muted-foreground mb-4">
                    Get actionable recommendations to enhance your content's search performance.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Readability analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Structure improvements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Keyword placement suggestions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border shadow-sm overflow-hidden hover-scale">
                <div className="h-2 bg-purple-500 w-full"></div>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">SEO Essentials</h3>
                  <p className="text-muted-foreground mb-4">
                    Generate optimized meta tags and technical SEO elements for better visibility.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Meta tag generation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>SEO score analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Technical SEO recommendations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="content-container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                How SEO.ai Works
              </h2>
              <p className="text-lg text-muted-foreground">
                Our streamlined process helps you optimize your content in minutes, 
                not hours. Just follow these simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
              <div className="relative flex flex-col items-center text-center">
                <div className="absolute top-10 right-0 h-2 w-full bg-gray-200 hidden md:block"></div>
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6 z-10 animate-pulse-soft">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3">1. Upload Content</h3>
                <p className="text-muted-foreground">
                  Add your content by pasting text, uploading a file, or entering a URL.
                </p>
              </div>
              
              <div className="relative flex flex-col items-center text-center">
                <div className="absolute top-10 right-0 h-2 w-full bg-gray-200 hidden md:block"></div>
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6 z-10 animate-pulse-soft">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3">2. Select Keywords</h3>
                <p className="text-muted-foreground">
                  Choose from AI-generated keyword suggestions or enter your own target keywords.
                </p>
              </div>
              
              <div className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6 z-10 animate-pulse-soft">
                  <BarChart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3">3. Get Optimizations</h3>
                <p className="text-muted-foreground">
                  Receive actionable recommendations, meta tags, and an SEO score to improve your content.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Start Optimizing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="content-container">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-lg border-0 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-3/5 p-8 md:p-12 bg-primary text-white">
                    <h2 className="text-3xl font-display font-bold mb-4">
                      Ready to transform your content?
                    </h2>
                    <p className="text-primary-foreground mb-6">
                      Start optimizing your content for search engines today and see the results for yourself.
                    </p>
                    <Button size="lg" variant="secondary" asChild>
                      <Link to="/dashboard">
                        Get Started Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="md:w-2/5 p-8 md:p-12 bg-secondary flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span>Instant SEO analysis</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span>AI-powered recommendations</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span>Meta tag generator</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span>Content structure analysis</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
