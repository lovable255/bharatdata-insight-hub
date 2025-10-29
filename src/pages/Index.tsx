import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroBackground from "@/assets/hero-background.jpg";
import { Database, TrendingUp, Brain } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Database, title: "Open Data", description: "Access comprehensive Indian datasets" },
    { icon: TrendingUp, title: "Real Insights", description: "AI-powered data analysis" },
    { icon: Brain, title: "Smart AI", description: "Intelligent conversational interface" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <main className="flex-1 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[80vh] text-center">
          <motion.div 
            className="space-y-6 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-foreground leading-tight bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              BharatData Connect
            </motion.h1>
            <motion.p 
              className="text-xl md:text-3xl text-primary font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Empowering India through Open Data Intelligence
            </motion.p>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Join now to explore India's data intelligently with AI-driven insights
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button 
                onClick={() => navigate('/register')}
                size="lg"
                className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-strong transition-all hover:scale-105 hover:shadow-medium group"
              >
                Get Started
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Button>
              <Button 
                onClick={() => navigate('/login')}
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
              >
                Login
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-medium transition-all group hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 BharatData Connect | All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Index;
