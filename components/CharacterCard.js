// components/CharacterCard.js
export default function CharacterCard({ character }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">
      <img src={character.image} alt={character.name} className="w-40 h-40 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-center">{character.name}</h2>
      <p className="text-center text-sm">Senjata: {character.weapon}</p>
      <p className="text-center text-sm">Pendamping: {character.companion}</p>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Level: {character.stats.level}</p>
        <p>HP: {character.stats.health}</p>
        <p>EXP: {character.stats.exp}</p>
      </div>
    </div>
  );
}
