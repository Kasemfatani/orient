import React from 'react';
import Hero from '../components/home/Hero';
import Who from '../components/home/Who';
import Vision from '../components/home/Vision';
import Services from '../components/home/Services';
import Contact from '../components/contact/Contact';
// import Contact from '../../components/contact/Contact';

export default function Home() {
  
  return (
    <main>
      <Hero/>
      <Who/>
      <Vision/>
      <Services/>
      <Contact />
    </main>
  );
}
