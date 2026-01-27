import { cn } from "@/lib/utils";
import { SolvedCategory } from "@/pages/Index";

interface SolvedCategoriesProps {
  categories: SolvedCategory[];
}

const DIFFICULTY_COLORS: Record<number, string> = {
  0: "bg-difficulty-yellow text-difficulty-yellow-foreground",
  1: "bg-difficulty-green text-difficulty-green-foreground",
  2: "bg-difficulty-blue text-difficulty-blue-foreground",
  3: "bg-difficulty-purple text-difficulty-purple-foreground",
};

export const SolvedCategories = ({ categories }: SolvedCategoriesProps) => {
  return (
    <div className="space-y-2">
      {categories.map((category, index) => (
        <div
          key={index}
          className={cn(
            "w-full p-4 rounded-lg text-center animate-slide-down",
            DIFFICULTY_COLORS[category.difficulty] || "bg-muted text-muted-foreground"
          )}
        >
          <div className="font-bold text-lg uppercase">{category.category}</div>
          <div className="text-sm mt-1">
            {category.words.map((w) => w.text).join(", ")}
          </div>
        </div>
      ))}
    </div>
  );
};
