
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIPromptFieldProps {
  campaignId: number;
}

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AIPromptField = ({ campaignId }: AIPromptFieldProps) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    const userMessage: AIMessage = {
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setPrompt('');
    
    // Simulate AI response - in a real app, this would be an API call
    setTimeout(() => {
      const aiResponse: AIMessage = {
        role: 'assistant',
        content: generateAIResponse(prompt, campaignId),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      
      toast({
        title: "Analysis complete",
        description: "AI has generated insights based on your prompt",
      });
    }, 2000);
  };
  
  // Mock AI response generation - would be replaced with actual API call
  const generateAIResponse = (userPrompt: string, campaignId: number): string => {
    const responses = [
      `Based on your campaign #${campaignId} data, I can see that your open rate is 32% which is above industry average. Your reply rate is 12%, which could be improved by personalizing subject lines.`,
      `Looking at your campaign metrics, your best performing email is Email #2 with a 48% open rate. Consider using similar subject lines in future campaigns.`,
      `Analysis shows that leads from the Technology sector are responding better than those from Finance. You might want to adapt your messaging for different industries.`,
      `Your campaign has a good engagement score overall. To improve conversion, try following up with leads who opened but didn't reply within 3 days.`,
      `Based on your lead data, the best time to send emails appears to be Tuesday mornings. Consider scheduling future messages during this timeframe.`
    ];
    
    // Return a "relevant" response based on the prompt
    if (userPrompt.toLowerCase().includes('open rate')) {
      return responses[0];
    } else if (userPrompt.toLowerCase().includes('best') || userPrompt.toLowerCase().includes('top')) {
      return responses[1];
    } else if (userPrompt.toLowerCase().includes('industry') || userPrompt.toLowerCase().includes('sector')) {
      return responses[2];
    } else if (userPrompt.toLowerCase().includes('improve') || userPrompt.toLowerCase().includes('better')) {
      return responses[3];
    } else {
      return responses[4];
    }
  };
  
  const renderMessage = (message: AIMessage, index: number) => {
    const isUser = message.role === 'user';
    return (
      <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-[80%] p-3 rounded-lg ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
          <p className="text-sm">{message.content}</p>
          <p className="text-xs mt-1 opacity-70">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          AI Campaign Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 rounded-lg p-4 mb-4 h-[300px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
              <Sparkles className="h-8 w-8 mb-2 text-amber-400" />
              <p>Ask the AI assistant to analyze your campaign data</p>
              <p className="text-xs mt-1">Example: "How can I improve my open rate?" or "Which leads should I focus on?"</p>
            </div>
          ) : (
            messages.map(renderMessage)
          )}
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  <p className="text-sm">Analyzing campaign data...</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea 
            placeholder="Ask about campaign performance, lead insights, or suggestions for improvement..." 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[60px] resize-none flex-grow"
          />
          <Button 
            type="submit" 
            disabled={!prompt.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
