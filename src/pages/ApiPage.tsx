
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowLeft, Code, CopyIcon, Check, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ApiPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);
  
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    
    toast({
      title: "Copied to clipboard",
      description: "API example copied to clipboard."
    });
    
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-90">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-center text-gray-900">SEO.ai API</h1>
          <div className="w-24"></div> {/* Empty div for flex spacing */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Developer API</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Integrate our powerful SEO tools directly into your applications with our easy-to-use API.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Follow these steps to integrate SEO.ai API into your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">1</div>
                  <h3 className="font-medium">Subscribe to an API plan</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  Access to the API is available with our Enterprise subscription plan or as a separate API-only plan.
                </p>
                <div className="ml-10 mt-2">
                  <Button variant="outline" asChild>
                    <Link to="/subscription">View Plans</Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">2</div>
                  <h3 className="font-medium">Generate your API key</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  Once subscribed, generate your API key from your account dashboard.
                </p>
                <div className="p-4 bg-gray-100 rounded-md ml-10 mt-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-mono text-sm">••••••••••••••••••••••••••</span>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Generate Key
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground ml-10">
                  Available with Enterprise subscription
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">3</div>
                  <h3 className="font-medium">Make API requests</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  Use our comprehensive documentation to start making API requests.
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="analyze" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analyze">Content Analysis</TabsTrigger>
              <TabsTrigger value="keywords">Keyword Research</TabsTrigger>
              <TabsTrigger value="meta">Meta Tags</TabsTrigger>
              <TabsTrigger value="schema">Schema Markup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analyze" className="p-4 border rounded-md mt-2">
              <h3 className="text-lg font-semibold mb-2">Content Analysis API</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Analyze content for SEO optimization
              </p>
              
              <div className="bg-slate-950 text-gray-300 p-4 rounded-md font-mono text-sm mb-3 relative">
                <pre className="whitespace-pre-wrap">
{`POST https://api.seo.ai/v1/analyze

{
  "content": "Your content to analyze",
  "title": "Your content title",
  "targetKeyword": "main keyword" // optional
}`}
                </pre>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`POST https://api.seo.ai/v1/analyze

{
  "content": "Your content to analyze",
  "title": "Your content title",
  "targetKeyword": "main keyword" // optional
}`, "analyze")}
                >
                  {copied === "analyze" ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>
              
              <h4 className="font-medium mb-2">Response:</h4>
              <div className="bg-slate-950 text-gray-300 p-4 rounded-md font-mono text-sm mb-3 relative">
                <pre className="whitespace-pre-wrap">
{`{
  "score": 85,
  "breakdown": {
    "content": 18,
    "keyword": 26,
    "readability": 17,
    "structure": 12,
    "meta": 12
  },
  "readability": {
    "score": 78,
    "wordCount": 524,
    "sentenceCount": 32,
    "avgWordsPerSentence": 16.4,
    "paragraphCount": 8,
    "readingTime": 2.6
  },
  "suggestions": [
    {
      "type": "keyword-usage",
      "message": "Increase keyword density slightly",
      "priority": "medium"
    }
    // Additional suggestions...
  ]
}`}
                </pre>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`{
  "score": 85,
  "breakdown": {
    "content": 18,
    "keyword": 26,
    "readability": 17,
    "structure": 12,
    "meta": 12
  },
  "readability": {
    "score": 78,
    "wordCount": 524,
    "sentenceCount": 32,
    "avgWordsPerSentence": 16.4,
    "paragraphCount": 8,
    "readingTime": 2.6
  },
  "suggestions": [
    {
      "type": "keyword-usage",
      "message": "Increase keyword density slightly",
      "priority": "medium"
    }
    // Additional suggestions...
  ]
}`, "analyze-response")}
                >
                  {copied === "analyze-response" ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="keywords" className="p-4 border rounded-md mt-2">
              <h3 className="text-lg font-semibold mb-2">Keyword Research API</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate keyword suggestions and get search volumes
              </p>
              
              <div className="bg-slate-950 text-gray-300 p-4 rounded-md font-mono text-sm mb-3 relative">
                <pre className="whitespace-pre-wrap">
{`GET https://api.seo.ai/v1/keywords?seed=digital%20marketing&limit=10`}
                </pre>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`GET https://api.seo.ai/v1/keywords?seed=digital%20marketing&limit=10`, "keywords")}
                >
                  {copied === "keywords" ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>
              
              <h4 className="font-medium mb-2">Response:</h4>
              <div className="bg-slate-950 text-gray-300 p-4 rounded-md font-mono text-sm relative">
                <pre className="whitespace-pre-wrap">
{`{
  "seedKeyword": "digital marketing",
  "suggestions": [
    {
      "keyword": "digital marketing agency",
      "searchVolume": 74000,
      "competition": 0.87,
      "cpc": 12.43
    },
    {
      "keyword": "digital marketing strategy",
      "searchVolume": 32000,
      "competition": 0.65,
      "cpc": 9.12
    }
    // Additional keywords...
  ]
}`}
                </pre>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`{
  "seedKeyword": "digital marketing",
  "suggestions": [
    {
      "keyword": "digital marketing agency",
      "searchVolume": 74000,
      "competition": 0.87,
      "cpc": 12.43
    },
    {
      "keyword": "digital marketing strategy",
      "searchVolume": 32000,
      "competition": 0.65,
      "cpc": 9.12
    }
    // Additional keywords...
  ]
}`, "keywords-response")}
                >
                  {copied === "keywords-response" ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="meta" className="p-4 border rounded-md mt-2">
              <h3 className="text-lg font-semibold mb-2">Meta Tags Generator API</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate optimized meta tags for your content
              </p>
              
              <div className="bg-slate-950 text-gray-300 p-4 rounded-md font-mono text-sm relative mb-3">
                <pre className="whitespace-pre-wrap">
{`POST https://api.seo.ai/v1/meta-tags

{
  "content": "Your content to generate meta tags for",
  "title": "Your content title",
  "targetKeyword": "main keyword"
}`}
                </pre>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`POST https://api.seo.ai/v1/meta-tags

{
  "content": "Your content to generate meta tags for",
  "title": "Your content title",
  "targetKeyword": "main keyword"
}`, "meta")}
                >
                  {copied === "meta" ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>
              
              <h4 className="font-medium mb-2">Response:</h4>
              <div className="bg-slate-950 text-gray-300 p-4 rounded-md font-mono text-sm relative">
                <pre className="whitespace-pre-wrap">
{`{
  "title": "Optimized Title with Main Keyword | Brand",
  "description": "An optimized meta description that includes your main keyword and provides a concise summary of the content to improve click-through rates from search results.",
  "keywords": ["main keyword", "related keyword 1", "related keyword 2"],
  "openGraph": {
    "title": "Optimized Open Graph Title",
    "description": "Optimized description for social sharing",
    "imageAlt": "Image description with keyword"
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Optimized Twitter Title",
    "description": "Optimized description for Twitter"
  }
}`}
                </pre>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`{
  "title": "Optimized Title with Main Keyword | Brand",
  "description": "An optimized meta description that includes your main keyword and provides a concise summary of the content to improve click-through rates from search results.",
  "keywords": ["main keyword", "related keyword 1", "related keyword 2"],
  "openGraph": {
    "title": "Optimized Open Graph Title",
    "description": "Optimized description for social sharing",
    "imageAlt": "Image description with keyword"
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Optimized Twitter Title",
    "description": "Optimized description for Twitter"
  }
}`, "meta-response")}
                >
                  {copied === "meta-response" ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="schema" className="p-4 border rounded-md mt-2">
              <h3 className="text-lg font-semibold mb-2">Schema Markup API</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate schema markup for various content types
              </p>
              
              <div className="bg-slate-950 text-gray-300 p-4 rounded-md font-mono text-sm mb-3 relative">
                <pre className="whitespace-pre-wrap">
{`POST https://api.seo.ai/v1/schema

{
  "type": "article",
  "content": "Your article content",
  "title": "Article title",
  "author": "Author name",
  "datePublished": "2023-05-20",
  "image": "https://example.com/image.jpg"
}`}
                </pre>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`POST https://api.seo.ai/v1/schema

{
  "type": "article",
  "content": "Your article content",
  "title": "Article title",
  "author": "Author name",
  "datePublished": "2023-05-20",
  "image": "https://example.com/image.jpg"
}`, "schema")}
                >
                  {copied === "schema" ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>
              
              <h4 className="font-medium mb-2">Response:</h4>
              <div className="bg-slate-950 text-gray-300 p-4 rounded-md font-mono text-sm relative">
                <pre className="whitespace-pre-wrap">
{`{
  "schema": {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Article title",
    "author": {
      "@type": "Person",
      "name": "Author name"
    },
    "datePublished": "2023-05-20",
    "image": "https://example.com/image.jpg",
    "articleBody": "Your article content",
    "publisher": {
      "@type": "Organization",
      "name": "Publisher Name",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png"
      }
    }
  },
  "htmlSnippet": "<script type=\\"application/ld+json\\">\\n{\\n  \\"@context\\": \\"https://schema.org\\",\\n  \\"@type\\": \\"Article\\",\\n  \\"headline\\": \\"Article title\\",\\n  \\"author\\": {\\n    \\"@type\\": \\"Person\\",\\n    \\"name\\": \\"Author name\\"\\n  },\\n  \\"datePublished\\": \\"2023-05-20\\",\\n  \\"image\\": \\"https://example.com/image.jpg\\",\\n  \\"articleBody\\": \\"Your article content\\",\\n  \\"publisher\\": {\\n    \\"@type\\": \\"Organization\\",\\n    \\"name\\": \\"Publisher Name\\",\\n    \\"logo\\": {\\n      \\"@type\\": \\"ImageObject\\",\\n      \\"url\\": \\"https://example.com/logo.png\\"\\n    }\\n  }\\n}\\n</script>"
}`}
                </pre>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={() => copyToClipboard(`{
  "schema": {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Article title",
    "author": {
      "@type": "Person",
      "name": "Author name"
    },
    "datePublished": "2023-05-20",
    "image": "https://example.com/image.jpg",
    "articleBody": "Your article content",
    "publisher": {
      "@type": "Organization",
      "name": "Publisher Name",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png"
      }
    }
  },
  "htmlSnippet": "<script type=\\"application/ld+json\\">\\n{\\n  \\"@context\\": \\"https://schema.org\\",\\n  \\"@type\\": \\"Article\\",\\n  \\"headline\\": \\"Article title\\",\\n  \\"author\\": {\\n    \\"@type\\": \\"Person\\",\\n    \\"name\\": \\"Author name\\"\\n  },\\n  \\"datePublished\\": \\"2023-05-20\\",\\n  \\"image\\": \\"https://example.com/image.jpg\\",\\n  \\"articleBody\\": \\"Your article content\\",\\n  \\"publisher\\": {\\n    \\"@type\\": \\"Organization\\",\\n    \\"name\\": \\"Publisher Name\\",\\n    \\"logo\\": {\\n      \\"@type\\": \\"ImageObject\\",\\n      \\"url\\": \\"https://example.com/logo.png\\"\\n    }\\n  }\\n}\\n</script>"
}`, "schema-response")}
                >
                  {copied === "schema-response" ? <Check className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
              <CardDescription>Our API follows a usage-based pricing model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">API Requests</h3>
                    <p className="text-2xl font-bold mb-1">$0.01<span className="text-sm font-normal text-muted-foreground">/request</span></p>
                    <p className="text-sm text-muted-foreground">Basic content analysis and meta tag generation</p>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">AI-Powered Analysis</h3>
                    <p className="text-2xl font-bold mb-1">$0.05<span className="text-sm font-normal text-muted-foreground">/request</span></p>
                    <p className="text-sm text-muted-foreground">Advanced analysis, keyword research, and optimization</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Enterprise Volume Discounts</h3>
                  <ul className="text-sm space-y-1">
                    <li>10,000+ requests/month: 15% discount</li>
                    <li>50,000+ requests/month: 25% discount</li>
                    <li>100,000+ requests/month: Custom pricing</li>
                  </ul>
                </div>
                
                <div className="text-center pt-4">
                  <Button asChild>
                    <Link to="/subscription">Get API Access</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Developer Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Code className="h-4 w-4 mr-2" />
                    API Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete reference for all API endpoints
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Docs
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">SDK Libraries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Official SDKs for popular languages
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Download SDKs
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Example Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sample code and integrations
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Examples
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
