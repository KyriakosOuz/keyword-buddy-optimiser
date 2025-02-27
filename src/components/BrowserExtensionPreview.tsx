
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Puzzle, Download, ArrowRight, Globe, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function BrowserExtensionPreview() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleDownload = (browser: string) => {
    toast({
      title: `${browser} Extension`,
      description: "Browser extension coming soon! This is a preview.",
    });
  };
  
  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Puzzle className="h-5 w-5 mr-2 text-blue-500" />
          SEO.ai Browser Extension
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="demo">Demo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <div className="flex items-start">
                <AlertCircle className="text-blue-500 mt-0.5 h-5 w-5 mr-2 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-700 mb-1">Coming Soon</h3>
                  <p className="text-sm text-blue-700">
                    The SEO.ai browser extension is currently in development. This is a preview of upcoming functionality.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="rounded-md overflow-hidden border">
              <div className="bg-gray-100 p-3 border-b">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">SEO.ai - Analyze as you browse</span>
                </div>
              </div>
              <div className="p-4 bg-white">
                <p className="text-sm text-gray-700 mb-4">
                  Analyze any webpage for SEO optimization opportunities directly from your browser.
                  Get instant insights without leaving the page you're viewing.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm font-medium mb-1">SEO Score</div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Current page</span>
                      <span className="text-xs font-medium">76/100</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Content Quality</div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Current page</span>
                      <span className="text-xs font-medium">82/100</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button size="sm" variant="outline">View Full Report</Button>
                  <Button size="sm">Fix Issues <ArrowRight className="h-3 w-3 ml-1" /></Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="h-auto py-2 flex flex-col items-center"
                onClick={() => handleDownload('Chrome')}
              >
                <Download className="h-4 w-4 mb-1" />
                <span className="text-sm">Chrome</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-2 flex flex-col items-center"
                onClick={() => handleDownload('Firefox')}
              >
                <Download className="h-4 w-4 mb-1" />
                <span className="text-sm">Firefox</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-2 flex flex-col items-center"
                onClick={() => handleDownload('Edge')}
              >
                <Download className="h-4 w-4 mb-1" />
                <span className="text-sm">Edge</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-4 pt-4">
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Instant Page Analysis</p>
                  <p className="text-sm text-muted-foreground">
                    Get immediate SEO insights for any webpage you visit
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Competitor Research</p>
                  <p className="text-sm text-muted-foreground">
                    Analyze competitors' pages and compare metrics
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="font-medium">SERP Preview</p>
                  <p className="text-sm text-muted-foreground">
                    See how your page will appear in search results
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Keyword Highlighting</p>
                  <p className="text-sm text-muted-foreground">
                    Visualize keyword usage and density on the page
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="font-medium">One-Click Fixes</p>
                  <p className="text-sm text-muted-foreground">
                    Generate optimized content snippets for quick improvements
                  </p>
                </div>
              </li>
            </ul>
          </TabsContent>
          
          <TabsContent value="demo" className="space-y-4 pt-4">
            <div className="border rounded-md shadow-sm">
              <div className="p-3 bg-gray-100 border-b flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <div className="bg-white rounded flex-1 py-1 px-2 text-xs text-center">
                  example.com/blog/seo-strategies
                </div>
              </div>
              <div className="p-4 relative">
                {/* Simulated browser content */}
                <div className="space-y-2 opacity-50">
                  <div className="h-8 bg-gray-200 w-3/4 rounded"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                  </div>
                </div>
                
                {/* Extension overlay */}
                <div className="absolute right-8 top-8 w-60 bg-white border rounded-md shadow-lg z-10">
                  <div className="p-3 border-b flex items-center justify-between">
                    <div className="text-sm font-medium">SEO.ai Analysis</div>
                    <Badge variant="outline" className="text-xs">Pro</Badge>
                  </div>
                  <div className="p-3 space-y-3">
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span>Overall SEO Score</span>
                        <span className="font-medium">72/100</span>
                      </div>
                      <Progress value={72} className="h-1.5" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-medium">Quick Improvements:</div>
                      <ul className="text-xs space-y-1 pl-4 list-disc">
                        <li>Add meta description</li>
                        <li>Optimize heading structure</li>
                        <li>Increase keyword density</li>
                      </ul>
                    </div>
                    <Button size="sm" className="w-full text-xs">View Full Report</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button onClick={() => handleDownload('Chrome')} className="mx-auto">
                <Download className="h-4 w-4 mr-2" />
                Get Early Access
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default BrowserExtensionPreview;
