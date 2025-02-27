
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentUploader } from "@/components/ContentUploader";
import { KeywordSuggestions } from "@/components/KeywordSuggestions";
import { ContentAnalysis } from "@/components/ContentAnalysis";
import { OptimizationTips } from "@/components/OptimizationTips";
import { MetaTagGenerator } from "@/components/MetaTagGenerator";
import { AltTextGenerator } from "@/components/AltTextGenerator";
import { InternalLinkingSuggestions } from "@/components/InternalLinkingSuggestions";
import { SchemaMarkupGenerator } from "@/components/SchemaMarkupGenerator";
import { ContentImprovementSuggestions } from "@/components/ContentImprovementSuggestions";
import { PerformanceDashboard } from "@/components/PerformanceDashboard";
import { BrowserExtensionPreview } from "@/components/BrowserExtensionPreview";
import { SeoReports } from "@/components/SeoReports";
import { AiChatbot } from "@/components/AiChatbot";
import { FileText, PenSquare, BarChart3, Tag, ArrowLeft, FileImage, Link2, Code, Sparkles, LineChart, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState("analysis");
  const [additionalPages, setAdditionalPages] = useState<{title: string, url: string, content: string}[]>([]);
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'pro' | 'enterprise'>('free');
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  const handleContentSubmit = (contentText: string, contentTitle: string) => {
    if (!contentText || !contentTitle) {
      toast({
        title: "Missing content",
        description: "Please provide both content and a title.",
        variant: "destructive"
      });
      return;
    }
    
    setContent(contentText);
    setTitle(contentTitle);
    setIsAnalyzing(true);
    
    // Simulate analysis process
    toast({
      title: "Analyzing content",
      description: "This may take a few moments..."
    });
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);
      
      // Show upgrade prompt for free users after first analysis
      if (subscriptionTier === 'free' && !showUpgradePrompt) {
        setTimeout(() => {
          setShowUpgradePrompt(true);
        }, 2000);
      }
      
      toast({
        title: "Analysis complete",
        description: "Your content has been analyzed. View results in the tabs.",
      });
    }, 2000);
  };

  const handleSelectKeyword = (keyword: string) => {
    setTargetKeyword(keyword);
    
    if (keyword) {
      toast({
        title: "Keyword selected",
        description: `"${keyword}" is now your target keyword.`,
      });
    }
  };

  const handleAddPage = (page: {title: string, url: string, content: string}) => {
    setAdditionalPages([...additionalPages, page]);
    
    toast({
      title: "Page added",
      description: `"${page.title}" has been added for internal linking analysis.`,
    });
  };
  
  const handleUpgrade = () => {
    window.location.href = '/subscription';
  };
  
  const handleChangePlan = () => {
    window.location.href = '/subscription';
  };

  // Reset analysis if content is cleared
  useEffect(() => {
    if (!content) {
      setIsAnalyzed(false);
      setTargetKeyword("");
    }
  }, [content]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-90">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-center text-gray-900">SEO.ai Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleChangePlan}
              className="flex items-center gap-1"
            >
              <Crown className="h-4 w-4 text-amber-500" />
              <span className="capitalize">{subscriptionTier} Plan</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showUpgradePrompt && subscriptionTier === 'free' && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg mb-8 shadow-md">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white/20 rounded-full">
                <Crown className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">Unlock Premium Features</h3>
                <p className="mb-4 text-white/90">
                  You're using the free version of SEO.ai. Upgrade to Pro for unlimited content analysis, 
                  AI chatbot assistance, and advanced SEO tools.
                </p>
                <div className="flex gap-3">
                  <Button onClick={handleUpgrade} className="bg-white text-indigo-600 hover:bg-white/90">
                    Upgrade to Pro
                  </Button>
                  <Button variant="ghost" className="bg-transparent border border-white text-white hover:bg-white/20" onClick={() => setShowUpgradePrompt(false)}>
                    Remind Me Later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Content Optimization</CardTitle>
                <CardDescription>
                  Upload your content and get SEO recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContentUploader 
                  onContentSubmit={handleContentSubmit}
                  onAddPage={handleAddPage}
                />
                
                {content && (
                  <KeywordSuggestions 
                    content={content}
                    title={title}
                    onSelectKeyword={handleSelectKeyword}
                  />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {isAnalyzing && (
              <Card className="h-full flex flex-col items-center justify-center py-16 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                  <CardTitle className="text-xl">Analyzing Content</CardTitle>
                  <CardDescription className="max-w-md">
                    Our AI is processing your content and generating optimization suggestions...
                  </CardDescription>
                </div>
              </Card>
            )}

            {isAnalyzed && !isAnalyzing && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="analysis" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Content Analysis</span>
                    <span className="sm:hidden">Analysis</span>
                  </TabsTrigger>
                  <TabsTrigger value="tips" className="flex items-center gap-2">
                    <PenSquare className="h-4 w-4" />
                    <span className="hidden sm:inline">Optimization Tips</span>
                    <span className="sm:hidden">Tips</span>
                  </TabsTrigger>
                  <TabsTrigger value="meta" className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span className="hidden sm:inline">Meta Tags</span>
                    <span className="sm:hidden">Meta</span>
                  </TabsTrigger>
                  <TabsTrigger value="alt-text" className="flex items-center gap-2">
                    <FileImage className="h-4 w-4" />
                    <span className="hidden sm:inline">Alt Text</span>
                    <span className="sm:hidden">Alt</span>
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="hidden sm:inline">Advanced SEO</span>
                    <span className="sm:hidden">Advanced</span>
                  </TabsTrigger>
                </TabsList>

                {/* Phase 1 Content */}
                <TabsContent value="analysis" className="space-y-6">
                  <ContentAnalysis 
                    content={content} 
                    title={title}
                    targetKeyword={targetKeyword}
                  />
                </TabsContent>

                <TabsContent value="tips" className="space-y-6">
                  <OptimizationTips 
                    content={content} 
                    targetKeyword={targetKeyword}
                  />
                </TabsContent>

                <TabsContent value="meta" className="space-y-6">
                  <MetaTagGenerator 
                    content={content} 
                    title={title}
                    targetKeyword={targetKeyword}
                  />
                </TabsContent>
                
                <TabsContent value="alt-text" className="space-y-6">
                  <AltTextGenerator 
                    content={content}
                    targetKeyword={targetKeyword}
                  />
                </TabsContent>

                {/* Phase 2 Content - Advanced Tab with Nested Tabs */}
                <TabsContent value="advanced" className="space-y-6">
                  <Tabs defaultValue="internal-linking" className="w-full">
                    <TabsList className="w-full justify-start mb-4">
                      <TabsTrigger value="internal-linking" className="flex items-center gap-1">
                        <Link2 className="h-4 w-4" />
                        <span>Internal Linking</span>
                      </TabsTrigger>
                      <TabsTrigger value="schema" className="flex items-center gap-1">
                        <Code className="h-4 w-4" />
                        <span>Schema Markup</span>
                      </TabsTrigger>
                      <TabsTrigger value="content-improvement" className="flex items-center gap-1">
                        <Sparkles className="h-4 w-4" />
                        <span>Content Improvement</span>
                      </TabsTrigger>
                      <TabsTrigger value="performance" className="flex items-center gap-1">
                        <LineChart className="h-4 w-4" />
                        <span>Performance</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="internal-linking" className="mt-0">
                      <InternalLinkingSuggestions 
                        content={content}
                        title={title}
                        additionalPages={additionalPages}
                        targetKeyword={targetKeyword}
                      />
                    </TabsContent>
                    
                    <TabsContent value="schema" className="mt-0">
                      <SchemaMarkupGenerator 
                        content={content}
                        title={title}
                        targetKeyword={targetKeyword}
                      />
                    </TabsContent>
                    
                    <TabsContent value="content-improvement" className="mt-0">
                      <ContentImprovementSuggestions 
                        content={content}
                        title={title}
                        targetKeyword={targetKeyword}
                      />
                    </TabsContent>
                    
                    <TabsContent value="performance" className="mt-0">
                      <PerformanceDashboard 
                        content={content}
                        title={title}
                        targetKeyword={targetKeyword}
                      />
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              </Tabs>
            )}

            {!isAnalyzed && !isAnalyzing && (
              <Card className="h-full flex flex-col items-center justify-center py-16 text-center">
                <FileText className="h-16 w-16 text-muted-foreground/50 mb-6" />
                <CardTitle className="text-xl mb-2">No Content Analyzed Yet</CardTitle>
                <CardDescription className="max-w-md mb-8">
                  Upload your content on the left and add keywords to analyze your text
                  and get optimization suggestions.
                </CardDescription>
                <Button variant="outline" onClick={() => window.scrollTo(0, 0)}>
                  Start Analysis
                </Button>
              </Card>
            )}
            
            {/* Phase 4 Components */}
            {isAnalyzed && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <BrowserExtensionPreview />
                <SeoReports />
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Fixed AI Chatbot */}
      <AiChatbot />
    </div>
  );
}
