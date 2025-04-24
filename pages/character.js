import { useEffect, useState } from "react";
import { auth, db, ref, get, set } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

export default function CharacterPage() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login"); // redirect ke login jika belum login
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

  // Fungsi untuk Makan
  const handleMakan = async () => {
    if (character) {
      const newHealth = character.stats.health + 10;
      const newExp = character.stats.exp + 5;

      const updatedCharacter = {
        ...character,
        stats: {
          ...character.stats,
          health: newHealth,
          exp: newExp,
        },
      };

      const charRef = ref(db, `characters/${auth.currentUser.uid}`);
      await set(charRef, updatedCharacter);

      setCharacter(updatedCharacter);
    }
  };

  // Fungsi untuk Tidur
  const handleTidur = async () => {
    if (character) {
      const newHealth = character.stats.health + 20; // Meningkatkan health lebih banyak setelah tidur

      const updatedCharacter = {
        ...character,
        stats: {
          ...character.stats,
          health: newHealth,
        },
      };

      const charRef = ref(db, `characters/${auth.currentUser.uid}`);
      await set(charRef, updatedCharacter);

      setCharacter(updatedCharacter); // Update state lokal
    }
  };

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

      {/* Tombol Makan */}
      <div className="text-center mt-4">
        <button
          onClick={handleMakan}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Makan
        </button>
      </div>

      {/* Tombol Tidur */}
      <div className="text-center mt-4">
        <button
          onClick={handleTidur}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Tidur
        </button>
      </div>
    </div>
  );
}
