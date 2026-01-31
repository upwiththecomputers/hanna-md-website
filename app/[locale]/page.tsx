import Menu from './components/Menu'
import Hero from './components/Hero'
import About from './components/About'
import SuccessCases from './components/SuccessCases'
import Contact from './components/Contact'
import StructuredData from './components/StructuredData'

export default function Home() {
  return (
    <>
      <StructuredData />
      <Menu />
      <main>
        <Hero />
        <About />
        <SuccessCases />
        <Contact />
      </main>
    </>
  )
}
