interface LivesIndicatorProps {
  lives: number;
}

export const LivesIndicator = ({ lives }: LivesIndicatorProps) => {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <span>Kalan Hak:</span>
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i < lives ? "bg-foreground" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
