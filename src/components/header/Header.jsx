'use client'
import React, { useState, useEffect } from 'react';
import logo from '/public/images/logo.png';
import global from '/public/global.svg';
import bars from '/public/images/bars.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [opened, setOpened] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);

  function openLinks() {
    setOpened(!opened);
    if (opened) {
      document.querySelector('.herader-overly-content').style.transform = 'translateX(-100%)';
    } else {
      document.querySelector('.herader-overly-content').style.transform = 'translateX(0)';
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


  let [lang, setLang] = useState('en');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('lang') === 'am' || localStorage.getItem('lang') === 'en') {
        setLang(localStorage.getItem('lang'));
        // localStorage.setItem('lang', 'en');
      }
      else {
        localStorage.setItem('lang', 'en');
        setLang('en');
      }
    }
  }, [lang]);

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
            <div className="language" onClick={() => {
              if (lang === 'en') {
                localStorage.setItem('lang', 'am');
                setLang('am');
              } else {
                localStorage.setItem('lang', 'en');
                setLang('en');
              }
              window.location.reload(); // Reloads the page
            }}>
              <Image src={global} alt="orient" className="img-language" />
            </div>
            <div className="bars" onClick={openLinks}>
              <Image src={bars} alt="orient" className="menu-bars" />
            </div>
          </div>
        </div>
      </div>
      <div className="herader-overly-content" style={{ transform: 'translateX(-100%)' }} onClick={openLinks}>
        <div className="links">
          <Link href="/" onClick={openLinks}>Home</Link>
          <Link href="/#about" onClick={openLinks}>About</Link>
          <Link href="/#services" onClick={openLinks}>Services</Link>
          <Link href="/#contact" onClick={openLinks}>Contact US</Link>
          <Link href="/blogs" onClick={openLinks}>Blogs</Link>
        </div>
      </div>
    </div>
  );
}