'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { API_BASE_URL } from '@/lib/apiConfig'
import Loading from '@/app/loading'

export default function BlogsGrid() {

    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);
    const [lang, setLang] = useState('en');
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
        axios.get(`${API_BASE_URL}/landing/home/blogs`, { headers: headers, }).then(response => {
            setData(response.data.data);  // Set the response data to state
            setLoading(false);  // Set loading to false
        })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, []);  // Run this effect whenever the `language` changes


    return (
        <div className="news brief">
            {
                loading ? <Loading /> :
                    <div className="container m-auto">
                        <div className="latest">
                            <h2>Take a look on our Blogs</h2>
                            <div className="news-cont">

                                {
                                    data.map((item, index) => (
                                        <div className="news" key={index}>
                                            <Image src={item.cover} alt="Mazar" width={200} height={200} />
                                            <div className="news-data">
                                                <div className="text">
                                                    <h3>{item.title}</h3>
                                                    <p>{item.description}</p>
                                                </div>
                                                <a href="/blog?id=1">
                                                    <div className="arrow">
                                                        <i className="fa-solid fa-chevron-right"></i>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
