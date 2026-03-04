import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, FileText, Send, Sparkles, History, 
  Trash2, Copy, CheckCircle2, AlertTriangle, Clock,
  ChevronRight, Bot, User
} from 'lucide-react';
import { useTheme } from '@/react-app/contexts/ThemeContext';
import ThemeToggle from '@/react-app/components/ThemeToggle';

interface HistoryItem {
  id: string;
  preview: string;
  aiScore: number;
  plagiarismScore: number;
  timestamp: Date;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AnalysisResult {
  aiScore: number;
  plagiarismScore: number;
  sentences: { text: string; aiProbability: number }[];
}

export default function TextDetector() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      preview: 'The quick brown fox jumps over the lazy dog...',
      aiScore: 87,
      plagiarismScore: 12,
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      preview: 'Machine learning has revolutionized the way...',
      aiScore: 94,
      plagiarismScore: 5,
      timestamp: new Date(Date.now() - 7200000)
    }
  ]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI detection assistant. Paste your text above and I\'ll analyze it for AI-generated content and plagiarism. Feel free to ask me questions about the results!',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [showHistory, setShowHistory] = useState(true);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResult: AnalysisResult = {
      aiScore: Math.floor(Math.random() * 40) + 60,
      plagiarismScore: Math.floor(Math.random() * 20),
      sentences: inputText.split(/[.!?]+/).filter(s => s.trim()).map(text => ({
        text: text.trim(),
        aiProbability: Math.floor(Math.random() * 100)
      }))
    };
    
    setResult(mockResult);
    setIsAnalyzing(false);
    
    // Add to history
    setHistory(prev => [{
      id: Date.now().toString(),
      preview: inputText.slice(0, 50) + '...',
      aiScore: mockResult.aiScore,
      plagiarismScore: mockResult.plagiarismScore,
      timestamp: new Date()
    }, ...prev]);
    
    // Add chat message about results
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Analysis complete! I detected ${mockResult.aiScore}% AI-generated content and ${mockResult.plagiarismScore}% potential plagiarism. ${mockResult.aiScore > 70 ? 'This text shows strong indicators of AI generation.' : 'The AI indicators are moderate.'} Would you like me to explain which parts seem most AI-generated?`,
      timestamp: new Date()
    }]);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    }]);
    
    const userMessage = chatInput;
    setChatInput('');
    
    // Simulate response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(userMessage),
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const getAIResponse = (message: string): string => {
    const lower = message.toLowerCase();
    if (lower.includes('explain') || lower.includes('why')) {
      return 'AI-generated text often exhibits patterns like uniform sentence structure, lack of personal anecdotes, and overly formal language. The highlighted sentences show these characteristics most strongly.';
    }
    if (lower.includes('improve') || lower.includes('human')) {
      return 'To make text appear more human-written, try adding personal experiences, varying sentence length dramatically, and including colloquialisms or minor imperfections.';
    }
    return 'I can help you understand the analysis results, explain detection methodology, or suggest ways to verify content authenticity. What would you like to know?';
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'bg-red-500/20 border-red-500/30';
    if (score >= 40) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-green-500/20 border-green-500/30';
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-cyan-950/10" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      {/* History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="relative z-10 border-r border-white/10 bg-background/50 backdrop-blur-xl flex flex-col"
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-cyan-400">
                <History className="w-5 h-5" />
                <span className="font-['Orbitron'] text-sm font-semibold">Scan History</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glass rounded-lg p-3 border border-white/10 cursor-pointer hover:border-cyan-500/30 transition-colors group"
                  onClick={() => setInputText(item.preview.replace('...', ''))}
                >
                  <p className="text-sm text-foreground/80 line-clamp-2 mb-2 font-['Space_Grotesk']">
                    {item.preview}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`${getScoreColor(item.aiScore)}`}>
                        {item.aiScore}% AI
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-purple-400">
                        {item.plagiarismScore}% Plag
                      </span>
                    </div>
                    <Clock className="w-3 h-3 text-muted-foreground" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <header className="h-16 border-b border-white/10 bg-background/50 backdrop-blur-xl flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <History className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-['Orbitron'] text-lg font-bold">Text Detector</h1>
                <p className="font-['Rajdhani'] text-xs text-muted-foreground">AI & Plagiarism Analysis</p>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Text Input & Results */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl border border-white/10 overflow-hidden"
              >
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="font-['Rajdhani'] text-sm font-semibold">Paste or type your text</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-['Space_Grotesk']">
                      {inputText.length} characters
                    </span>
                    {inputText && (
                      <button
                        onClick={() => setInputText('')}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste the text you want to analyze for AI-generated content and plagiarism..."
                  className="w-full h-48 p-4 bg-transparent resize-none focus:outline-none font-['Space_Grotesk'] text-sm placeholder:text-muted-foreground/50"
                />
                <div className="p-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="px-3 py-1.5 rounded-lg text-xs font-['Rajdhani'] bg-white/5 hover:bg-white/10 transition-colors">
                      Upload File
                    </button>
                    <button
                      onClick={() => navigator.clipboard.readText().then(setInputText)}
                      className="px-3 py-1.5 rounded-lg text-xs font-['Rajdhani'] bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Paste
                    </button>
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={!inputText.trim() || isAnalyzing}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-['Orbitron'] text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Analyze
                      </>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Results Section */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    {/* Score Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`glass rounded-xl p-4 border ${getScoreBg(result.aiScore)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-['Rajdhani'] text-sm text-muted-foreground">AI Generated</span>
                          {result.aiScore >= 70 ? (
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                        <p className={`font-['Orbitron'] text-3xl font-bold ${getScoreColor(result.aiScore)}`}>
                          {result.aiScore}%
                        </p>
                      </div>
                      <div className={`glass rounded-xl p-4 border ${getScoreBg(result.plagiarismScore)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-['Rajdhani'] text-sm text-muted-foreground">Plagiarism</span>
                          {result.plagiarismScore >= 20 ? (
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                        <p className={`font-['Orbitron'] text-3xl font-bold ${getScoreColor(result.plagiarismScore)}`}>
                          {result.plagiarismScore}%
                        </p>
                      </div>
                    </div>

                    {/* Sentence Analysis */}
                    <div className="glass rounded-xl border border-white/10 overflow-hidden">
                      <div className="p-4 border-b border-white/10">
                        <span className="font-['Rajdhani'] text-sm font-semibold">Sentence-by-Sentence Analysis</span>
                      </div>
                      <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                        {result.sentences.map((sentence, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div 
                              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-['Orbitron'] ${
                                sentence.aiProbability >= 70 ? 'bg-red-500/20 text-red-400' :
                                sentence.aiProbability >= 40 ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-green-500/20 text-green-400'
                              }`}
                            >
                              {sentence.aiProbability}
                            </div>
                            <p className="flex-1 text-sm font-['Space_Grotesk'] text-foreground/80">
                              {sentence.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="w-80 border-l border-white/10 bg-background/50 backdrop-blur-xl flex flex-col">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-cyan-400">
                <Bot className="w-5 h-5" />
                <span className="font-['Orbitron'] text-sm font-semibold">AI Assistant</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    msg.role === 'assistant' ? 'bg-cyan-500/20' : 'bg-purple-500/20'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <Bot className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <User className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                  <div className={`glass rounded-xl p-3 max-w-[85%] ${
                    msg.role === 'user' ? 'bg-purple-500/10' : ''
                  }`}>
                    <p className="text-sm font-['Space_Grotesk']">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  placeholder="Ask about the analysis..."
                  className="flex-1 bg-white/5 rounded-xl px-4 py-2 text-sm font-['Space_Grotesk'] placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                />
                <button
                  onClick={handleSendChat}
                  disabled={!chatInput.trim()}
                  className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
