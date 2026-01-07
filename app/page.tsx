'use client';

import { useState } from 'react';
import GameBoard from "./components/game/GameBoard";
import ModeSelection from "./components/educational/ModeSelection";

export default function Home() {
  const [gameMode, setGameMode] = useState<'educational' | 'sandbox' | null>(null);

  if (gameMode === null) {
    return <ModeSelection onSelectMode={setGameMode} />;
  }

  return <GameBoard initialMode={gameMode} />;
}
