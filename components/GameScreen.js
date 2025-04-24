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
    <div style={container}>
      <h1>Wayang Tamagotchi</h1>
      <div style={characterContainer}>
        <img src="/images/wayang-character.png" alt="Wayang Character" style={characterStyle} />
        <img src="/images/companion-pet.png" alt="Companion Pet" style={petStyle} />
      </div>
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

const container = {
  padding: 20,
  textAlign: 'center',
  fontFamily: 'sans-serif',
};

const characterContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  margin: '20px 0',
};

const characterStyle = {
  width: 150,
  height: 'auto',
};

const petStyle = {
  width: 100,
  height: 'auto',
};

const btn = {
  margin: 10,
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '10px',
  background: '#ffd369',
  border: 'none',
};
