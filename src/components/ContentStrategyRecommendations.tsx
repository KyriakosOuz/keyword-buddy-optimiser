
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  generateContentIdeas, 
  suggestPostingTimes, 
  identifyContentGaps,
  analyzeContentTrends
} from '@/utils/seoUtils';
import { 
  Calendar, 
  Clock, 
  Copy, 
  Check, 
  TrendingUp, 
  FileText, 
  PieChart, 
  Lightbulb,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentStrategyRecommendationsProps {
  content: string;
  title: string;
  targetKeyword: string;
}

export function ContentStrategyRecommendations({ 
  content, 
  title, 
  targetKeyword 
}: ContentStrategyRecommendationsProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('topic-ideas');
  const [contentIdeas, setContentIdeas] = useState<Array<{title: string; description: string; difficulty: string; potential: string}>>([]);
  const [postingTimes, setPostingTimes] = useState<Array<{day: string; time: string; reason: string}>>([]);
  const [contentGaps, setContentGaps] = useState<Array<{topic: string; relevance: string; competitionLevel: string}>>([]);
  const [trendingTopics, setTrendingTopics] = useState<Array<{keyword: string; volume: number; growth: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    if (!targetKeyword) return;
    
    setLoading(true);
    
    // Generate content ideas based on target keyword
    const ideas = generateContentIdeas(targetKeyword);
    setContentIdeas(ideas);
    
    // Get optimal posting time suggestions
    const times = suggestPostingTimes(targetKeyword);
    setPostingTimes(times);
    
    // Identify content gaps
    const gaps = identifyContentGaps(targetKeyword, content);
    setContentGaps(gaps);
    
    // Get trending topics related to the keyword
    const trends = analyzeContentTrends(targetKeyword);
    setTrendingTopics(trends);
    
    setLoading(false);
  }, [targetKeyword, content]);
  
  const handleCopy = (text: string, itemType: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(itemType);
    
    toast({
      title: "Copied to clipboard",
      description: `${itemType} has been copied to your clipboard.`
    });
    
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'hard': return 'bg-red-100 text-red-800 hover:bg-red-100';
      default: return '';
    }
  };
  
  const getPotentialColor = (potential: string) => {
    switch(potential.toLowerCase()) {
      case 'high': return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'low': return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      default: return '';
    }
  };
  
  const getCompetitionColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'high': return 'bg-red-100 text-red-800 hover:bg-red-100';
      default: return '';
    }
  };

  return (
    <Card className="shadow-sm border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
          Content Strategy Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-2/3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-4/5 animate-pulse"></div>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="topic-ideas" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Topic Ideas</span>
              </TabsTrigger>
              <TabsTrigger value="posting-times" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Posting Times</span>
              </TabsTrigger>
              <TabsTrigger value="content-gaps" className="flex items-center gap-1">
                <PieChart className="h-4 w-4" />
                <span>Content Gaps</span>
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>Trending</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Topic Ideas Tab */}
            <TabsContent value="topic-ideas" className="space-y-4">
              <div className="grid gap-3">
                {contentIdeas.map((idea, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-sm">{idea.title}</h3>
                      <div className="flex space-x-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge className={getDifficultyColor(idea.difficulty)}>
                                {idea.difficulty}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Difficulty level to create</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge className={getPotentialColor(idea.potential)}>
                                {idea.potential} potential
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Potential traffic impact</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{idea.description}</p>
                    <div className="mt-2 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-xs"
                        onClick={() => handleCopy(idea.title, 'Topic idea')}
                      >
                        {copiedItem === 'Topic idea' ? (
                          <Check className="h-3.5 w-3.5 mr-1" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 mr-1" />
                        )}
                        Copy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Posting Times Tab */}
            <TabsContent value="posting-times" className="space-y-4">
              <div className="grid gap-3">
                {postingTimes.map((post, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md flex items-center">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="bg-blue-100 p-2 rounded-full">
                        {post.day.toLowerCase().includes('weekend') ? (
                          <Calendar className="h-5 w-5 text-blue-700" />
                        ) : (
                          <Clock className="h-5 w-5 text-blue-700" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{post.day} at {post.time}</h3>
                        <p className="text-xs text-muted-foreground">{post.reason}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-xs"
                      onClick={() => handleCopy(`${post.day} at ${post.time}`, 'Posting time')}
                    >
                      {copiedItem === 'Posting time' ? (
                        <Check className="h-3.5 w-3.5 mr-1" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 mr-1" />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Content Gaps Tab */}
            <TabsContent value="content-gaps" className="space-y-4">
              <div className="grid gap-3">
                {contentGaps.map((gap, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-sm">{gap.topic}</h3>
                      <div className="flex space-x-1">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                {gap.relevance} relevance
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Relevance to your content</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge className={getCompetitionColor(gap.competitionLevel)}>
                                {gap.competitionLevel} competition
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Level of competition for this topic</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-xs"
                        onClick={() => handleCopy(gap.topic, 'Content gap')}
                      >
                        {copiedItem === 'Content gap' ? (
                          <Check className="h-3.5 w-3.5 mr-1" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 mr-1" />
                        )}
                        Copy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {/* Trending Tab */}
            <TabsContent value="trending" className="space-y-4">
              <div className="grid gap-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-sm">{topic.keyword}</h3>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                        {topic.growth} growth
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                      <div className="flex items-center">
                        <BarChart3 className="h-3.5 w-3.5 mr-1 text-purple-500" />
                        <span>Monthly volume: {topic.volume.toLocaleString()}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-xs"
                        onClick={() => handleCopy(topic.keyword, 'Trending keyword')}
                      >
                        {copiedItem === 'Trending keyword' ? (
                          <Check className="h-3.5 w-3.5 mr-1" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 mr-1" />
                        )}
                        Copy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
        
        <div className="mt-5 text-xs text-muted-foreground">
          <p className="flex items-center">
            <Lightbulb className="h-3.5 w-3.5 mr-1 text-amber-500" />
            <span>Recommendations are based on current search trends and your target keyword: <strong>{targetKeyword || 'None selected'}</strong></span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ContentStrategyRecommendations;
