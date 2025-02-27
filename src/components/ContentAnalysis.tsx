
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { analyzeReadability, calculateSeoScore } from '@/utils/seoUtils';
import { BarChart3, BookOpen, Clock, FileText } from 'lucide-react';

interface ContentAnalysisProps {
  content: string;
  title: string;
  targetKeyword: string;
}

export function ContentAnalysis({ content, title, targetKeyword }: ContentAnalysisProps) {
  const [seoScore, setSeoScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState<Record<string, number>>({});
  const [readability, setReadability] = useState({
    score: 0,
    wordCount: 0,
    sentenceCount: 0,
    avgWordsPerSentence: 0,
    paragraphCount: 0,
    readingTime: 0
  });
  
  useEffect(() => {
    if (content) {
      // Calculate readability metrics
      const readabilityResults = analyzeReadability(content);
      setReadability(readabilityResults);
      
      // Calculate overall SEO score
      if (targetKeyword) {
        const seoResults = calculateSeoScore(content, targetKeyword, title);
        setSeoScore(seoResults.score);
        setScoreBreakdown(seoResults.breakdown);
      }
    }
  }, [content, title, targetKeyword]);
  
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
  
  const getReadabilityLevel = (score: number) => {
    if (score >= 80) return { label: 'Easy to read', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { label: 'Moderately readable', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Difficult to read', color: 'bg-red-100 text-red-800' };
  };

  return (
    <Card className="shadow-sm border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-violet-500" />
          Content Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall SEO Score */}
        <div>
          <div className="flex items-end justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Overall SEO Score</h3>
            <span className={`text-2xl font-bold ${getScoreColor(seoScore)}`}>
              {seoScore}/100
            </span>
          </div>
          <Progress value={seoScore} className={`h-2 ${getScoreBg(seoScore)}`} />
          
          {targetKeyword ? (
            <>
              {/* Score breakdown */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="p-2 rounded-md bg-gray-50">
                  <div className="text-xs text-muted-foreground">Content Quality</div>
                  <div className="text-sm font-medium">
                    {scoreBreakdown.content || 0}/20
                  </div>
                </div>
                <div className="p-2 rounded-md bg-gray-50">
                  <div className="text-xs text-muted-foreground">Keyword Usage</div>
                  <div className="text-sm font-medium">
                    {scoreBreakdown.keyword || 0}/30
                  </div>
                </div>
                <div className="p-2 rounded-md bg-gray-50">
                  <div className="text-xs text-muted-foreground">Readability</div>
                  <div className="text-sm font-medium">
                    {scoreBreakdown.readability || 0}/20
                  </div>
                </div>
                <div className="p-2 rounded-md bg-gray-50">
                  <div className="text-xs text-muted-foreground">Structure</div>
                  <div className="text-sm font-medium">
                    {scoreBreakdown.structure || 0}/15
                  </div>
                </div>
                <div className="p-2 rounded-md bg-gray-50 col-span-2">
                  <div className="text-xs text-muted-foreground">Meta Information</div>
                  <div className="text-sm font-medium">
                    {scoreBreakdown.meta || 0}/15
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground mt-2">
              Select a target keyword to view detailed SEO score
            </div>
          )}
        </div>
        
        {/* Content Stats */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Content Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Words</div>
                <div className="text-lg font-medium">{readability.wordCount}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Paragraphs</div>
                <div className="text-lg font-medium">{readability.paragraphCount}</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Reading Time</div>
                <div className="text-lg font-medium">
                  {readability.readingTime} min
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="text-sm text-muted-foreground mb-1">Readability</div>
              <Badge 
                variant="outline" 
                className={`font-normal ${getReadabilityLevel(readability.score).color}`}
              >
                {getReadabilityLevel(readability.score).label}
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Target Keyword */}
        {targetKeyword && (
          <div className="pt-2 border-t">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Target Keyword</h3>
            <Badge className="px-3 py-1 h-7">{targetKeyword}</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ContentAnalysis;
