import { useState } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';

export default function GameScreen() {
  const [status, setStatus] = useState({
    hunger: 50,
    energy: 50,
    level: 1,
    exp: 0,
    health: 100,
  });

  const soundEffect = (type) => {
    const sound = new Howl({
      src: [`/sounds/${type}.mp3`], // Pastikan file suara sudah ada di folder /public/sounds
    });
    sound.play();
  };

  const handleEat = () => {
    setStatus((prev) => ({
      ...prev,
      hunger: Math.min(prev.hunger + 20, 100),
    }));
    soundEffect('eat'); // Suara makan
  };

  const handleSleep = () => {
    setStatus((prev) => ({
      ...prev,
      energy: Math.min(prev.energy + 30, 100),
    }));
    soundEffect('sleep'); // Suara tidur
  };

  const handleBattle = () => {
    const battleResult = Math.random() > 0.5 ? 'win' : 'lose';
    setStatus((prev) => ({
      ...prev,
      health: battleResult === 'win' ? prev.health : Math.max(prev.health - 20, 0),
      exp: battleResult === 'win' ? prev.exp + 15 : prev.exp,
    }));
    soundEffect(battleResult === 'win' ? 'win' : 'lose'); // Suara menang/keluar
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
      soundEffect('levelup'); // Suara naik level
    } else {
      alert('Belum cukup EXP untuk naik level!');
    }
  };

  return (
    <div style={container}>
      <h1>Wayang Tamagotchi</h1>
      <div style={characterContainer}>
        <motion.img
          src="/images/wayang-character.png"
          alt="Wayang Character"
          style={characterStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.img
          src="/images/companion-pet.png"
          alt="Companion Pet"
          style={petStyle}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
      <p>Level: {status.level}</p>
      <p>EXP: {status.exp}</p>
      <p>Kesehatan: {status.health}</p>
      <p>Energi: {status.energy}</p>
      <p>Rasa Lapar: {status.hunger}</p>

      <div style={{ marginTop: 20 }}>
        <motion.button
          onClick={handleEat}
          style={btn}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🍱 Makan
        </motion.button>
        <motion.button
          onClick={handleSleep}
          style={btn}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          🛏️ Tidur
        </motion.button>
        <motion.button
          onClick={handleBattle}
          style={btn}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ⚔️ Bertarung
        </motion.button>
        <motion.button
          onClick={handleLevelUp}
          style={btn}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ⬆️ Naik Level
        </motion.button>
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
