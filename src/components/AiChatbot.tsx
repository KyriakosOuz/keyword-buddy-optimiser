
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Send, 
  X, 
  Maximize2, 
  Minimize2,
  Bot,
  User,
  RotateCw,
  Sparkles,
  Info
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function AiChatbot() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your SEO assistant. Ask me anything about SEO optimization!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsExpanded(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      sendMessage();
    }
  };

  const generateResponse = (question: string): string => {
    // In a real application, this would call an API
    const responses = [
      "To improve your keyword density, try including your target keyword in your headings, introduction, and conclusion.",
      "The ideal meta description length is between 150-160 characters to ensure it displays properly in search results.",
      "Internal linking helps search engines understand your site structure and distributes page authority throughout your website.",
      "Yes, schema markup can significantly improve your rich snippet opportunities in search results.",
      "For local SEO, make sure to include location-specific keywords and create a Google My Business profile.",
      "The most important on-page SEO factors include quality content, proper header usage, keyword optimization, and fast loading speed.",
      "Backlinks remain one of the most important ranking factors. Focus on quality rather than quantity.",
      "To optimize images for SEO, use descriptive filenames, add alt text with keywords, and compress them for faster loading.",
      "Mobile optimization is critical as Google primarily uses mobile-first indexing.",
      "The optimal word count depends on the topic, but comprehensive content (1500+ words) tends to rank better for competitive keywords."
    ];
    
    // Simple keyword matching for demo purposes
    if (question.toLowerCase().includes('keyword')) {
      return responses[0];
    } else if (question.toLowerCase().includes('meta')) {
      return responses[1];
    } else if (question.toLowerCase().includes('link')) {
      return responses[2];
    } else if (question.toLowerCase().includes('schema')) {
      return responses[3];
    } else if (question.toLowerCase().includes('local')) {
      return responses[4];
    } else if (question.toLowerCase().includes('on-page') || question.toLowerCase().includes('onpage')) {
      return responses[5];
    } else if (question.toLowerCase().includes('backlink')) {
      return responses[6];
    } else if (question.toLowerCase().includes('image')) {
      return responses[7];
    } else if (question.toLowerCase().includes('mobile')) {
      return responses[8];
    } else if (question.toLowerCase().includes('word count') || question.toLowerCase().includes('length')) {
      return responses[9];
    }
    
    return "I'm here to help with your SEO questions. Could you provide more details about what you'd like to know?";
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate API delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(userMessage.content),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: "Hi there! I'm your SEO assistant. Ask me anything about SEO optimization!",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    
    toast({
      title: "Chat cleared",
      description: "Your conversation history has been reset."
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 animate-fade-in"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 overflow-hidden shadow-xl transition-all duration-300 z-50 flex flex-col ${
      isExpanded ? 'w-[440px] h-[580px]' : 'w-[350px] h-[480px]'
    } animate-fade-in`}>
      <div className="bg-primary text-white p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <div className="font-medium">SEO AI Assistant</div>
          <Badge variant="outline" className="text-xs bg-white/20 text-white border-white/40">Beta</Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-white hover:bg-primary-foreground/20" 
            onClick={toggleExpand}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-white hover:bg-primary-foreground/20" 
            onClick={toggleChatbot}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[80%] 
                p-3 
                rounded-lg 
                ${message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-br-none' 
                  : 'bg-muted rounded-bl-none'
                }
              `}>
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === 'bot' ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-xs opacity-70">
                    {message.sender === 'bot' ? 'SEO Assistant' : 'You'}
                  </span>
                </div>
                <div className="text-sm">{message.content}</div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-lg rounded-bl-none max-w-[80%]">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="h-4 w-4" />
                  <span className="text-xs opacity-70">SEO Assistant</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-3 border-t">
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={clearChat}
            >
              <RotateCw className="h-3 w-3 mr-1" />
              Clear Chat
            </Button>
            
            <div className="ml-auto flex items-center text-xs text-muted-foreground">
              <Info className="h-3 w-3 mr-1" />
              <span>Pro feature</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about SEO..."
              className="flex-1"
            />
            <Button 
              size="icon" 
              onClick={sendMessage}
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AiChatbot;
