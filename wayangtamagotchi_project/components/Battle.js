
import { useState } from "react";

export default function Battle() {
  const [player, setPlayer] = useState({ name: "Arjuna", hp: 100, attack: 20, defense: 10 });
  const [enemy, setEnemy] = useState({ name: "Raksasa", hp: 100, attack: 15, defense: 5 });
  const [log, setLog] = useState([]);

  const handleAttack = () => {
    const dmgToEnemy = Math.max(0, player.attack - enemy.defense);
    const dmgToPlayer = Math.max(0, enemy.attack - player.defense);

    const newEnemyHp = enemy.hp - dmgToEnemy;
    const newPlayerHp = player.hp - dmgToPlayer;

    setEnemy({ ...enemy, hp: newEnemyHp });
    setPlayer({ ...player, hp: newPlayerHp });
    setLog([...log, `Arjuna menyerang ${enemy.name} -${dmgToEnemy} HP`, `${enemy.name} balas -${dmgToPlayer} HP`]);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-2 text-center">Pertarungan</h2>
      <div className="flex justify-between">
        <div>
          <h3>{player.name}</h3>
          <p>HP: {player.hp}</p>
        </div>
        <div>
          <h3>{enemy.name}</h3>
          <p>HP: {enemy.hp}</p>
        </div>
      </div>
      <button onClick={handleAttack} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Serang!</button>
      <div className="mt-4 bg-gray-100 p-2 rounded">
        {log.map((entry, i) => <p key={i} className="text-sm">• {entry}</p>)}
      </div>
    </div>
  );
}
    