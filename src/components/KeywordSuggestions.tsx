
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { extractKeywords, generateRelatedKeywords } from '@/utils/seoUtils';
import { AlertCircle, Copy, Check, Sparkles } from 'lucide-react';

interface KeywordSuggestionsProps {
  content: string;
  title: string;
  onSelectKeyword: (keyword: string) => void;
}

export function KeywordSuggestions({ content, title, onSelectKeyword }: KeywordSuggestionsProps) {
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([]);
  const [relatedKeywords, setRelatedKeywords] = useState<string[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [copiedKeyword, setCopiedKeyword] = useState('');

  useEffect(() => {
    if (!content) return;
    
    setLoading(true);
    
    // Extract keywords from content
    const keywords = extractKeywords(content);
    setExtractedKeywords(keywords);
    
    // Get related keywords based on the title and top keywords
    let seedKeyword = '';
    if (title) {
      seedKeyword = title.split(' ').slice(0, 3).join(' ');
    } else if (keywords.length > 0) {
      seedKeyword = keywords[0];
    }
    
    const related = generateRelatedKeywords(seedKeyword);
    setRelatedKeywords(related);
    
    setLoading(false);
  }, [content, title]);
  
  const handleSelectKeyword = (keyword: string) => {
    setSelectedKeyword(keyword);
    onSelectKeyword(keyword);
  };
  
  const handleCopyKeyword = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(''), 2000);
  };

  return (
    <Card className="shadow-sm border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
          Keyword Suggestions
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
          <>
            {(extractedKeywords.length > 0 || relatedKeywords.length > 0) ? (
              <div className="space-y-6">
                {/* Extracted Keywords */}
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">Content Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {extractedKeywords.slice(0, 10).map((keyword, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Badge
                                variant={selectedKeyword === keyword ? "default" : "outline"}
                                className="cursor-pointer group flex items-center px-3 py-1 h-auto"
                                onClick={() => handleSelectKeyword(keyword)}
                              >
                                <span>{keyword}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0 ml-2 opacity-60 group-hover:opacity-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyKeyword(keyword);
                                  }}
                                >
                                  {copiedKeyword === keyword ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                              </Badge>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs">
                              Click to select as primary keyword
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
                
                {/* Related Keywords */}
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">Related Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {relatedKeywords.map((keyword, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Badge
                                variant={selectedKeyword === keyword ? "default" : "secondary"}
                                className="cursor-pointer group flex items-center px-3 py-1 h-auto"
                                onClick={() => handleSelectKeyword(keyword)}
                              >
                                <span>{keyword}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0 ml-2 opacity-60 group-hover:opacity-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyKeyword(keyword);
                                  }}
                                >
                                  {copiedKeyword === keyword ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                              </Badge>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs">
                              Click to select as primary keyword
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 text-center">
                <div>
                  <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    No keywords found. Try adding more content or a different title.
                  </p>
                </div>
              </div>
            )}
            
            {selectedKeyword && (
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Selected Keyword</p>
                    <p className="font-medium">{selectedKeyword}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedKeyword('');
                      onSelectKeyword('');
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default KeywordSuggestions;
