
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    role: 'bot',
    content: 'Hi there! I\'m your NutriWise assistant. How can I help you with your nutrition or diet questions today?',
    timestamp: new Date(),
  },
];

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      const responseMessage = getAIResponse(userMessage.content);
      setMessages((prev) => [...prev, responseMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const getAIResponse = (userInput: string): Message => {
    // Simple rule-based responses
    const input = userInput.toLowerCase();
    let response = '';

    if (input.includes('hello') || input.includes('hi')) {
      response = 'Hello! How can I help you with your nutrition needs today?';
    } else if (input.includes('vegetarian') || input.includes('vegan')) {
      response = 'For vegetarian and vegan diets, focus on plant-based proteins like beans, lentils, tofu, and seitan. Make sure to include B12 supplements for vegans!';
    } else if (input.includes('protein')) {
      response = 'Good protein sources include lean meats, fish, eggs, dairy, beans, lentils, nuts, and seeds. An average adult needs about 0.8g of protein per kg of body weight daily.';
    } else if (input.includes('carb') || input.includes('carbohydrate')) {
      response = 'Healthy carbohydrates come from whole grains, fruits, vegetables, and legumes. They should make up about 45-65% of your daily calories.';
    } else if (input.includes('fat')) {
      response = 'Healthy fats are essential for your diet. Focus on unsaturated fats from olive oil, avocados, nuts, and fatty fish. Limit saturated fats and avoid trans fats.';
    } else if (input.includes('calorie') || input.includes('calories')) {
      response = 'Your calorie needs depend on age, weight, height, gender, and activity level. Use our calculator to determine your specific needs.';
    } else if (input.includes('diabetes')) {
      response = 'For diabetes management, focus on low glycemic index foods, controlled carbohydrate intake, and regular meals. Consider exploring our personalized meal plans for diabetic-friendly options.';
    } else if (input.includes('heart')) {
      response = 'Heart-healthy diets emphasize fruits, vegetables, whole grains, lean proteins, and limit sodium, added sugars, and unhealthy fats. The DASH or Mediterranean diets are great options.';
    } else if (input.includes('bmi')) {
      response = 'BMI (Body Mass Index) is a measure of body fat based on height and weight. Check out our BMI calculator to determine yours and get customized diet recommendations.';
    } else if (input.includes('thank')) {
      response = 'You\'re welcome! Feel free to ask if you have any other nutrition questions.';
    } else {
      response = 'That\'s an interesting nutrition question. For more specific and personalized advice, please try our diet planning tools or nutritional analysis features.';
    }

    return {
      role: 'bot',
      content: response,
      timestamp: new Date(),
    };
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg bg-nutriwise-600 hover:bg-nutriwise-700"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 shadow-xl rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="h-96 flex flex-col">
            <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-md font-medium flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <span>NutriWise Assistant</span>
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleChat} 
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto px-4 py-0">
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-nutriwise-600 text-white'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-muted text-foreground">
                      <span className="flex items-center space-x-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce animation-delay-200">.</span>
                        <span className="animate-bounce animation-delay-400">.</span>
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 mr-2"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="bg-nutriwise-600 hover:bg-nutriwise-700"
                  disabled={isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      )}
    </>
  );
};

export default ChatBot;
