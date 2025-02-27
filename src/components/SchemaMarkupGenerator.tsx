
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Code, Copy, Check, RotateCw, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateSchemaMarkup } from '@/utils/seoUtils';

interface SchemaMarkupGeneratorProps {
  content: string;
  title: string;
  targetKeyword: string;
}

type SchemaType = 'article' | 'product' | 'faq' | 'review' | 'event';

export function SchemaMarkupGenerator({ content, title, targetKeyword }: SchemaMarkupGeneratorProps) {
  const { toast } = useToast();
  const [schemaType, setSchemaType] = useState<SchemaType>('article');
  const [schemaFields, setSchemaFields] = useState<Record<string, string>>({});
  const [generatedSchema, setGeneratedSchema] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Default schema fields based on type
  useEffect(() => {
    if (content && title) {
      let defaults: Record<string, string> = {};
      
      switch (schemaType) {
        case 'article':
          defaults = {
            headline: title,
            author: '',
            publishDate: new Date().toISOString().split('T')[0],
            publisher: '',
            description: content.substring(0, 150) + '...',
          };
          break;
        case 'product':
          defaults = {
            name: title,
            description: content.substring(0, 150) + '...',
            price: '',
            currency: 'USD',
            availability: 'InStock',
            brand: '',
          };
          break;
        case 'faq':
          // Extract potential questions from content (lines ending with ?)
          const questions = content.split('\n')
            .filter(line => line.trim().endsWith('?'))
            .map(line => line.trim());
          
          const faqDefaults: Record<string, string> = {
            title: title,
          };
          
          questions.forEach((q, i) => {
            if (i < 3) { // Limit to 3 questions for simplicity
              faqDefaults[`question${i+1}`] = q;
              
              // Try to find the answer in the next paragraph
              const questionIndex = content.indexOf(q);
              if (questionIndex !== -1) {
                const afterQuestion = content.substring(questionIndex + q.length);
                const potentialAnswer = afterQuestion.split('\n\n')[0].trim();
                faqDefaults[`answer${i+1}`] = potentialAnswer.substring(0, 200);
              } else {
                faqDefaults[`answer${i+1}`] = '';
              }
            }
          });
          
          defaults = faqDefaults;
          break;
        case 'review':
          defaults = {
            itemReviewed: title,
            reviewRating: '4.5',
            bestRating: '5',
            author: '',
            reviewBody: content.substring(0, 150) + '...',
          };
          break;
        case 'event':
          defaults = {
            name: title,
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            location: '',
            description: content.substring(0, 150) + '...',
            organizer: '',
          };
          break;
      }
      
      setSchemaFields(defaults);
    }
  }, [schemaType, content, title]);
  
  const handleFieldChange = (field: string, value: string) => {
    setSchemaFields({
      ...schemaFields,
      [field]: value
    });
  };
  
  const generateSchema = () => {
    const schema = generateSchemaMarkup(schemaType, schemaFields);
    setGeneratedSchema(schema);
    
    toast({
      title: "Schema generated",
      description: `${schemaType.charAt(0).toUpperCase() + schemaType.slice(1)} schema has been generated.`
    });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSchema);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "Schema markup has been copied to your clipboard."
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const getFieldsForSchemaType = () => {
    switch (schemaType) {
      case 'article':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                value={schemaFields.headline || ''}
                onChange={(e) => handleFieldChange('headline', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={schemaFields.author || ''}
                onChange={(e) => handleFieldChange('author', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publishDate">Publish Date</Label>
              <Input
                id="publishDate"
                type="date"
                value={schemaFields.publishDate || ''}
                onChange={(e) => handleFieldChange('publishDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                value={schemaFields.publisher || ''}
                onChange={(e) => handleFieldChange('publisher', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={schemaFields.description || ''}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                className="resize-none h-20"
              />
            </div>
          </>
        );
      
      case 'product':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={schemaFields.name || ''}
                onChange={(e) => handleFieldChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={schemaFields.description || ''}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                className="resize-none h-20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={schemaFields.price || ''}
                onChange={(e) => handleFieldChange('price', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={schemaFields.currency || 'USD'}
                onChange={(e) => handleFieldChange('currency', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Select 
                value={schemaFields.availability || 'InStock'} 
                onValueChange={(value) => handleFieldChange('availability', value)}
              >
                <SelectTrigger id="availability">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="InStock">In Stock</SelectItem>
                  <SelectItem value="OutOfStock">Out of Stock</SelectItem>
                  <SelectItem value="PreOrder">Pre-Order</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={schemaFields.brand || ''}
                onChange={(e) => handleFieldChange('brand', e.target.value)}
              />
            </div>
          </>
        );
        
      case 'faq':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">FAQ Title</Label>
              <Input
                id="title"
                value={schemaFields.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
              />
            </div>
            
            {[1, 2, 3].map(i => (
              <div key={`faq-${i}`} className="space-y-2 border-t pt-3 mt-3">
                <Label htmlFor={`question${i}`}>Question {i}</Label>
                <Input
                  id={`question${i}`}
                  value={schemaFields[`question${i}`] || ''}
                  onChange={(e) => handleFieldChange(`question${i}`, e.target.value)}
                />
                <Label htmlFor={`answer${i}`}>Answer {i}</Label>
                <Textarea
                  id={`answer${i}`}
                  value={schemaFields[`answer${i}`] || ''}
                  onChange={(e) => handleFieldChange(`answer${i}`, e.target.value)}
                  className="resize-none h-16"
                />
              </div>
            ))}
          </>
        );
        
      case 'review':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="itemReviewed">Item Reviewed</Label>
              <Input
                id="itemReviewed"
                value={schemaFields.itemReviewed || ''}
                onChange={(e) => handleFieldChange('itemReviewed', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewRating">Rating</Label>
              <Input
                id="reviewRating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={schemaFields.reviewRating || ''}
                onChange={(e) => handleFieldChange('reviewRating', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bestRating">Best Rating</Label>
              <Input
                id="bestRating"
                value={schemaFields.bestRating || '5'}
                onChange={(e) => handleFieldChange('bestRating', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={schemaFields.author || ''}
                onChange={(e) => handleFieldChange('author', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewBody">Review Text</Label>
              <Textarea
                id="reviewBody"
                value={schemaFields.reviewBody || ''}
                onChange={(e) => handleFieldChange('reviewBody', e.target.value)}
                className="resize-none h-20"
              />
            </div>
          </>
        );
        
      case 'event':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Event Name</Label>
              <Input
                id="name"
                value={schemaFields.name || ''}
                onChange={(e) => handleFieldChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={schemaFields.startDate || ''}
                onChange={(e) => handleFieldChange('startDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={schemaFields.endDate || ''}
                onChange={(e) => handleFieldChange('endDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={schemaFields.location || ''}
                onChange={(e) => handleFieldChange('location', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer</Label>
              <Input
                id="organizer"
                value={schemaFields.organizer || ''}
                onChange={(e) => handleFieldChange('organizer', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={schemaFields.description || ''}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                className="resize-none h-20"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Code className="h-5 w-5 mr-2 text-teal-500" />
          Schema Markup Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="editor">Schema Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview Schema</TabsTrigger>
          </TabsList>
          
          <TabsContent value="editor" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schema-type">Schema Type</Label>
              <Select 
                value={schemaType} 
                onValueChange={(value) => setSchemaType(value as SchemaType)}
              >
                <SelectTrigger id="schema-type">
                  <SelectValue placeholder="Select schema type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="faq">FAQ</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4 py-2">
              {getFieldsForSchemaType()}
            </div>
            
            <div className="pt-2">
              <Button onClick={generateSchema} className="w-full">
                <Code className="h-4 w-4 mr-2" />
                Generate Schema Markup
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            {generatedSchema ? (
              <div className="space-y-4">
                <div className="relative">
                  <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
                    {generatedSchema}
                  </pre>
                  <Button
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 mr-1" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1" />
                    )}
                    Copy
                  </Button>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>How to Use:</strong> Add this schema markup to your webpage's HTML between the <code>&lt;head&gt;</code> 
                    tags as a <code>&lt;script type="application/ld+json"&gt;</code> element.
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setGeneratedSchema('')}>
                    Clear
                  </Button>
                  <Button onClick={generateSchema}>
                    <RotateCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Code className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground mb-4">
                  Use the schema editor to generate structured data.
                </p>
                <Button variant="outline" onClick={() => generateSchema()}>
                  Generate Sample Schema
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default SchemaMarkupGenerator;
