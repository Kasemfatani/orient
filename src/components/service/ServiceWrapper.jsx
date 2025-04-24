'use client';
import React, { useEffect, useState } from 'react';
import Contact from '../contact/Contact';
import SingleService from '../singleService/SingleService';
import ServiceHero from './ServiceHero';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';

export default function ServiceWrapper() {

    const searchparams = useSearchParams()
    const pathId = searchparams.get('id')
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
        axios.get(`${API_BASE_URL}/landing/home/services/${pathId}`, { headers: headers, }).then(response => {
            setData(response.data.data);  // Set the response data to state
            setLoading(false);  // Set loading to false
        })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false)
            });
    }, []);  // Run this effect whenever the `language` changes

    return (
        <div className="servise" >
            {
                loading ? <Loading /> :
                    <>
                        <ServiceHero data={data} />
                        <SingleService data={data} />
                        <Contact />
                    </>
            }

        </div>
    )
}
