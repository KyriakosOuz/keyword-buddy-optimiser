
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentUploader } from "@/components/ContentUploader";
import { KeywordSuggestions } from "@/components/KeywordSuggestions";
import { ContentAnalysis } from "@/components/ContentAnalysis";
import { OptimizationTips } from "@/components/OptimizationTips";
import { MetaTagGenerator } from "@/components/MetaTagGenerator";
import { FileText, PenSquare, BarChart3, Tag, ArrowLeft } from "lucide-react";
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
          <div className="w-24"></div> {/* Empty div for flex spacing */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="analysis" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Content Analysis</span>
                  </TabsTrigger>
                  <TabsTrigger value="tips" className="flex items-center gap-2">
                    <PenSquare className="h-4 w-4" />
                    <span>Optimization Tips</span>
                  </TabsTrigger>
                  <TabsTrigger value="meta" className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <span>Meta Tags</span>
                  </TabsTrigger>
                </TabsList>

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
          </div>
        </div>
      </main>
    </div>
  );
}
