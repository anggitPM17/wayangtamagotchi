// utils/initCharacter.js
import { db, ref, set, get } from "../lib/firebase";

export const createCharacterIfNotExists = async (uid) => {
  const characterRef = ref(db, `characters/${uid}`);
  const snapshot = await get(characterRef);

  if (!snapshot.exists()) {
    await set(characterRef, {
      name: "Arjuna",
      weapon: "Panah Sakti",
      companion: "Rajawali",
      image: "/characters/arjuna.png", // pastikan kamu punya gambar ini
      stats: {
        level: 1,
        exp: 0,
        health: 100
      }
    });
  }
};
