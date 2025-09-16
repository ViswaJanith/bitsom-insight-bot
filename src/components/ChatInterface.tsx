import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import bitsomLogo from '@/assets/bitsom-logo-official.png';
import bitsomBackground from '@/assets/bitsom-background.jpg';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm your BITSoM Alumni Knowledge Assistant. I can help you explore insights from our extensive collection of alumni interview transcripts. Ask me about career paths, industry experiences, or any specific guidance!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response with realistic delay
    setTimeout(() => {
      const botResponses = [
        `📊 Based on our alumni interviews, here are insights about "${inputValue}": Many of our graduates have found success by leveraging the analytical skills developed at BITSoM. The key is to apply strategic thinking to real-world challenges.`,
        `🎯 I found relevant alumni experiences about "${inputValue}". Several alumni mentioned the importance of networking and building strong professional relationships during their time at BITSoM.`,
        `💡 From our interview transcripts regarding "${inputValue}": Alumni consistently highlight the value of practical exposure and case-based learning in their career progression.`,
        `🚀 Alumni insights on "${inputValue}": The interdisciplinary approach at BITSoM has helped many graduates adapt to changing industry demands and take on leadership roles.`,
        `📈 Based on our extensive alumni database about "${inputValue}": Many successful graduates emphasize the importance of continuous learning and staying updated with industry trends.`
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bitsomBackground})` }}
      />
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/20" />
      <Card className="w-full max-w-2xl h-[700px] shadow-card bg-white/95 backdrop-blur-sm border-0 overflow-hidden animate-scale-in relative z-10">
        {/* Header */}
        <div className="bg-gradient-primary p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full p-2 animate-float">
              <img 
                src={bitsomLogo} 
                alt="BITSoM Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">BITSoM RAG Assistant</h1>
              <p className="text-white/80 text-sm">Alumni Interview Insights</p>
            </div>
            <Sparkles className="ml-auto w-6 h-6 text-white/60 animate-pulse" />
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={chatBoxRef}
          className="flex-1 p-6 overflow-y-auto bg-gradient-chat space-y-4 h-[500px]"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 animate-slide-up ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                message.sender === 'user' 
                  ? 'bg-bitsom-red text-white' 
                  : 'bg-primary text-white animate-pulse-glow'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
              </div>
              <div
                className={`max-w-[75%] p-4 rounded-2xl shadow-sm transition-smooth hover:shadow-md ${
                  message.sender === 'user'
                    ? 'bg-bitsom-red text-white rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100/50'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <span className={`text-xs mt-2 block ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-3 animate-slide-up">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center animate-pulse-glow">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100/50">
                <div className="flex items-center gap-1">
                  <span className="text-gray-600 text-sm">Assistant is thinking</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-typing"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about alumni experiences, career paths, or industry insights..."
              className="flex-1 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl px-4 py-3 text-sm transition-smooth"
              disabled={isTyping}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-bounce px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center mt-4 gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Connected to Alumni Database
            </span>
            <span>•</span>
            <span>{messages.length - 1} queries processed</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;