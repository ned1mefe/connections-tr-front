import { cn } from "@/lib/utils";
import { Word } from "@/pages/Index";

interface WordBoxProps {
  word: Word;
  isSelected: boolean;
  isShaking: boolean;
  onClick: () => void;
}

export const WordBox = ({ word, isSelected, isShaking, onClick }: WordBoxProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "aspect-square flex items-center justify-center p-2 rounded-lg font-bold text-sm md:text-base uppercase transition-all duration-200",
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
        isShaking && "animate-shake"
      )}
    >
      {word.text}
    </button>
  );
};
