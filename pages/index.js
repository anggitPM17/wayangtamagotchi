// pages/index.js
import Head from 'next/head';
import GameScreen from '../components/GameScreen'; // Pastikan nama file & path sesuai

export default function Home() {
  return (
    <>
      <Head>
        <title>Wayang Tamagotchi</title>
      </Head>
      <main>
        <GameScreen />
      </main>
    </>
  );
}
