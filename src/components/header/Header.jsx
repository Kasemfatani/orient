'use client'
import React, { useState, useEffect, useRef } from 'react';
import logo from '/public/images/logo.png';
import global from '/public/global.svg';
import bars from '/public/images/bars.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [opened, setOpened] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const overlayRef = useRef(null);

  function openLinks() {
    const newOpenedState = !opened;
    setOpened(newOpenedState);
    
    // Use the ref to access the DOM element directly
    if (overlayRef.current) {
      overlayRef.current.style.transform = newOpenedState ? 'translateX(0)' : 'translateX(-100%)';
    }
  }

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) { // Scrolling down
          setShowNav(false);
        } else if (currentScrollY < lastScrollY) { // Scrolling up
          setShowNav(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);


  const [lang, setLang] = useState('en');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('lang');
      if (storedLang === 'am' || storedLang === 'en') {
        setLang(storedLang);
      } else {
        localStorage.setItem('lang', 'en');
        setLang('en');
      }
    }
  }, []); // Remove lang from dependency array to prevent infinite loop

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'am' : 'en';
    localStorage.setItem('lang', newLang);
    setLang(newLang);
    window.location.reload(); // Reloads the page
  };

  return (
    <div className="head-all">
      <div
        className="nav-section"
        style={{
          transform: showNav ? 'scale(1)' : 'scale(0)',
          opacity: showNav ? 1 : 0,
          pointerEvents: showNav ? 'auto' : 'none',
        }}
      >
        <div className="container m-auto">
          <div className="l-side">
            <Link href="/" className="logo">
              <Image src={logo} alt="orient" className="img-logo" />
            </Link>
          </div>
          <div className="r-side">
            <div className="language" onClick={toggleLanguage}>
              <Image src={global} alt="orient" className="img-language" />
            </div>
            <div className="bars" onClick={openLinks}>
              <Image src={bars} alt="orient" className="menu-bars" />
            </div>
          </div>
        </div>
      </div>
      <div 
        ref={overlayRef}
        className="herader-overly-content" 
        style={{ transform: 'translateX(-100%)' }}
      >
        <div className="links">
          <Link href="/" onClick={openLinks}>{lang === 'en' ? 'Home' : 'መነሻ'}</Link>
          <Link href="/#about" onClick={openLinks}>{lang === 'en' ? 'About' : 'ስለኛ'}</Link>
          <Link href="/#services" onClick={openLinks}>{lang === 'en' ? 'Services' : 'አገልግሎቶች'}</Link>
          <Link href="/#contact" onClick={openLinks}>{lang === 'en' ? 'Contact US' : 'ያግኙን'}</Link>
          <Link href="/blogs" onClick={openLinks}>{lang === 'en' ? 'Blogs' : 'ብሎጎች'}</Link>
        </div>
      </div>
    </div>
  );
}
