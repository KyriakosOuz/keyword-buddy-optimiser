
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileBarChart, Download, ArrowUpRight, ArrowDownRight, LineChart, BarChart3, TrendingUp, Lightbulb, Lock, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SeoReports() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleGenerate = () => {
    toast({
      title: "Report Generation",
      description: "Advanced reports require a Pro or Enterprise subscription.",
    });
  };
  
  const handleDownload = (format: string) => {
    toast({
      title: `Download ${format}`,
      description: "This feature requires a Pro or Enterprise subscription.",
    });
  };
  
  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <FileBarChart className="h-5 w-5 mr-2 text-indigo-500" />
          AI-Driven SEO Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="competitor">Competitor Analysis</TabsTrigger>
            <TabsTrigger value="gsc">Search Console</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="font-medium text-sm mb-2">SEO Health Score</div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-2xl font-bold">73</span>
                    <Badge className="flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3" />
                      +5
                    </Badge>
                  </div>
                  <Progress value={73} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">Last month: 68</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardContent className="p-4">
                  <div className="font-medium text-sm mb-2">Ranking Keywords</div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-2xl font-bold">182</span>
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <ArrowDownRight className="h-3 w-3" />
                      -12
                    </Badge>
                  </div>
                  <Progress value={62} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">Last month: 194</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Organic Traffic Trend</h3>
                  <Badge variant="outline">Last 30 days</Badge>
                </div>
                <div className="h-40 w-full bg-gray-100 rounded-md flex items-center justify-center">
                  <LineChart className="h-10 w-10 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">Pro Feature</span>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex items-start space-x-2">
                <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Key Insights</h3>
                  <ul className="space-y-2">
                    <li className="text-sm flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Strength</Badge>
                      <span>Good keyword diversity across main pages</span>
                    </li>
                    <li className="text-sm flex items-center gap-2">
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Opportunity</Badge>
                      <span>Improve meta descriptions (48% are under-optimized)</span>
                    </li>
                    <li className="text-sm flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Issue</Badge>
                      <span>12 broken internal links found</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4 flex flex-wrap gap-2 justify-between items-center">
              <div className="flex gap-2">
                <Button onClick={() => handleDownload('PDF')} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button onClick={() => handleDownload('CSV')} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </Button>
              </div>
              <Button onClick={handleGenerate} className="flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                Generate Custom Report
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="competitor" className="pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Competitor Comparison</h3>
              <Button variant="outline" size="sm" className="text-xs" onClick={handleGenerate}>
                Add Competitors
              </Button>
            </div>
            
            <div className="rounded-md border overflow-hidden mb-4">
              <div className="grid grid-cols-4 text-xs font-medium">
                <div className="p-2 bg-gray-50 border-r">Metric</div>
                <div className="p-2 bg-gray-50 border-r text-center">Your Site</div>
                <div className="p-2 bg-gray-50 border-r text-center">Competitor A</div>
                <div className="p-2 bg-gray-50 text-center">Competitor B</div>
              </div>
              
              <div className="divide-y">
                <div className="grid grid-cols-4 text-xs">
                  <div className="p-2 border-r font-medium">Domain Authority</div>
                  <div className="p-2 border-r text-center">38</div>
                  <div className="p-2 border-r text-center text-red-600">52</div>
                  <div className="p-2 text-center text-green-600">32</div>
                </div>
                
                <div className="grid grid-cols-4 text-xs">
                  <div className="p-2 border-r font-medium">Ranking Keywords</div>
                  <div className="p-2 border-r text-center">182</div>
                  <div className="p-2 border-r text-center text-red-600">348</div>
                  <div className="p-2 text-center text-green-600">156</div>
                </div>
                
                <div className="grid grid-cols-4 text-xs">
                  <div className="p-2 border-r font-medium">Backlinks</div>
                  <div className="p-2 border-r text-center">427</div>
                  <div className="p-2 border-r text-center text-red-600">892</div>
                  <div className="p-2 text-center text-green-600">305</div>
                </div>
                
                <div className="grid grid-cols-4 text-xs">
                  <div className="p-2 border-r font-medium">Content Quality</div>
                  <div className="p-2 border-r text-center">76/100</div>
                  <div className="p-2 border-r text-center text-green-600">72/100</div>
                  <div className="p-2 text-center text-green-600">68/100</div>
                </div>
                
                <div className="grid grid-cols-4 text-xs">
                  <div className="p-2 border-r font-medium">Page Speed</div>
                  <div className="p-2 border-r text-center">83/100</div>
                  <div className="p-2 border-r text-center text-green-600">76/100</div>
                  <div className="p-2 text-center text-green-600">79/100</div>
                </div>
              </div>
            </div>
            
            <div className="h-40 mb-4">
              <div className="h-full w-full bg-gray-100 rounded-md flex items-center justify-center">
                <BarChart3 className="h-10 w-10 text-gray-400" />
                <span className="ml-2 text-sm text-gray-500">Pro Feature - Competitive Gap Analysis</span>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-3 rounded-md mb-4">
              <div className="flex items-start space-x-2">
                <TrendingUp className="h-5 w-5 text-indigo-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-indigo-700 mb-1">Competitive Edge Opportunities</h3>
                  <p className="text-sm text-indigo-700">
                    Unlock detailed competitor analysis with our Pro or Enterprise subscription to identify 
                    content gaps and keyword opportunities.
                  </p>
                </div>
              </div>
            </div>
            
            <Button onClick={handleGenerate} className="w-full">
              <Lock className="h-4 w-4 mr-2" />
              Generate Full Competitor Report
            </Button>
          </TabsContent>
          
          <TabsContent value="gsc" className="pt-4">
            <div className="bg-gray-100 border p-6 rounded-md flex flex-col items-center justify-center mb-4">
              <Calendar className="h-10 w-10 text-gray-400 mb-2" />
              <h3 className="font-medium text-center mb-1">Google Search Console Integration</h3>
              <p className="text-sm text-center text-muted-foreground mb-4 max-w-md">
                Connect your Google Search Console account to import performance data and generate 
                comprehensive reports with actionable insights.
              </p>
              <Button onClick={handleGenerate}>
                <Lock className="h-4 w-4 mr-2" />
                Connect Google Search Console
              </Button>
            </div>
            
            <div className="rounded-md border overflow-hidden mb-4">
              <div className="p-3 bg-gray-50 border-b text-sm font-medium">
                Preview: Top Performing Queries
              </div>
              <div className="divide-y">
                <div className="grid grid-cols-4 text-xs">
                  <div className="p-2 border-r font-medium">Query</div>
                  <div className="p-2 border-r text-center font-medium">Impressions</div>
                  <div className="p-2 border-r text-center font-medium">Clicks</div>
                  <div className="p-2 text-center font-medium">Avg. Position</div>
                </div>
                
                <div className="grid grid-cols-4 text-xs">
                  <div className="p-2 border-r">[keyword data]</div>
                  <div className="p-2 border-r text-center">-</div>
                  <div className="p-2 border-r text-center">-</div>
                  <div className="p-2 text-center">-</div>
                </div>
                
                <div className="grid grid-cols-4 text-xs">
                  <div className="p-2 border-r">[keyword data]</div>
                  <div className="p-2 border-r text-center">-</div>
                  <div className="p-2 border-r text-center">-</div>
                  <div className="p-2 text-center">-</div>
                </div>
                
                <div className="grid grid-cols-4 text-xs">
                  <div className="p-2 border-r">[keyword data]</div>
                  <div className="p-2 border-r text-center">-</div>
                  <div className="p-2 border-r text-center">-</div>
                  <div className="p-2 text-center">-</div>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border overflow-hidden mb-4">
              <div className="p-3 bg-gray-50 border-b text-sm font-medium">
                Preview: Performance Trends
              </div>
              <div className="h-32 w-full bg-gray-100 flex items-center justify-center">
                <LineChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-sm text-gray-500">Connect GSC to view data</span>
              </div>
            </div>
            
            <Button onClick={handleGenerate} className="w-full">
              <Lock className="h-4 w-4 mr-2" />
              Generate GSC Report
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default SeoReports;
