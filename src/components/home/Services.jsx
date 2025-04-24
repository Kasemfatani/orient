'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from 'next/link';
import Loading from '@/app/loading';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
export default function About() {
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
        axios.get(`${API_BASE_URL}/landing/home/services`, { headers: headers, }).then(response => {
            setData(response.data.data);  // Set the response data to state
            setLoading(false);  // Set loading to false
        })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, []);  // Run this effect whenever the `language` changes
    console.log(data);

    return (
        <div className="about" >
            {
                loading ? <Loading /> :
                    <div className="container m-auto" id='services'>
                        <h2>{lang == 'en' ? 'Our Services' : 'አገልግሎቶች'}</h2>
                        <h3>{lang == 'en' ? "We offer a wide range of services to meet your needs" : "ፍላጎቶችዎን ለማሟላት ሰፋ ያሉ አገልግሎቶችን እናቀርባለን።"}</h3>
                        <div className="services-conr">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={32}
                                autoplay={true}
                                loop={true}
                                modules={[Autoplay, Navigation, Pagination]}
                                breakpoints={{
                                    1400: {
                                        slidesPerView: 3,
                                    },
                                    1100: {
                                        slidesPerView: 3,
                                    },
                                    767: {
                                        slidesPerView: 2.5,
                                    },
                                    640: {
                                        slidesPerView: 1.5,
                                        autoplay: false,
                                        spaceBetween: 16
                                    },
                                    100: {
                                        slidesPerView: 1,
                                        autoplay: false,
                                        spaceBetween: 16
                                    }
                                }}
                                className="option"
                            >

                                {data.map((item, index) =>
                                    <SwiperSlide key={index}>
                                        <Link
                                            href={`/service?id=${item.id}`}
                                            className="option" key={index}
                                        >
                                            <div className="img-cont">
                                                <Image src={item.cover} width={200} height={200} alt="Orient"></Image>
                                            </div>
                                            <div className="text">
                                                <h2>{item.title}</h2>
                                                <p>{item.description}</p>
                                                <div className="btn"><span>Read More </span> <i className="fa-solid fa-chevron-right"></i></div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )}
                            </Swiper>

                        </div>
                    </div>
            }
        </div>
    )
}
