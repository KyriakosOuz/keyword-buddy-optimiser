
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Check, FileImage, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AltTextGeneratorProps {
  content: string;
  targetKeyword: string;
}

export function AltTextGenerator({ content, targetKeyword }: AltTextGeneratorProps) {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateAltText = () => {
    if (!imageUrl) {
      toast({
        title: "Missing image URL",
        description: "Please provide an image URL to generate alt text",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generating alt text
    setTimeout(() => {
      // Generate alt text based on the content, target keyword, and image URL
      let generatedAltText = '';
      
      if (targetKeyword) {
        // If a keyword exists, try to incorporate it
        generatedAltText = `${targetKeyword} visualization showing `;
      }
      
      // Add some descriptive text based on the image URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1].split('.')[0];
      
      // Clean up the filename to make it more readable
      const cleanName = fileName
        .replace(/[_-]/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase();
      
      generatedAltText += cleanName;
      
      // Add relevance to the content if possible
      if (content.length > 100) {
        generatedAltText += ` related to ${content.substring(0, 50).split(' ').slice(0, 5).join(' ')}`;
      }
      
      setAltText(generatedAltText);
      setIsGenerating(false);
      
      toast({
        title: "Alt text generated",
        description: "Alt text has been generated for your image",
      });
    }, 1500);
  };

  const handleCopyAltText = () => {
    navigator.clipboard.writeText(altText);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "Alt text has been copied to your clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefreshAltText = () => {
    if (imageUrl) {
      handleGenerateAltText();
    }
  };

  return (
    <Card className="shadow-sm border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <FileImage className="h-5 w-5 mr-2 text-indigo-500" />
          Alt Text Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="image-url">Image URL</Label>
          <div className="flex gap-2">
            <Input
              id="image-url"
              placeholder="Enter image URL or upload an image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleGenerateAltText}
              disabled={isGenerating || !imageUrl}
            >
              Generate
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Enter the URL of an image to generate SEO-optimized alt text
          </p>
        </div>
        
        {altText && (
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <Label htmlFor="alt-text">Generated Alt Text</Label>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={handleRefreshAltText}
                  disabled={isGenerating}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={handleCopyAltText}
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 mr-1" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 mr-1" />
                  )}
                  Copy
                </Button>
              </div>
            </div>
            <Textarea
              id="alt-text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="resize-none h-20"
            />
            <div className="mt-2 flex flex-col gap-1">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Tips:</span> Good alt text should be descriptive, include relevant keywords naturally, and be concise.
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Character count:</span> {altText.length} (recommended: 80-125 characters)
              </p>
            </div>
          </div>
        )}
        
        {isGenerating && (
          <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-2"></div>
              <p className="text-sm text-muted-foreground">Generating alt text...</p>
            </div>
          </div>
        )}
        
        {!altText && !isGenerating && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileImage className="h-12 w-12 text-muted-foreground/30 mb-2" />
            <p className="text-muted-foreground">
              Enter an image URL and click Generate to create SEO-optimized alt text
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AltTextGenerator;
