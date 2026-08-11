import LIVZONavbar from './components/LIVZONavbar';
import CinematicHero from './components/CinematicHero';
import ExperienceExplorer from './components/ExperienceExplorer';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-offwhite">
      <LIVZONavbar />
      <main>
        <CinematicHero />
        <ExperienceExplorer />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
