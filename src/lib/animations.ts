import { Variants } from "framer-motion";

// Easing curves for different animation types
export const easings = {
  easeOutExpo: [0.22, 1, 0.36, 1],
  easeOutCubic: [0.4, 0, 0.2, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
} as const;

// Spring configurations
export const springs = {
  natural: { type: "spring" as const, damping: 25, stiffness: 300 },
  snappy: { type: "spring" as const, damping: 20, stiffness: 400 },
  gentle: { type: "spring" as const, damping: 30, stiffness: 200 },
} as const;

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: easings.easeOutCubic,
    },
  },
};

// Fade variants
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Scale + Fade variants
export const scaleFadeVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: easings.easeOutCubic,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

// Slide variants (from different directions)
export const slideVariants = {
  fromLeft: {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  },
  fromRight: {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
  },
  fromTop: {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
  },
  fromBottom: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
  },
} as const;

// Stagger container variants
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// Stagger item variants
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

// Button press animation
export const buttonTap = {
  scale: 0.97,
  transition: { duration: 0.1 },
};

// Card hover animation
export const cardHover = {
  y: -5,
  boxShadow: "0 20px 40px -15px hsl(var(--primary) / 0.2)",
  transition: {
    duration: 0.3,
    ease: easings.easeOutCubic,
  },
};

// Input focus variants
export const inputFocusVariants = {
  focused: {
    scale: 1.02,
    boxShadow: "0 0 0 3px hsl(var(--primary) / 0.1)",
    transition: {
      duration: 0.2,
      ease: easings.easeOutCubic,
    },
  },
  unfocused: {
    scale: 1,
    boxShadow: "0 0 0 0px hsl(var(--primary) / 0)",
    transition: {
      duration: 0.2,
    },
  },
};

// Shake animation (for errors)
export const shakeVariants: Variants = {
  initial: { x: 0 },
  animate: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

// Loading pulse variants
export const pulseVariants: Variants = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Shimmer effect for skeletons
export const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Typing indicator dots
export const typingDotVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-3, 0, -3],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Message bubble variants
export const messageBubbleVariants = {
  user: {
    initial: { x: 50, opacity: 0, scale: 0.95 },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: easings.easeOutCubic,
      },
    },
  },
  assistant: {
    initial: { x: -50, opacity: 0, scale: 0.95 },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: easings.easeOutCubic,
      },
    },
  },
};

// Scroll reveal variants
export const scrollRevealVariants: Variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOutExpo,
    },
  },
};

// Hero section variants with stagger
export const heroVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const heroItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOutExpo,
    },
  },
};
