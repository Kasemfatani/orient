'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import NumberTicker from '../ui/number-ticker';
import Marquee from '../ui/marquee';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';

export default function Who() {
    const [lang, setLang] = useState('en');
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
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
        axios.get(`${API_BASE_URL}/landing/home/about`, { headers: headers, }).then(response => {
            setData(response.data.data);  // Set the response data to state
            setLoading(false);  // Set loading to false
        })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, [lang]);  // Run this effect whenever the `language` changes


    return (

        <>
            {
                loading ? <Loading></Loading> :
                    <section className={` hero-main why`} id='about'>

                        <div className="container m-auto">
                            <div className="hero-about" >
                                <motion.div
                                    initial={{ opacity: 0, x: 200 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: .5,
                                    }}
                                    viewport={{ once: true }}
                                    className="r-side">
                                    <div className="img-cont">
                                        <Image src={data.about.image} width={500} height={500} alt="Orient" className="img-hero" />
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: -200 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: .5,
                                    }}
                                    viewport={{ once: true }}
                                    className="l-side">
                                    <h3 className='sec-title'>{data.about.title}</h3>
                                    <p className='who-p text-left'>{data.about.description} </p>
                                    {/* تحميل الملف التعريفي */}
                                    <a href={data.about.profile_file} className="btn" target="_blank" rel="noopener noreferrer">
                                        {
                                            lang == 'en' ? 'Download our brochure' : 'ዝርዝር አስተዳደር'
                                        }
                                    </a>
                                </motion.div>
                            </div >
                        </div>
                        <div className="partenerss">
                            {/* <div className="container m-auto">
                <h2>{language === 'en' ? 'Accredited by':'معتمدون لدى'  }</h2>
            </div> */}
                            <div className="parts-cont">
                                <div className="partss" style={{ direction: 'ltr' }}>
                                    <div className="relative flex  w-full flex-col items-center gap-2 justify-center overflow-hidden  ">
                                        <Marquee pauseOnHover className="[--duration:20s] ">
                                            {data.partners.map((review, index) => (
                                                <figure className={cn()} key={index}>
                                                    <div className="part-cont" >
                                                        <Image src={review} alt="Orient" width={200} height={200} />
                                                    </div>
                                                </figure>
                                            ))}
                                        </Marquee>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="container m-auto">

                            <div className="parteners" >
                                <div className="nums">

                                    <div className="numbers-cont">
                                        {
                                            data.counters.map((item, index) =>
                                                <motion.div
                                                    initial={{ y: 100, opacity: 0, }}
                                                    whileInView={{ y: 0, opacity: 1, }}
                                                    transition={{
                                                        type: 'spring',
                                                        bounce: 0.5,
                                                        duration: index * .5,
                                                    }}
                                                    viewport={{ once: true }
                                                    }
                                                    className="number" key={index}>
                                                    <h2>{item.title}</h2>
                                                    <div className="needed">
                                                        {/* <NumberTicker value={item.counter} /> + */}
                                                        <NumberTicker value={Number(item.counter) > 1000000 ? Number(item.counter) / 1000000 : Number(item.counter)} /> {Number(item.counter) > 1000000 ? 'Million' : ''} +
                                                    </div>
                                                    <p >{item.description}</p>
                                                </motion.div>
                                            )
                                        }
                                    </div>

                                </div>
                            </div>
                        </div >

                    </section >
            }
        </>

    )
}