import { useState, useEffect } from "react";
import { auth, db, ref, get, set } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function CharacterPage() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedWeapon, setSelectedWeapon] = useState('');
  const [selectedCompanion, setSelectedCompanion] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      const charRef = ref(db, `characters/${user.uid}`);
      const snapshot = await get(charRef);
      if (snapshot.exists()) {
        setCharacter(snapshot.val());
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateCharacter = async (newData) => {
    const updatedCharacter = { ...character, ...newData };
    await set(ref(db, `characters/${auth.currentUser.uid}`), updatedCharacter);
    setCharacter(updatedCharacter);
  };

  const handleEat = () => {
    if (character) {
      updateCharacter({
        stats: {
          ...character.stats,
          health: character.stats.health + 10,
          exp: character.stats.exp + 5,
        },
      });
    }
  };

  const handleSleep = () => {
    if (character) {
      updateCharacter({
        stats: {
          ...character.stats,
          health: character.stats.health + 20,
        },
      });
    }
  };

  const handleBattle = () => {
    if (character) {
      const damage = Math.floor(Math.random() * 20) + 1;
      updateCharacter({
        stats: {
          ...character.stats,
          health: Math.max(0, character.stats.health - damage),
          exp: character.stats.exp + 15,
        },
      });
    }
  };

  const handleLevelUp = () => {
    if (character && character.stats.exp >= 100) {
      updateCharacter({
        stats: {
          level: character.stats.level + 1,
          exp: 0,
          health: character.stats.health + 50,
        },
      });
    }
  };

  const handleWeaponChange = (weapon) => {
    updateCharacter({ weapon });
    setSelectedWeapon(weapon);
  };

  const handleCompanionChange = (companion) => {
    updateCharacter({ companion });
    setSelectedCompanion(companion);
  };

  const weapons = ["Keris", "Panah", "Buku Sakti"];
  const companions = ["Garuda", "Naga", "Macan"];

  if (loading) return <p className="text-center mt-10">Loading karakter...</p>;
  if (!character) return <p className="text-center mt-10">Karakter tidak ditemukan.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Karakter Anda</h1>
      <img src={character.image} alt={character.name} className="w-40 h-40 object-cover mx-auto rounded-full" />
      <h2 className="text-xl font-semibold text-center mt-4">{character.name}</h2>
      <p className="text-center text-gray-600">Senjata: {character.weapon}</p>
      <p className="text-center text-gray-600">Hewan Pendamping: {character.companion}</p>
      <div className="mt-4 text-center">
        <p>Level: {character.stats.level}</p>
        <p>EXP: {character.stats.exp}</p>
        <p>Kesehatan: {character.stats.health}</p>
      </div>

      {/* Interaksi */}
      <div className="mt-4 text-center space-x-2">
        <button onClick={handleEat} className="px-4 py-2 bg-green-500 text-white rounded-lg">Makan</button>
        <button onClick={handleSleep} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Tidur</button>
        <button onClick={handleBattle} className="px-4 py-2 bg-red-500 text-white rounded-lg">Bertarung</button>
        <button onClick={handleLevelUp} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Naik Level</button>
      </div>

      {/* Kustomisasi Senjata */}
      <div className="mt-6 text-center">
        <h3 className="font-semibold">Pilih Senjata:</h3>
        {weapons.map((weapon) => (
          <button
            key={weapon}
            onClick={() => handleWeaponChange(weapon)}
            className={`px-4 py-2 mt-2 mr-2 ${selectedWeapon === weapon ? "bg-blue-600" : "bg-gray-400"} text-white rounded-lg`}
          >
            {weapon}
          </button>
        ))}
      </div>

      {/* Kustomisasi Hewan Pendamping */}
      <div className="mt-4 text-center">
        <h3 className="font-semibold">Pilih Hewan Pendamping:</h3>
        {companions.map((companion) => (
          <button
            key={companion}
            onClick={() => handleCompanionChange(companion)}
            className={`px-4 py-2 mt-2 mr-2 ${selectedCompanion === companion ? "bg-blue-600" : "bg-gray-400"} text-white rounded-lg`}
          >
            {companion}
          </button>
        ))}
      </div>
    </div>
  );
}
