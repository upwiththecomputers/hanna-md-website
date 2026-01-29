import { Header } from "../components/header.tsx";
import { Hero } from "../components/hero.tsx";
import { Footer } from "../components/footer.tsx";

export function HomePage() {
  return (
    <>
      <Header />
      <main class="main">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
