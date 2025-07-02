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
        <ScrollToTop />
        <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/about-soda-blasting" element={
          <Layout>
            <AboutSodaBlasting />
          </Layout>
        } />
        <Route path="/gallery" element={
          <Layout>
            <Gallery />
          </Layout>
        } />
        <Route path="/services" element={
          <Layout>
            <Services />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout>
            <Contact />
          </Layout>
        } />
        <Route path="/soda-blasting/automotive-soda-blasting" element={
          <Layout>
            <Automotive />
          </Layout>
        } />
        <Route path="/soda-blasting/food-processing-equipment" element={
          <Layout>
            <FoodProcessingEquipment />
          </Layout>
        } />
        <Route path="/soda-blasting/fire-and-water-damage-restoration-soda-blasting" element={
          <Layout>
            <FireWaterDamage />
          </Layout>
        } />
        <Route path="/soda-blasting/airplane-soda-blasting" element={
          <Layout>
            <Aircraft />
          </Layout>
        } />
        <Route path="/soda-blasting/log-home-soda-blasting" element={
          <Layout>
            <LogHomes />
          </Layout>
        } />
        <Route path="/soda-blasting/boat-and-marine-soda-blasting" element={
          <Layout>
            <BoatMarine />
          </Layout>
        } />
        <Route path="/soda-blasting/commercial-industrial" element={
          <Layout>
            <CommercialIndustrial />
          </Layout>
        } />
      </Routes>
    </Router>
    </HelmetProvider>
  );
}

export default App;
