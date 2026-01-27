interface GameOverProps {
  won: boolean;
}

export const GameOver = ({ won }: GameOverProps) => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-foreground">
        {won ? "Tebrikler! 🎉" : "Oyun Bitti 😔"}
      </h2>
      <p className="text-muted-foreground mt-2">
        {won
          ? "Tüm bağlantıları buldunuz!"
          : "Tüm haklarınızı kullandınız."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
      >
        Tekrar Oyna
      </button>
    </div>
  );
};
