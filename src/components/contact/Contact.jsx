'use client'
import Reac, { useEffect, useState } from 'react';
import MazarInfo from './MazarInfo';
import FormPage from './FormPage';
import img1 from '/public/images/shake.png'


export default function Contact() {

    let [lang, setLang] = useState('en');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Define the headers with the selected language
            setLang(localStorage.getItem('lang') || 'en');
        }
    }, []);
    return (
        <div className='book-main-page' id='contact' style={{ backgroundImage: `url(${img1.src})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
            <div className="overlay">
                <div className="container m-auto">
                    <h2 className='h2-form-contact'>{lang === 'en' ? 'Let’s work together' : 'አብረን እንስራ'}</h2>
                    <p className='p-form-contact'>{lang == 'en' ? "Let's discuss how we can support your Travrls and ummrah services" : "የጉዞ እና የዑምራ አገልግሎቶችን እንዴት መደገፍ እንደምንችል እንወያይ"}</p>
                    <div className="book-cont">
                        <MazarInfo></MazarInfo>
                        <FormPage lang={lang}></FormPage>
                    </div>
                </div>
            </div>
        </div>
    );
}
