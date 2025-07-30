import Image from 'next/image';
import React from 'react'; // Importing React to use JSX syntax and create components.

export default function ServiceTop({ img, title, lang }) { // Defining the main functional component named 'Footer'.

    return (
        <section className="single-page">
            <div className="overlay">
                <div className="container m-auto">
                    <div className="banner">
                        <p className={`p-on-overlay ${lang === "ar" ? "text-right" : ""}`}>{title}</p>
                        <div className="haram-slider slider-content">
                            <Image src={img} alt="Haram" data-aos="zoom-in" width={1000} height={1000} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
