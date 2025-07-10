import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import AboutSodaBlasting from './pages/AboutSodaBlasting';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Automotive from './pages/Automotive';
import FoodProcessingEquipment from './pages/FoodProcessingEquipment';
import FireWaterDamage from './pages/FireWaterDamage';
import Aircraft from './pages/Aircraft';
import LogHomes from './pages/LogHomes';
import BoatMarine from './pages/BoatMarine';
import CommercialIndustrial from './pages/CommercialIndustrial';

function App() {
  return (
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-soda-blasting" element={<AboutSodaBlasting />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/soda-blasting/automotive-soda-blasting" element={<Automotive />} />
            <Route path="/soda-blasting/food-processing-equipment" element={<FoodProcessingEquipment />} />
            <Route path="/soda-blasting/fire-and-water-damage-restoration-soda-blasting" element={<FireWaterDamage />} />
            <Route path="/soda-blasting/airplane-soda-blasting" element={<Aircraft />} />
            <Route path="/soda-blasting/log-home-soda-blasting" element={<LogHomes />} />
            <Route path="/soda-blasting/boat-and-marine-soda-blasting" element={<BoatMarine />} />
            <Route path="/soda-blasting/commercial-industrial" element={<CommercialIndustrial />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;