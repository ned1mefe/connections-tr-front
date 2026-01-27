import { Word } from "@/pages/Index";
import { WordBox } from "./WordBox";

interface GameGridProps {
  words: Word[];
  selectedIds: Set<string>;
  shakingIds: Set<string>;
  onWordClick: (id: string) => void;
}

export const GameGrid = ({ words, selectedIds, shakingIds, onWordClick }: GameGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {words.map((word) => (
        <WordBox
          key={word.id}
          word={word}
          isSelected={selectedIds.has(word.id)}
          isShaking={shakingIds.has(word.id)}
          onClick={() => onWordClick(word.id)}
        />
      ))}
    </div>
  );
};
