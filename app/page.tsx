import Image from "next/image";
import HomePage, { FeaturedProducts } from "./(shop)/page";

export default async function Home({

}: {

  }) {
  return (
    <div className="flex min-h-screen w-full bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full">
        <HomePage />
      </main>
    </div>
  );
}
