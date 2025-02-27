
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { FileUp, Plus } from 'lucide-react';

interface ContentUploaderProps {
  onContentSubmit: (content: string, title: string) => void;
  onAddPage?: (page: {title: string, url: string, content: string}) => void;
}

export function ContentUploader({ onContentSubmit, onAddPage }: ContentUploaderProps) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [additionalPageTitle, setAdditionalPageTitle] = useState('');
  const [additionalPageUrl, setAdditionalPageUrl] = useState('');
  const [additionalPageContent, setAdditionalPageContent] = useState('');

  const handleSubmit = () => {
    if (content && title) {
      onContentSubmit(content, title);
    }
  };

  const handleAddPage = () => {
    if (onAddPage && additionalPageTitle && additionalPageUrl && additionalPageContent) {
      onAddPage({
        title: additionalPageTitle,
        url: additionalPageUrl,
        content: additionalPageContent
      });
      
      // Reset form
      setAdditionalPageTitle('');
      setAdditionalPageUrl('');
      setAdditionalPageContent('');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Content Title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your content title"
          className="w-full"
        />
      </div>
      
      <div>
        <Label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your content to optimize"
          className="min-h-40"
        />
      </div>
      
      <div className="space-y-2">
        <Button 
          onClick={handleSubmit}
          className="w-full"
        >
          <FileUp className="h-4 w-4 mr-2" />
          Analyze Content
        </Button>
        
        {onAddPage && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Additional Page
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Additional Page</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="page-title">Page Title</Label>
                  <Input 
                    id="page-title" 
                    value={additionalPageTitle}
                    onChange={(e) => setAdditionalPageTitle(e.target.value)}
                    placeholder="About Us"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="page-url">Page URL</Label>
                  <Input 
                    id="page-url" 
                    value={additionalPageUrl}
                    onChange={(e) => setAdditionalPageUrl(e.target.value)}
                    placeholder="/about-us"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="page-content">Page Content</Label>
                  <Textarea 
                    id="page-content" 
                    value={additionalPageContent}
                    onChange={(e) => setAdditionalPageContent(e.target.value)}
                    placeholder="Enter the page content here..."
                    className="min-h-20"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit" onClick={handleAddPage}>Add Page</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
