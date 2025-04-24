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
