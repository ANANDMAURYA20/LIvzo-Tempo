import LIVZONavbar from './components/LIVZONavbar';
import CinematicHero from './components/CinematicHero';
import AdventureSection from './components/AdventureSection';
import AdventureProgression from './components/AdventureProgression';
import RoomSection from './components/RoomSection';
import CampingSection from './components/CampingSection';
import GroupSection from './components/GroupSection';
import FamilyEscape from './components/FamilyEscape';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-offwhite">
      <LIVZONavbar />
      <main>
        <CinematicHero />
        <AdventureSection />
        <AdventureProgression />
        <RoomSection />
        <CampingSection />
        <GroupSection />
        <FamilyEscape />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
