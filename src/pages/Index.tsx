import { useState, useCallback } from "react";
import { GameGrid } from "@/components/GameGrid";
import { SolvedCategories } from "@/components/SolvedCategories";
import { LivesIndicator } from "@/components/LivesIndicator";
import { GameOver } from "@/components/GameOver";

export interface Word {
  id: string;
  text: string;
}

export interface SolvedCategory {
  category: string;
  difficulty: number;
  words: Word[];
}

// Mock data - replace with your actual words
const INITIAL_WORDS: Word[] = [
  { id: "1", text: "ELMA" },
  { id: "2", text: "ARMUT" },
  { id: "3", text: "ÜzÜM" },
  { id: "4", text: "KİRAZ" },
  { id: "5", text: "KÖPEK" },
  { id: "6", text: "KEDİ" },
  { id: "7", text: "TAVŞAN" },
  { id: "8", text: "HAMSTER" },
  { id: "9", text: "İSTANBUL" },
  { id: "10", text: "ANKARA" },
  { id: "11", text: "İZMİR" },
  { id: "12", text: "BURSA" },
  { id: "13", text: "KIRMIZI" },
  { id: "14", text: "MAVİ" },
  { id: "15", text: "YEŞİL" },
  { id: "16", text: "SARI" },
];

const Index = () => {
  const [words, setWords] = useState<Word[]>(INITIAL_WORDS);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [solvedCategories, setSolvedCategories] = useState<SolvedCategory[]>([]);
  const [lives, setLives] = useState(4);
  const [shakingIds, setShakingIds] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWordClick = useCallback((id: string) => {
    if (isSubmitting || shakingIds.size > 0) return;

    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else if (newSet.size < 4) {
        newSet.add(id);
      }
      return newSet;
    });
  }, [isSubmitting, shakingIds]);

  const handleSubmit = useCallback(async () => {
    if (selectedIds.size !== 4 || isSubmitting) return;

    setIsSubmitting(true);
    const selectedWords = words.filter((w) => selectedIds.has(w.id));

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ words: selectedWords.map((w) => w.text) }),
      });
      
      const result = await response.json();

      if (result.success) {
        // Success: add to solved categories and remove words
        setSolvedCategories((prev) => [
          ...prev,
          {
            category: result.category,
            difficulty: result.difficulty,
            words: selectedWords,
          },
        ]);
        setWords((prev) => prev.filter((w) => !selectedIds.has(w.id)));
        setSelectedIds(new Set());
      } else {
        // Failure: shake and reduce lives
        setShakingIds(new Set(selectedIds));
        setLives((prev) => prev - 1);
        
        setTimeout(() => {
          setShakingIds(new Set());
          setSelectedIds(new Set());
        }, 600);
      }
    } catch (error) {
      // For demo: simulate a wrong answer
      setShakingIds(new Set(selectedIds));
      setLives((prev) => prev - 1);
      
      setTimeout(() => {
        setShakingIds(new Set());
        setSelectedIds(new Set());
      }, 600);
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedIds, words, isSubmitting]);

  const isGameOver = lives <= 0;
  const isGameWon = words.length === 0 && solvedCategories.length === 4;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-foreground mb-8">Bağlantılar</h1>
      
      <div className="w-full max-w-lg space-y-2">
        <SolvedCategories categories={solvedCategories} />
        
        {!isGameOver && !isGameWon && (
          <GameGrid
            words={words}
            selectedIds={selectedIds}
            shakingIds={shakingIds}
            onWordClick={handleWordClick}
          />
        )}

        {(isGameOver || isGameWon) && (
          <GameOver won={isGameWon} />
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <LivesIndicator lives={lives} />
        
        {!isGameOver && !isGameWon && (
          <button
            onClick={handleSubmit}
            disabled={selectedIds.size !== 4 || isSubmitting}
            className="px-6 py-2 rounded-full border-2 border-foreground text-foreground font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-foreground hover:text-background transition-colors"
          >
            Gönder
          </button>
        )}
      </div>
    </div>
  );
};

export default Index;
