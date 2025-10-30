import { motion } from "framer-motion";
import { useMemo } from "react";

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: "", color: "" };

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;

    const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
    const colors = [
      "",
      "hsl(var(--destructive))",
      "hsl(25, 95%, 53%)",
      "hsl(45, 93%, 47%)",
      "hsl(142, 71%, 45%)",
      "hsl(142, 76%, 36%)",
    ];

    return {
      score,
      label: labels[score],
      color: colors[score],
    };
  }, [password]);

  if (!password || strength.score === 0) return null;

  return (
    <div className="space-y-2">
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: strength.color }}
          initial={{ width: 0 }}
          animate={{ width: `${(strength.score / 5) * 100}%` }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs"
        style={{ color: strength.color }}
      >
        Password strength: {strength.label}
      </motion.p>
    </div>
  );
};
