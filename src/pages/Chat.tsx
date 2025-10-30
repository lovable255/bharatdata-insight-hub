import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Send, LogOut, Loader2, Bot, User } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";
import { pageVariants, messageBubbleVariants, typingDotVariants, buttonTap } from "@/lib/animations";

interface Message {
  role: "user" | "assistant";
  content: string;
  id: string;
  isTyping?: boolean;
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      } else {
        setUserName(session.user.user_metadata.full_name || "User");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { 
      role: "user", 
      content: input,
      id: Date.now().toString()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { message: input },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        id: (Date.now() + 1).toString(),
        isTyping: true
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error("Failed to get response. Please try again.");
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/10"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <motion.header 
        className="border-b border-border bg-card/80 backdrop-blur-md shadow-soft sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Bot className="h-6 w-6 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-primary">BharatData Connect</h1>
              <p className="text-xs text-muted-foreground">Welcome, {userName}</p>
            </div>
          </div>
          <motion.div whileTap={buttonTap} whileHover={{ scale: 1.05 }}>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Chat Area */}
      <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden flex flex-col max-w-4xl">
        <Card className="flex-1 p-4 md:p-6 bg-card/50 backdrop-blur-sm shadow-medium overflow-y-auto border-border/50">
          <AnimatePresence mode="popLayout">
            {messages.length === 0 && (
              <motion.div 
                className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Bot className="h-16 w-16 mb-4 text-primary opacity-50" />
                <p className="text-lg font-medium mb-2">Start a conversation</p>
                <p className="text-sm">Ask me anything about India's data and insights</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                const variants = isUser ? messageBubbleVariants.user : messageBubbleVariants.assistant;
                
                return (
                  <motion.div
                    key={msg.id}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="flex-shrink-0 mt-1">
                        <motion.div 
                          className="p-2 bg-primary/10 rounded-full"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Bot className="h-4 w-4 text-primary" />
                        </motion.div>
                      </div>
                    )}
                    <motion.div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-soft ${
                        isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border/50"
                      }`}
                      whileHover={{ scale: 1.01, boxShadow: "0 8px 16px -8px hsl(var(--primary) / 0.15)" }}
                      transition={{ duration: 0.2 }}
                    >
                      {!isUser && msg.isTyping && index === messages.length - 1 ? (
                        <Typewriter 
                          text={msg.content} 
                          speed={20}
                          className="text-sm leading-relaxed whitespace-pre-wrap"
                          onComplete={() => {
                            setMessages(prev => prev.map((m, i) => 
                              i === index ? { ...m, isTyping: false } : m
                            ));
                          }}
                        />
                      ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </motion.div>
                    {isUser && (
                      <div className="flex-shrink-0 mt-1">
                        <div className="p-2 bg-primary rounded-full">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {loading && (
              <motion.div 
                className="flex gap-3 justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="bg-card border border-border/50 rounded-2xl px-4 py-3 shadow-soft">
                  <div className="flex items-center gap-2">
                    <motion.span variants={typingDotVariants} initial="initial" animate="animate" className="w-2 h-2 bg-primary rounded-full" />
                    <motion.span variants={typingDotVariants} initial="initial" animate="animate" transition={{ delay: 0.1 }} className="w-2 h-2 bg-primary rounded-full" />
                    <motion.span variants={typingDotVariants} initial="initial" animate="animate" transition={{ delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Input Bar */}
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-2 shadow-medium bg-card/80 backdrop-blur-sm border-border/50">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about India's data..."
                disabled={loading}
                className="flex-1 border-0 focus-visible:ring-1 bg-transparent"
              />
              <motion.div whileTap={buttonTap} whileHover={{ scale: 1.05 }}>
                <Button onClick={handleSend} disabled={loading || !input.trim()} className="bg-primary hover:bg-primary-hover shadow-soft" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          © 2025 BharatData Connect | All Rights Reserved
        </div>
      </footer>
    </motion.div>
  );
};

export default Chat;
