import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export const Typewriter = ({ text, speed = 30, onComplete, className = "" }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  // Allow clicking to skip animation
  const handleClick = () => {
    if (!isComplete) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
      setIsComplete(true);
      onComplete?.();
    }
  };

  return (
    <span onClick={handleClick} className={`cursor-pointer ${className}`}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};
