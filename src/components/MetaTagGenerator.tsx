
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { generateMetaTags } from '@/utils/seoUtils';
import { Copy, Check, RotateCw, Code } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

interface MetaTagGeneratorProps {
  content: string;
  title: string;
  targetKeyword: string;
}

export function MetaTagGenerator({ content, title, targetKeyword }: MetaTagGeneratorProps) {
  const { toast } = useToast();
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (content && title) {
      const metaTags = generateMetaTags(title, content);
      setMetaTitle(metaTags.title);
      setMetaDescription(metaTags.description);
      
      // Add the target keyword to the beginning of keywords if provided
      if (targetKeyword && !metaTags.keywords.includes(targetKeyword)) {
        setMetaKeywords(targetKeyword + ', ' + metaTags.keywords);
      } else {
        setMetaKeywords(metaTags.keywords);
      }
    }
  }, [content, title, targetKeyword]);

  const regenerateMetaTags = () => {
    if (content && title) {
      const metaTags = generateMetaTags(title, content);
      setMetaTitle(metaTags.title);
      setMetaDescription(metaTags.description);
      
      if (targetKeyword && !metaTags.keywords.includes(targetKeyword)) {
        setMetaKeywords(targetKeyword + ', ' + metaTags.keywords);
      } else {
        setMetaKeywords(metaTags.keywords);
      }
      
      toast({
        title: "Meta tags regenerated",
        description: "Your meta tags have been regenerated based on your content."
      });
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
    
    toast({
      title: "Copied to clipboard",
      description: `${type} has been copied to your clipboard.`
    });
  };

  const generateMetaHtml = () => {
    return `<!-- SEO Meta Tags -->
<title>${metaTitle}</title>
<meta name="description" content="${metaDescription}" />
<meta name="keywords" content="${metaKeywords}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${metaTitle}" />
<meta property="og:description" content="${metaDescription}" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${metaTitle}" />
<meta name="twitter:description" content="${metaDescription}" />`;
  };

  return (
    <Card className="shadow-sm border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center">
            <Code className="h-5 w-5 mr-2 text-teal-500" />
            Meta Tag Generator
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={regenerateMetaTags}
            className="h-8"
          >
            <RotateCw className="h-3.5 w-3.5 mr-2" />
            Regenerate
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <Label htmlFor="meta-title">Title Tag</Label>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={() => copyToClipboard(metaTitle, 'title')}
            >
              {copied === 'title' ? (
                <Check className="h-3 w-3 mr-1" />
              ) : (
                <Copy className="h-3 w-3 mr-1" />
              )}
              Copy
            </Button>
          </div>
          <Input
            id="meta-title"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className="font-medium"
          />
          <div className="mt-1 text-xs text-muted-foreground flex justify-between">
            <span>Optimal length: 50-60 characters</span>
            <span className={metaTitle.length > 60 ? "text-destructive" : ""}>
              {metaTitle.length}/60
            </span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <Label htmlFor="meta-description">Meta Description</Label>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={() => copyToClipboard(metaDescription, 'description')}
            >
              {copied === 'description' ? (
                <Check className="h-3 w-3 mr-1" />
              ) : (
                <Copy className="h-3 w-3 mr-1" />
              )}
              Copy
            </Button>
          </div>
          <Textarea
            id="meta-description"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="resize-none h-20"
          />
          <div className="mt-1 text-xs text-muted-foreground flex justify-between">
            <span>Optimal length: 150-155 characters</span>
            <span className={metaDescription.length > 155 ? "text-destructive" : ""}>
              {metaDescription.length}/155
            </span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <Label htmlFor="meta-keywords">Meta Keywords</Label>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs"
              onClick={() => copyToClipboard(metaKeywords, 'keywords')}
            >
              {copied === 'keywords' ? (
                <Check className="h-3 w-3 mr-1" />
              ) : (
                <Copy className="h-3 w-3 mr-1" />
              )}
              Copy
            </Button>
          </div>
          <Input
            id="meta-keywords"
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
          />
          <div className="mt-1 text-xs text-muted-foreground">
            <span>Separate keywords with commas</span>
          </div>
        </div>
        
        <div className="pt-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Code className="h-4 w-4 mr-2" />
                View HTML Code
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Meta Tags HTML Code</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <div className="relative">
                  <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                    {generateMetaHtml()}
                  </pre>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(generateMetaHtml(), 'html')}
                  >
                    {copied === 'html' ? (
                      <Check className="h-4 w-4 mr-1" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1" />
                    )}
                    Copy
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

export default MetaTagGenerator;
