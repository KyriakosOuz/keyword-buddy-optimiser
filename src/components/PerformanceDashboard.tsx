
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar, ResponsiveContainer } from 'recharts';
import { calculateSeoScore } from '@/utils/seoUtils';
import { Badge } from '@/components/ui/badge';
import { LineChart as LineChartIcon, BarChart3, TrendingUp, Search, Lightbulb, GanttChart } from 'lucide-react';

interface PerformanceDashboardProps {
  content: string;
  title: string;
  targetKeyword: string;
}

export function PerformanceDashboard({ content, title, targetKeyword }: PerformanceDashboardProps) {
  const [seoScore, setSeoScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for demonstrations
  const [keywordRankingData, setKeywordRankingData] = useState<any[]>([]);
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const [competitorData, setCompetitorData] = useState<any[]>([]);
  
  useEffect(() => {
    if (content && targetKeyword) {
      // Calculate overall SEO score
      const seoResults = calculateSeoScore(content, targetKeyword, title);
      setSeoScore(seoResults.score);
      setScoreBreakdown(seoResults.breakdown);
      
      // Generate mock data for demonstration
      generateMockData();
    }
  }, [content, title, targetKeyword]);
  
  const generateMockData = () => {
    // Mock keyword ranking data
    const rankingData = [
      { date: 'Jan', position: Math.floor(Math.random() * 30) + 1 },
      { date: 'Feb', position: Math.floor(Math.random() * 30) + 1 },
      { date: 'Mar', position: Math.floor(Math.random() * 20) + 1 },
      { date: 'Apr', position: Math.floor(Math.random() * 15) + 1 },
      { date: 'May', position: Math.floor(Math.random() * 10) + 1 },
      { date: 'Jun', position: Math.floor(Math.random() * 8) + 1 },
    ];
    setKeywordRankingData(rankingData);
    
    // Mock traffic data
    const traffic = [
      { date: 'Jan', organic: Math.floor(Math.random() * 500), direct: Math.floor(Math.random() * 300) },
      { date: 'Feb', organic: Math.floor(Math.random() * 600), direct: Math.floor(Math.random() * 350) },
      { date: 'Mar', organic: Math.floor(Math.random() * 800), direct: Math.floor(Math.random() * 400) },
      { date: 'Apr', organic: Math.floor(Math.random() * 1000), direct: Math.floor(Math.random() * 450) },
      { date: 'May', organic: Math.floor(Math.random() * 1200), direct: Math.floor(Math.random() * 500) },
      { date: 'Jun', organic: Math.floor(Math.random() * 1500), direct: Math.floor(Math.random() * 550) },
    ];
    setTrafficData(traffic);
    
    // Mock competitor data
    const competitors = [
      { name: 'Your Site', score: seoScore, keywordCount: Math.floor(Math.random() * 30) + 70 },
      { name: 'Competitor A', score: Math.floor(Math.random() * 15) + 70, keywordCount: Math.floor(Math.random() * 30) + 60 },
      { name: 'Competitor B', score: Math.floor(Math.random() * 15) + 60, keywordCount: Math.floor(Math.random() * 20) + 50 },
      { name: 'Competitor C', score: Math.floor(Math.random() * 15) + 40, keywordCount: Math.floor(Math.random() * 15) + 30 },
    ];
    setCompetitorData(competitors);
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
          SEO Performance Dashboard
        </CardTitle>
        <CardDescription>
          Track your SEO metrics, keyword rankings and compare with competitors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <GanttChart className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="keywords" className="flex items-center gap-1">
              <Search className="h-4 w-4" />
              <span>Keywords</span>
            </TabsTrigger>
            <TabsTrigger value="traffic" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>Traffic</span>
            </TabsTrigger>
            <TabsTrigger value="competitors" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span>Competitors</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">SEO Score</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-end justify-between">
                    <span className={`text-3xl font-bold ${getScoreColor(seoScore)}`}>
                      {seoScore}
                    </span>
                    <span className="text-sm text-muted-foreground">out of 100</span>
                  </div>
                  <Progress value={seoScore} className={`h-2 mt-2 ${getScoreBg(seoScore)}`} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Keyword Position</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold text-indigo-500">
                      {keywordRankingData.length > 0 ? keywordRankingData[keywordRankingData.length - 1].position : 'N/A'}
                    </span>
                    <span className="text-sm text-muted-foreground">current rank</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {keywordRankingData.length > 1 && 
                      keywordRankingData[keywordRankingData.length - 1].position < keywordRankingData[keywordRankingData.length - 2].position 
                      ? "Improved from last month" 
                      : "Decreased from last month"}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Organic Traffic</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-bold text-green-500">
                      {trafficData.length > 0 ? trafficData[trafficData.length - 1].organic : 'N/A'}
                    </span>
                    <span className="text-sm text-muted-foreground">visitors/month</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {trafficData.length > 1 && 
                      ((trafficData[trafficData.length - 1].organic - trafficData[trafficData.length - 2].organic) / 
                      trafficData[trafficData.length - 2].organic * 100).toFixed(1)}% growth
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">SEO Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <div className="p-2 rounded-md bg-gray-50">
                      <div className="text-xs text-muted-foreground">Content Quality</div>
                      <div className="text-sm font-medium">
                        {scoreBreakdown.content || 0}/20
                      </div>
                      <Progress value={(scoreBreakdown.content || 0) * 5} className="h-1 mt-1" />
                    </div>
                    <div className="p-2 rounded-md bg-gray-50">
                      <div className="text-xs text-muted-foreground">Keyword Usage</div>
                      <div className="text-sm font-medium">
                        {scoreBreakdown.keyword || 0}/30
                      </div>
                      <Progress value={(scoreBreakdown.keyword || 0) * 3.33} className="h-1 mt-1" />
                    </div>
                    <div className="p-2 rounded-md bg-gray-50">
                      <div className="text-xs text-muted-foreground">Readability</div>
                      <div className="text-sm font-medium">
                        {scoreBreakdown.readability || 0}/20
                      </div>
                      <Progress value={(scoreBreakdown.readability || 0) * 5} className="h-1 mt-1" />
                    </div>
                    <div className="p-2 rounded-md bg-gray-50">
                      <div className="text-xs text-muted-foreground">Structure</div>
                      <div className="text-sm font-medium">
                        {scoreBreakdown.structure || 0}/15
                      </div>
                      <Progress value={(scoreBreakdown.structure || 0) * 6.67} className="h-1 mt-1" />
                    </div>
                    <div className="p-2 rounded-md bg-gray-50">
                      <div className="text-xs text-muted-foreground">Meta Information</div>
                      <div className="text-sm font-medium">
                        {scoreBreakdown.meta || 0}/15
                      </div>
                      <Progress value={(scoreBreakdown.meta || 0) * 6.67} className="h-1 mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="keywords" className="space-y-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Keyword Ranking Trend</CardTitle>
                <CardDescription>Position trend for "{targetKeyword || 'primary keyword'}"</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={keywordRankingData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis reversed />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="position" 
                        name="Position" 
                        stroke="#6366f1" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs text-muted-foreground text-center mt-2">
                  Note: Lower position numbers indicate better rankings (1 is the top result)
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Keyword Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                      <span>"{targetKeyword} best practices"</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">High Potential</Badge>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                      <span>"{targetKeyword} examples"</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">High Potential</Badge>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                      <span>"{targetKeyword} tutorial"</span>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium Potential</Badge>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                      <span>"{targetKeyword} vs"</span>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium Potential</Badge>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Optimization Tips</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-2">
                    <li className="flex gap-2 p-2 bg-gray-50 rounded-md">
                      <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span className="text-sm">Add "{targetKeyword}" to your H1 tag for better ranking.</span>
                    </li>
                    <li className="flex gap-2 p-2 bg-gray-50 rounded-md">
                      <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span className="text-sm">Increase keyword density in the first paragraph.</span>
                    </li>
                    <li className="flex gap-2 p-2 bg-gray-50 rounded-md">
                      <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span className="text-sm">Add more internal links to this page from related content.</span>
                    </li>
                    <li className="flex gap-2 p-2 bg-gray-50 rounded-md">
                      <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span className="text-sm">Update content regularly to keep it fresh for search engines.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="traffic" className="space-y-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Traffic Sources</CardTitle>
                <CardDescription>Monthly traffic trends</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={trafficData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="organic" name="Organic Traffic" fill="#6366f1" />
                      <Bar dataKey="direct" name="Direct Traffic" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Top Landing Pages</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                      <span className="truncate">Homepage</span>
                      <Badge className="ml-2">{Math.floor(Math.random() * 500) + 200}</Badge>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                      <span className="truncate">Blog Post: "{title}"</span>
                      <Badge className="ml-2">{Math.floor(Math.random() * 300) + 100}</Badge>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                      <span className="truncate">About Us</span>
                      <Badge className="ml-2">{Math.floor(Math.random() * 200) + 50}</Badge>
                    </li>
                    <li className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                      <span className="truncate">Services</span>
                      <Badge className="ml-2">{Math.floor(Math.random() * 100) + 25}</Badge>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Search Console Insights</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium">Average CTR</div>
                      <div className="flex items-center">
                        <Progress value={Math.random() * 10 + 2} className="h-2 flex-1" />
                        <span className="ml-2 text-sm">{(Math.random() * 10 + 2).toFixed(1)}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Average Position</div>
                      <div className="flex items-center">
                        <Progress value={(100 / 40) * (Math.random() * 30 + 8)} className="h-2 flex-1" />
                        <span className="ml-2 text-sm">{(Math.random() * 30 + 8).toFixed(1)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Impressions</div>
                      <div className="flex items-center">
                        <Progress value={25} className="h-2 flex-1" />
                        <span className="ml-2 text-sm">{Math.floor(Math.random() * 5000) + 1000}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Clicks</div>
                      <div className="flex items-center">
                        <Progress value={18} className="h-2 flex-1" />
                        <span className="ml-2 text-sm">{Math.floor(Math.random() * 500) + 100}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="competitors" className="space-y-4">
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Competitor SEO Score Comparison</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={competitorData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" name="SEO Score" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Competitor Keyword Analysis</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={competitorData}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="keywordCount" name="Ranking Keywords" fill="#22c55e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Actionable Insights</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-2">
                    <li className="flex gap-2 p-2 bg-gray-50 rounded-md">
                      <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span className="text-sm">Competitor B is ranking higher for "{targetKeyword} tutorial" - consider creating tutorial content.</span>
                    </li>
                    <li className="flex gap-2 p-2 bg-gray-50 rounded-md">
                      <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span className="text-sm">Competitor A has more internal links - improve your internal linking strategy.</span>
                    </li>
                    <li className="flex gap-2 p-2 bg-gray-50 rounded-md">
                      <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span className="text-sm">All competitors are using schema markup - prioritize schema implementation.</span>
                    </li>
                    <li className="flex gap-2 p-2 bg-gray-50 rounded-md">
                      <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span className="text-sm">Your content is longer than competitors - highlight this as a strength in your meta description.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is a simulated dashboard with mock data. Connect to Google Search Console 
            and Analytics for real performance metrics.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default PerformanceDashboard;

