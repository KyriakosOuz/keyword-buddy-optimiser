
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { getOptimizationTips } from '@/utils/seoUtils';
import { LightbulbIcon, CheckCircle2 } from 'lucide-react';

interface OptimizationTipsProps {
  content: string;
  targetKeyword: string;
}

export function OptimizationTips({ content, targetKeyword }: OptimizationTipsProps) {
  const [tips, setTips] = useState<Array<{ id: number; tip: string; importance: 'high' | 'medium' | 'low' }>>([]);
  const [completedTips, setCompletedTips] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (content && targetKeyword) {
      const optimizationTips = getOptimizationTips(content, targetKeyword);
      setTips(optimizationTips);
    }
  }, [content, targetKeyword]);
  
  useEffect(() => {
    if (tips.length > 0) {
      const newProgress = Math.round((completedTips.length / tips.length) * 100);
      setProgress(newProgress);
    } else {
      setProgress(0);
    }
  }, [completedTips, tips]);
  
  const toggleTip = (id: number) => {
    if (completedTips.includes(id)) {
      setCompletedTips(completedTips.filter(tipId => tipId !== id));
    } else {
      setCompletedTips([...completedTips, id]);
    }
  };
  
  const getImportanceBadge = (importance: 'high' | 'medium' | 'low') => {
    switch (importance) {
      case 'high':
        return <Badge variant="default" className="bg-red-500">High Priority</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="default" className="bg-green-500">Low Priority</Badge>;
      default:
        return null;
    }
  };
  
  const resetProgress = () => {
    setCompletedTips([]);
  };

  return (
    <Card className="shadow-sm border h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center">
            <LightbulbIcon className="h-5 w-5 mr-2 text-amber-500" />
            Optimization Tips
          </CardTitle>
          
          {/* Progress indicator */}
          <div className="flex items-center">
            <div className="text-sm font-medium mr-2">{progress}%</div>
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {targetKeyword ? (
          <>
            {tips.length > 0 ? (
              <div className="space-y-4">
                {tips.map((tip) => (
                  <div 
                    key={tip.id} 
                    className={`p-3 rounded-md border flex items-start gap-3
                      ${completedTips.includes(tip.id) 
                        ? 'bg-gray-50 border-gray-200 text-muted-foreground' 
                        : 'bg-white border-gray-200'}`}
                  >
                    <Checkbox
                      id={`tip-${tip.id}`}
                      checked={completedTips.includes(tip.id)}
                      onCheckedChange={() => toggleTip(tip.id)}
                      className="mt-1"
                    />
                    <div className="space-y-1.5 flex-1">
                      <label
                        htmlFor={`tip-${tip.id}`}
                        className={`text-sm font-medium block
                          ${completedTips.includes(tip.id) ? 'line-through opacity-70' : ''}`}
                      >
                        {tip.tip}
                      </label>
                      <div>
                        {getImportanceBadge(tip.importance)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {completedTips.length > 0 && (
                  <div className="pt-2 flex justify-end">
                    <Button variant="ghost" size="sm" onClick={resetProgress}>
                      Reset Progress
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <LightbulbIcon className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  No optimization tips to show. Try adding more content or selecting a different keyword.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <LightbulbIcon className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              Select a target keyword to view optimization suggestions.
            </p>
          </div>
        )}
        
        {progress === 100 && tips.length > 0 && (
          <div className="mt-4 p-4 rounded-md bg-green-50 border border-green-200 flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-800">All optimizations complete!</p>
              <p className="text-sm text-green-700">
                Great job! You've implemented all our recommendations.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default OptimizationTips;
