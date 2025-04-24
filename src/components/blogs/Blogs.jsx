'use client'
import React, { useEffect, useState } from 'react'
import img1 from '/public/images/detservices/nn.jpg'
import BloggGrid from './BlogsGrid'
import ServiceTop from '../service/ServiceTop'

export default function Advant() {
    const [lang, setLang] = useState('en')
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
    })
    return (
        <div className="blogs-main-page">
            <ServiceTop img={img1} title="Our Blogs" />
            <BloggGrid />
        </div>
    )
}
