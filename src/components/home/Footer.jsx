'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'; // Importing React to use JSX syntax and create components.
import logo from '/public/images/logo.png';
import Loading from '@/app/loading';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';

export default function Footer() { // Defining the main functional component named 'Footer'.

    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [lang, setLang] = useState('en');
    const [whatsapp, setWhatsapp] = useState('');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('lang') === 'am' || localStorage.getItem('lang') === 'en') {
                setLang(localStorage.getItem('lang'));
            }
            else {
                localStorage.setItem('lang', 'en');
                setLang('en');
            }
        }
        setLoading(true);
        const headers = {
            lang: lang, // Change language dynamically based on state
        };
        // Fetch data from the API with Axios
        axios.get(`${API_BASE_URL}/landing/home/socials`, { headers: headers, }).then(response => {
            setData(response.data.data);  // Set the response data to state
            for (let i = 0; i < response.data.data.social_media.length; i++) {
                if (response.data.data.social_media[i].type === 'whatsapp') {
                    setWhatsapp(response.data.data.social_media[i].link)
                }
            }
            setLoading(false);  // Set loading to false
        })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, []);  // Run this effect whenever the `language` changes
    return (
        <footer id='footer'> {/* Main footer container with padding and background color */}

            {
                whatsapp ?
                    <Link href={`https://wa.me/${whatsapp}?text=Good%20Morning%20Orient`} target="_blank" className="fixed-what">
                        <i className="fa-brands fa-whatsapp"></i>
                    </Link>
                    : null
            }
            {
                loading ? <Loading /> :
                    <div className="container m-auto" id='footer'>
                        <div className="content">
                            <div className="logo">
                                <Image src={logo} alt="Mazar" width={200} height={200} />
                            </div>
                            <div className="links">
                                <h3>{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h3>
                                <ul>
                                    <li><Link href="/">{lang === 'ar' ? 'الرئيسية' : 'Home'}</Link></li>
                                    <li><Link href="/#about">{lang === 'ar' ? 'من نحن' : 'About Us'}</Link></li>
                                    <li><Link href="/#contact">{lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}</Link></li>
                                </ul>
                            </div>
                            <div className="links">
                                <h3>{lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}</h3>
                                <ul>
                                    <li ><Link href={`tel:${data?.mobile}`} >{data?.mobile}</Link></li>
                                    <li ><Link href={`mailto:${data?.email}`} >{data?.email}</Link></li>
                                    <li ><Link href={"#footer"} className='address'>{data?.address}</Link></li>
                                </ul>
                            </div>
                            <div className="links">
                                <h3>{lang === 'ar' ? 'تابعنا' : 'Follow Us'}</h3>
                                <div className="social">
                                    {
                                        data.social_media.map((social, index) => (

                                            social.link ?
                                                <Link href={social.type === 'whatsapp' ? `https://wa.me/${social.link}` : social.link} target='_blank' key={index}><i className={`fa-brands fa-${social.type}`}></i></Link>
                                                : null
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="served">
                            <i className="fa-regular fa-copyright"></i> {lang === 'ar' ? '2025,جميع الحقوق محفوظة لشركة اورينت الوطنية التجارية' : '2025, All rights reserved to Oriental National Trading Co.'}
                        </div>
                    </div>
            }
        </footer >
    )
}
