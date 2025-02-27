
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Link2, ExternalLink, AlertCircle, Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateInternalLinkingSuggestions } from '@/utils/seoUtils';

interface InternalLinkingSuggestionsProps {
  content: string;
  title: string;
  targetKeyword: string;
  additionalPages: Array<{title: string, url: string, content: string}>;
}

export function InternalLinkingSuggestions({ 
  content, 
  title, 
  targetKeyword,
  additionalPages 
}: InternalLinkingSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Array<{
    id: number;
    text: string;
    context: string;
    targetPage: string;
    targetUrl: string;
    type: 'inbound' | 'outbound';
    anchors: Array<{
      text: string;
      isSelected: boolean;
    }>;
  }>>([]);
  
  const [noSuggestionsMessage, setNoSuggestionsMessage] = useState('');
  const [isOrphanPage, setIsOrphanPage] = useState(false);
  
  useEffect(() => {
    if (content && additionalPages.length > 0) {
      const internalLinkSuggestions = generateInternalLinkingSuggestions(
        content,
        title,
        targetKeyword,
        additionalPages
      );
      
      setSuggestions(internalLinkSuggestions);
      
      // Check if this is an orphan page (no inbound links)
      const hasInboundLinks = internalLinkSuggestions.some(s => s.type === 'inbound');
      setIsOrphanPage(!hasInboundLinks && additionalPages.length > 0);
      
      if (internalLinkSuggestions.length === 0 && additionalPages.length > 0) {
        setNoSuggestionsMessage('No relevant internal linking opportunities found between these pages.');
      } else if (additionalPages.length === 0) {
        setNoSuggestionsMessage('Add additional pages to generate internal linking suggestions.');
      } else {
        setNoSuggestionsMessage('');
      }
    } else {
      setSuggestions([]);
      if (additionalPages.length === 0) {
        setNoSuggestionsMessage('Add additional pages to generate internal linking suggestions.');
      } else {
        setNoSuggestionsMessage('No content to analyze for internal linking.');
      }
    }
  }, [content, title, targetKeyword, additionalPages]);
  
  const handleSelectAnchor = (suggestionId: number, anchorIndex: number) => {
    setSuggestions(suggestions.map(suggestion => {
      if (suggestion.id === suggestionId) {
        const updatedAnchors = suggestion.anchors.map((anchor, idx) => ({
          ...anchor,
          isSelected: idx === anchorIndex
        }));
        
        return {
          ...suggestion,
          anchors: updatedAnchors
        };
      }
      return suggestion;
    }));
  };
  
  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Link2 className="h-5 w-5 mr-2 text-blue-500" />
          Internal Linking Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isOrphanPage && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-amber-800">Orphan Page Detected</p>
              <p className="text-sm text-amber-700">
                This page has no inbound links from other pages in your site. Consider adding links to 
                this page from relevant pages to improve your site structure and SEO.
              </p>
            </div>
          </div>
        )}
        
        {noSuggestionsMessage ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Link2 className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              {noSuggestionsMessage}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.length > 0 && (
              <Accordion type="multiple" className="w-full">
                {suggestions.map((suggestion) => (
                  <AccordionItem 
                    key={suggestion.id} 
                    value={`suggestion-${suggestion.id}`}
                    className="border border-gray-200 rounded-md mb-3 overflow-hidden"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 hover:no-underline">
                      <div className="flex items-center justify-between w-full text-left">
                        <div className="flex items-center">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "mr-3", 
                              suggestion.type === 'inbound' 
                                ? "bg-blue-50 text-blue-700 border-blue-200" 
                                : "bg-green-50 text-green-700 border-green-200"
                            )}
                          >
                            {suggestion.type === 'inbound' ? 'Inbound Link' : 'Outbound Link'}
                          </Badge>
                          <span className="font-medium">{suggestion.targetPage}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">Context:</p>
                          <div className="p-2 bg-gray-50 rounded-md text-sm">
                            {suggestion.context}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Suggested Anchor Texts:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.anchors.map((anchor, index) => (
                              <Button
                                key={index}
                                variant={anchor.isSelected ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleSelectAnchor(suggestion.id, index)}
                                className="h-auto py-1"
                              >
                                {anchor.isSelected && <Check className="h-3 w-3 mr-1" />}
                                {anchor.text}
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        {suggestion.targetUrl && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">
                              Target URL:
                            </p>
                            <div className="flex items-center">
                              <code className="bg-gray-50 p-1.5 rounded text-xs flex-1">
                                {suggestion.targetUrl}
                              </code>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="ml-2"
                                onClick={() => navigator.clipboard.writeText(suggestion.targetUrl)}
                              >
                                Copy
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            HTML to Insert:
                          </p>
                          <div className="relative">
                            <pre className="bg-gray-50 p-2 rounded-md text-xs overflow-x-auto">
                              {`<a href="${suggestion.targetUrl}">${suggestion.anchors.find(a => a.isSelected)?.text || suggestion.anchors[0].text}</a>`}
                            </pre>
                            <Button 
                              variant="secondary" 
                              size="sm" 
                              className="absolute top-1 right-1"
                              onClick={() => navigator.clipboard.writeText(
                                `<a href="${suggestion.targetUrl}">${suggestion.anchors.find(a => a.isSelected)?.text || suggestion.anchors[0].text}</a>`
                              )}
                            >
                              Copy HTML
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default InternalLinkingSuggestions;
