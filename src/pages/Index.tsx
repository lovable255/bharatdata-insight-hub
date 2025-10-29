import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[80vh] text-center">
          <div className="animate-fade-in space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              BharatData Connect
            </h1>
            <p className="text-xl md:text-2xl text-primary font-semibold">
              Empowering India through Open Data Intelligence
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join now to explore India's data intelligently with AI-driven insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-slide-up">
              <Button 
                onClick={() => navigate('/register')}
                size="lg"
                className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-medium transition-all hover:scale-105"
              >
                Get Started
              </Button>
              <Button 
                onClick={() => navigate('/login')}
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 BharatData Connect | All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Index;
