
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUp, Globe, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentUploaderProps {
  onContentSubmit: (content: string, title: string) => void;
}

export function ContentUploader({ onContentSubmit }: ContentUploaderProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    // Only accept text files
    if (!selectedFile.type.match('text/plain') && 
        !selectedFile.type.match('text/html') && 
        !selectedFile.name.endsWith('.md')) {
      setError('Please upload a text file (TXT, HTML, or MD)');
      setFile(null);
      return;
    }
    
    setError('');
    
    // Read file contents
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setContent(event.target.result as string);
        // Try to extract a title from the first line
        const lines = (event.target.result as string).split('\n');
        if (lines[0] && !title) {
          setTitle(lines[0].replace(/^#\s+/, '').substring(0, 60));
        }
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleUrlSubmit = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // In a real app, this would be handled by a backend service
      // to fetch the page content and parse it
      toast({
        title: "URL Scraping Simulation",
        description: "In a real app, this would scrape the URL content.",
      });
      
      // Simulate URL content extraction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock extracted content
      const mockTitle = "Sample Content from " + new URL(url).hostname;
      const mockContent = `# ${mockTitle}\n\nThis is simulated content extracted from ${url}. In a real application, we would fetch the actual page content using server-side scraping.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis libero in diam feugiat, a finibus lectus molestie. Duis fringilla metus a nulla dictum, id pulvinar enim faucibus.\n\n## Sample Section\n\nPellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent ut felis varius, dictum nisl non, tempus nisi.`;
      
      setTitle(mockTitle);
      setContent(mockContent);
      
      toast({
        title: "Content extracted",
        description: "URL content has been successfully extracted.",
      });
    } catch (err) {
      setError('Failed to extract content from URL');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to extract content from URL",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!content) {
      setError('Please add some content');
      return;
    }
    
    if (!title) {
      setError('Please add a title');
      return;
    }
    
    onContentSubmit(content, title);
  };

  return (
    <Card className="w-full shadow-sm border">
      <CardContent className="pt-6">
        <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="text">Text Content</TabsTrigger>
            <TabsTrigger value="file">Upload File</TabsTrigger>
            <TabsTrigger value="url">From URL</TabsTrigger>
          </TabsList>
          
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="title">Content Title</Label>
              <Input
                id="title"
                placeholder="Enter a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="text" className="space-y-4">
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter your content here (HTML, Markdown, or plain text)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="file" className="space-y-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".txt,.html,.md,.text"
              />
              
              {file ? (
                <div className="space-y-2">
                  <div className="font-medium">
                    {file.name} ({Math.round(file.size / 1024)} KB)
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFile(null);
                      setContent('');
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                  >
                    Remove File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center">
                    <FileUp className="h-12 w-12 text-gray-400 mb-4" />
                    <div className="text-lg font-medium">Upload a file</div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop or click to browse
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Select File
                  </Button>
                </div>
              )}
            </div>
            
            {file && (
              <div>
                <Label htmlFor="fileContent">File Content</Label>
                <Textarea
                  id="fileContent"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com/page"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="pt-6">
                <Button 
                  onClick={handleUrlSubmit} 
                  disabled={isLoading}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {isLoading ? 'Extracting...' : 'Extract'}
                </Button>
              </div>
            </div>
            
            {content && activeTab === 'url' && (
              <div>
                <Label htmlFor="urlContent">Extracted Content</Label>
                <Textarea
                  id="urlContent"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>
            )}
          </TabsContent>
          
          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm mt-2">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="mt-6">
            <Button 
              className="w-full" 
              onClick={handleSubmit}
              disabled={isLoading || !content || !title}
            >
              Analyze Content
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default ContentUploader;
