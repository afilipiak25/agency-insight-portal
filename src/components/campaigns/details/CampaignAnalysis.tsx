
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Zap, Sparkles, 
  LineChart, Target, BarChart, 
  BookOpen, Brain, Send
} from 'lucide-react';

interface CampaignAnalysisProps {
  campaignId: number;
}

const mockInsights = [
  {
    id: 1,
    title: "Performance Optimization",
    content: "Your open rate of 55% is above industry average. Consider A/B testing subject lines to further improve engagement.",
    type: "optimization",
    priority: "high"
  },
  {
    id: 2,
    title: "Lead Engagement Patterns",
    content: "Leads from tech industry show 40% higher engagement. Consider segmenting your audience to customize messaging.",
    type: "insight",
    priority: "medium"
  },
  {
    id: 3,
    title: "Potential Issues",
    content: "Reply rate drops significantly after the 2nd email. Review content and timing of follow-up messages.",
    type: "warning",
    priority: "high"
  }
];

export const CampaignAnalysis = ({ campaignId }: CampaignAnalysisProps) => {
  const [activeTab, setActiveTab] = useState('insights');
  const [prompt, setPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  
  const handlePromptSubmit = () => {
    if (!prompt.trim()) return;
    
    // Simulate AI thinking
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
    }, 2000);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - AI Chat */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  <CardTitle className="text-lg">Campaign Intelligence Assistant</CardTitle>
                </div>
                <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                  AI Powered
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 h-[calc(100%-4rem)] flex flex-col">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="mx-auto mb-4 bg-gray-100">
                  <TabsTrigger value="insights" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                    <Sparkles className="w-4 h-4 mr-1" />
                    AI Insights
                  </TabsTrigger>
                  <TabsTrigger value="ask" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Ask AI
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="insights" className="flex-1 space-y-4 mt-0">
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                  >
                    {mockInsights.map((insight) => (
                      <motion.div key={insight.id} variants={item}>
                        <Card className={`
                          border-l-4 
                          ${insight.type === 'optimization' ? 'border-l-blue-500 bg-blue-50/50' : 
                            insight.type === 'warning' ? 'border-l-amber-500 bg-amber-50/50' : 
                            'border-l-purple-500 bg-purple-50/50'}
                        `}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-gray-800 mb-1 flex items-center gap-2">
                                {insight.type === 'optimization' && <Target className="h-4 w-4 text-blue-500" />}
                                {insight.type === 'warning' && <BarChart className="h-4 w-4 text-amber-500" />}
                                {insight.type === 'insight' && <LineChart className="h-4 w-4 text-purple-500" />}
                                {insight.title}
                              </h4>
                              <Badge 
                                variant="outline" 
                                className={`
                                  ${insight.priority === 'high' ? 'border-red-300 text-red-700 bg-red-50' : 
                                    'border-gray-300 text-gray-700 bg-gray-50'}
                                `}>
                                {insight.priority} priority
                              </Badge>
                            </div>
                            <p className="text-gray-600 mt-2">{insight.content}</p>
                            <div className="mt-3 flex gap-2">
                              <Button size="sm" variant="outline" className="text-xs h-7">
                                <BookOpen className="h-3 w-3 mr-1" />
                                Learn More
                              </Button>
                              <Button size="sm" className="text-xs bg-gradient-to-r from-indigo-500 to-purple-600 h-7 text-white">
                                <Zap className="h-3 w-3 mr-1" />
                                Apply Fix
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="ask" className="flex-1 flex flex-col mt-0">
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto mb-4">
                    {isThinking ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">Analyzing campaign data...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        Ask me anything about your campaign performance
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Textarea 
                      placeholder="Ask about your campaign performance..." 
                      className="resize-none border-gray-200"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <Button 
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                      onClick={handlePromptSubmit}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Suggested Questions */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Suggested Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-2"
            >
              {[
                "How can I improve my open rates?",
                "Which leads should I prioritize for follow-up?",
                "What factors are affecting my reply rate?",
                "Analyze my campaign step performance",
                "Suggest subject lines for my next email",
                "Compare performance with industry benchmarks",
                "Identify bottlenecks in my workflow",
              ].map((question, index) => (
                <motion.div key={index} variants={item}>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left transition-all hover:border-indigo-300 hover:bg-indigo-50/50"
                    onClick={() => setPrompt(question)}
                  >
                    {question}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Sample Analyses</h4>
              <div className="grid grid-cols-1 gap-2">
                <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <CardContent className="p-3">
                    <h5 className="text-sm font-medium">Campaign Comparison</h5>
                    <p className="text-xs text-gray-500">Compare performance with previous campaigns</p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <CardContent className="p-3">
                    <h5 className="text-sm font-medium">Audience Segmentation</h5>
                    <p className="text-xs text-gray-500">Identify highest performing audience segments</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
