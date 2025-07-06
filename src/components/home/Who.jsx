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
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

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
    }, []);

    useEffect(() => {
        setLoading(true);
        const headers = {
            lang: lang,
        };
        
        axios.get(`${API_BASE_URL}/landing/home/about`, { headers })
            .then(response => {
                if (response.data && response.data.data) {
                    setData(response.data.data);
                } else {
                    setError('No data available');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message || 'Failed to fetch data');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [lang]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="container m-auto py-10 text-center text-red-500">{error}</div>;
    }

    if (!data) {
        return <div className="container m-auto py-10 text-center">No data available</div>;
    }

    return (
        <section className="hero-main why" id="about">
            <div className="container m-auto">
                {data.about && (
                    <div className="hero-about">
                        <motion.div
                            initial={{ opacity: 0, x: 200 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                type: 'spring',
                                bounce: 0.2,
                                duration: 0.5,
                            }}
                            viewport={{ once: true }}
                            className="r-side"
                        >
                            {data.about.image && (
                                <div className="img-cont">
                                    <Image 
                                        src={data.about.image} 
                                        width={500} 
                                        height={500} 
                                        alt="Orient" 
                                        className="img-hero" 
                                    />
                                </div>
                            )}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -200 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                type: 'spring',
                                bounce: 0.2,
                                duration: 0.5,
                            }}
                            viewport={{ once: true }}
                            className="l-side"
                        >
                            {data.about.title && <h3 className="sec-title">{data.about.title}</h3>}
                            {data.about.description && <p className="who-p text-left">{data.about.description}</p>}
                            {data.about.profile_file && (
                                <a 
                                    href={data.about.profile_file} 
                                    className="btn" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    {lang === 'en' ? 'Download our brochure' : 'ዝርዝር አስተዳደር'}
                                </a>
                            )}
                        </motion.div>
                    </div>
                )}
            </div>

            {data.partners && data.partners.length > 0 && (
                <div className="partenerss">
                    <div className="parts-cont">
                        <div className="partss" style={{ direction: 'ltr' }}>
                            <div className="relative flex w-full flex-col items-center gap-2 justify-center overflow-hidden">
                                <Marquee pauseOnHover className="[--duration:20s]">
                                    {data.partners.map((review, index) => (
                                        <figure className={cn()} key={index}>
                                            <div className="part-cont">
                                                <Image src={review} alt="Orient" width={200} height={200} />
                                            </div>
                                        </figure>
                                    ))}
                                </Marquee>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {data.counters && data.counters.length > 0 && (
                <div className="container m-auto">
                    <div className="parteners">
                        <div className="nums">
                            <div className="numbers-cont">
                                {data.counters.map((item, index) => (
                                    <motion.div
                                        initial={{ y: 100, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{
                                            type: 'spring',
                                            bounce: 0.5,
                                            duration: index * 0.5,
                                        }}
                                        viewport={{ once: true }}
                                        className="number"
                                        key={index}
                                    >
                                        {item.title && <h2>{item.title}</h2>}
                                        <div className="needed">
                                            <NumberTicker value={Number(item.counter) > 1000000 ? Number(item.counter) / 1000000 : Number(item.counter)} /> 
                                            {Number(item.counter) > 1000000 ? 'Million' : ''} +
                                        </div>
                                        {item.description && <p>{item.description}</p>}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}