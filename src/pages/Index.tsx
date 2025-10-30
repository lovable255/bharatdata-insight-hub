import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Database, TrendingUp, BarChart3, Shield } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import { FloatingScrollButton } from "@/components/ui/floating-button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { pageVariants, heroVariants, heroItemVariants, staggerContainer, staggerItem, buttonTap, cardHover } from "@/lib/animations";

const features = [
  { icon: Database, title: "Comprehensive Data", description: "Access India's largest open datasets" },
  { icon: TrendingUp, title: "Real-time Analytics", description: "Live insights and trend analysis" },
  { icon: BarChart3, title: "Visual Reports", description: "Interactive charts and dashboards" },
  { icon: Shield, title: "Secure & Reliable", description: "Enterprise-grade data security" },
];

const Index = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-muted/10"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="relative py-16 md:py-24 lg:py-32 px-4 overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBackground})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
        </motion.div>

        <motion.div className="container mx-auto relative z-10 max-w-5xl" style={{ opacity }} variants={heroVariants} initial="initial" animate="animate">
          <motion.h1 variants={heroItemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            BharatData Connect
          </motion.h1>
          <motion.h2 variants={heroItemVariants} className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Unlock India's Data Intelligence
          </motion.h2>
          <motion.p variants={heroItemVariants} className="text-base md:text-lg text-muted-foreground mb-8 max-w-3xl leading-relaxed">
            Access comprehensive datasets from across India with AI-powered insights and analytics.
          </motion.p>
          <motion.div variants={heroItemVariants} className="flex flex-col sm:flex-row gap-4 mb-8">
            <motion.div whileTap={buttonTap} whileHover={{ scale: 1.05 }}>
              <Button onClick={() => navigate("/register")} size="lg" className="bg-primary hover:bg-primary-hover shadow-strong">
                Get Started
              </Button>
            </motion.div>
            <motion.div whileTap={buttonTap} whileHover={{ scale: 1.05 }}>
              <Button onClick={() => navigate("/login")} variant="outline" size="lg" className="border-2">
                Login
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16 px-4 bg-muted/5">
        <div className="container mx-auto max-w-6xl">
          <FeatureTitle />
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}>
            {features.map((feature, index) => <FeatureCard key={index} feature={feature} />)}
          </motion.div>
        </div>
      </section>

      <FloatingScrollButton />

      <footer className="py-8 border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 BharatData Connect | All Rights Reserved
        </div>
      </footer>
    </motion.div>
  );
};

const FeatureTitle = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <motion.h3 ref={ref as any} className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground" initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
      Why Choose BharatData Connect?
    </motion.h3>
  );
};

const FeatureCard = ({ feature }: { feature: typeof features[0] }) => {
  const Icon = feature.icon;
  return (
    <motion.div variants={staggerItem} whileHover={cardHover}>
      <Card className="p-6 h-full transition-all hover:shadow-strong bg-gradient-card border-border/50 cursor-pointer">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div className="p-3 bg-primary/10 rounded-xl" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.6 }}>
            <Icon className="h-8 w-8 text-primary" />
          </motion.div>
          <h4 className="text-xl font-semibold text-foreground">{feature.title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default Index;
