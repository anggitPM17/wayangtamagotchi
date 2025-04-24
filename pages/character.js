// pages/character.js
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { db, ref, get } from "firebase/database";
import CharacterCard from "../components/CharacterCard";

export default function CharacterPage() {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      const user = auth.currentUser;
      if (user) {
        const characterRef = ref(db, `characters/${user.uid}`);
        const snapshot = await get(characterRef);
        if (snapshot.exists()) {
          setCharacter(snapshot.val());
        }
      }
    };
    fetchCharacter();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Karakter Kamu</h1>
      {character ? (
        <CharacterCard character={character} />
      ) : (
        <p>Memuat karakter...</p>
      )}
    </div>
  );
}
