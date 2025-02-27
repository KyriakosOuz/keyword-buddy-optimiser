
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Copy, Check, AlertCircle } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { getContentImprovementSuggestions } from '@/utils/seoUtils';

interface ContentImprovementSuggestionsProps {
  content: string;
  title: string;
  targetKeyword: string;
}

type SuggestionType = 'readability' | 'passive-voice' | 'keyword-variation' | 'cta';

interface Suggestion {
  id: number;
  type: SuggestionType;
  original: string;
  improved: string;
  explanation: string;
  context?: string;
}

export function ContentImprovementSuggestions({ 
  content, 
  title, 
  targetKeyword
}: ContentImprovementSuggestionsProps) {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeSuggestionType, setActiveSuggestionType] = useState<SuggestionType | 'all'>('all');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  
  useEffect(() => {
    if (content && title) {
      setLoading(true);
      
      // Get content improvement suggestions from utils
      const improvementSuggestions = getContentImprovementSuggestions(content, title, targetKeyword);
      setSuggestions(improvementSuggestions);
      
      setLoading(false);
    } else {
      setSuggestions([]);
    }
  }, [content, title, targetKeyword]);
  
  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    
    toast({
      title: "Copied to clipboard",
      description: "Improved text has been copied to your clipboard."
    });
    
    setTimeout(() => setCopied(null), 2000);
  };
  
  const filteredSuggestions = activeSuggestionType === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.type === activeSuggestionType);
  
  const getSuggestionTypeLabel = (type: SuggestionType): string => {
    switch (type) {
      case 'readability': return 'Readability';
      case 'passive-voice': return 'Passive Voice';
      case 'keyword-variation': return 'Keyword Variation';
      case 'cta': return 'Call to Action';
      default: return type;
    }
  };
  
  const getSuggestionTypeBadge = (type: SuggestionType) => {
    switch (type) {
      case 'readability':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Readability</Badge>;
      case 'passive-voice':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Passive Voice</Badge>;
      case 'keyword-variation':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Keyword Variation</Badge>;
      case 'cta':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Call to Action</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-indigo-500" />
          Content Improvement Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-24 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-24 bg-gray-200 rounded-md animate-pulse" />
          </div>
        ) : suggestions.length > 0 ? (
          <div className="space-y-4">
            <Tabs 
              value={activeSuggestionType} 
              onValueChange={(value) => setActiveSuggestionType(value as SuggestionType | 'all')}
              className="w-full"
            >
              <TabsList className="w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="readability">Readability</TabsTrigger>
                <TabsTrigger value="passive-voice">Passive Voice</TabsTrigger>
                <TabsTrigger value="keyword-variation">Keywords</TabsTrigger>
                <TabsTrigger value="cta">CTAs</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="pt-2">
              <Accordion type="multiple" className="w-full">
                {filteredSuggestions.map((suggestion) => (
                  <AccordionItem 
                    key={suggestion.id} 
                    value={`suggestion-${suggestion.id}`}
                    className="border border-gray-200 rounded-md mb-3 overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 hover:no-underline">
                      <div className="flex items-center justify-between w-full text-left">
                        <div className="flex items-center gap-2">
                          {getSuggestionTypeBadge(suggestion.type)}
                          <span className="font-medium line-clamp-1">
                            {suggestion.explanation}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        {suggestion.context && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Context:</p>
                            <div className="p-2 bg-gray-50 rounded-md text-sm">
                              {suggestion.context}
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Original:</p>
                          <div className="p-2 bg-gray-50 rounded-md text-sm border-l-2 border-red-300">
                            {suggestion.original}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Improved Version:</p>
                          <div className="p-2 bg-green-50 rounded-md text-sm border-l-2 border-green-300 relative">
                            {suggestion.improved}
                            <Button
                              variant="secondary"
                              size="sm"
                              className="absolute top-1 right-1"
                              onClick={() => copyToClipboard(suggestion.improved, suggestion.id)}
                            >
                              {copied === suggestion.id ? (
                                <Check className="h-3 w-3 mr-1" />
                              ) : (
                                <Copy className="h-3 w-3 mr-1" />
                              )}
                              Copy
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Explanation:</p>
                          <div className="p-2 bg-blue-50 rounded-md text-sm text-blue-800">
                            {suggestion.explanation}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              {content 
                ? "No content improvement suggestions found. Your content appears to be well-optimized!"
                : "Add content to receive improvement suggestions."}
            </p>
          </div>
        )}
        
        {suggestions.length > 0 && (
          <div className="pt-4 border-t mt-4">
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-700">
                <strong>Pro Tip:</strong> Implementing these suggestions can significantly improve your content's 
                readability, engagement, and search engine performance. Focus on the high-priority items first.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ContentImprovementSuggestions;
