// components/GameScreen.js
import { useState } from 'react';

export default function GameScreen() {
  const [status, setStatus] = useState({
    hunger: 50,
    energy: 50,
    level: 1,
    exp: 0,
    health: 100,
  });

  const handleEat = () => {
    setStatus((prev) => ({
      ...prev,
      hunger: Math.min(prev.hunger + 20, 100),
    }));
  };

  const handleSleep = () => {
    setStatus((prev) => ({
      ...prev,
      energy: Math.min(prev.energy + 30, 100),
    }));
  };

  const handleBattle = () => {
    const battleResult = Math.random() > 0.5 ? 'win' : 'lose';
    setStatus((prev) => ({
      ...prev,
      health: battleResult === 'win' ? prev.health : Math.max(prev.health - 20, 0),
      exp: battleResult === 'win' ? prev.exp + 15 : prev.exp,
    }));
  };

  const handleLevelUp = () => {
    if (status.exp >= 100) {
      setStatus((prev) => ({
        ...prev,
        level: prev.level + 1,
        exp: 0,
        health: 100,
        hunger: 50,
        energy: 50,
      }));
    } else {
      alert('Belum cukup EXP untuk naik level!');
    }
  };

  return (
    <div style={{ padding: 20, textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Wayang Tamagotchi</h1>
      <p>Level: {status.level}</p>
      <p>EXP: {status.exp}</p>
      <p>Kesehatan: {status.health}</p>
      <p>Energi: {status.energy}</p>
      <p>Rasa Lapar: {status.hunger}</p>

      <div style={{ marginTop: 20 }}>
        <button onClick={handleEat} style={btn}>🍱 Makan</button>
        <button onClick={handleSleep} style={btn}>🛏️ Tidur</button>
        <button onClick={handleBattle} style={btn}>⚔️ Bertarung</button>
        <button onClick={handleLevelUp} style={btn}>⬆️ Naik Level</button>
      </div>
    </div>
  );
}

const btn = {
  margin: 10,
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '10px',
  background: '#ffd369',
  border: 'none',
};
// components/CharacterDisplay.js
export default function CharacterDisplay() {
  return (
    <div style={containerStyle}>
      <img
        src="/character/wayang-hero.png" // kamu bisa ganti dengan path karakter hasil generate
        alt="Wayang Character"
        style={charStyle}
      />
      <img
        src="/backgrounds/forest.png" // path latar belakang
        alt="Background"
        style={bgStyle}
      />
    </div>
  );
}

const containerStyle = {
  position: 'relative',
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
};

const bgStyle = {
  width: '100%',
  borderRadius: '16px',
};

const charStyle = {
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '150px',
  zIndex: 2,
};
