import React from 'react';
import Header from '../../components/header';
import SectionHome from '../../components/sectionHome/sectionHome';
import BodySection from '../../components/bodySection/bodySection';
import Footer from '../../components/footer/footer';

export default function Home() {
  return (
   <div>
    <SectionHome/>
    <BodySection/>
   </div>
  );
}

