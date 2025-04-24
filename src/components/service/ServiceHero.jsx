import React from 'react'; // Importing React to use JSX syntax and create components.


export default function ServiceHero({data}) { // Defining the main functional component named 'Footer'.
console.log(data);

    return (
        <section className="ServiceHero" style={{ backgroundImage: `url(${data.cover})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
            <div className="overlay">
                <div className="container">
                    <div className="details">
                        <h2>{data.title}</h2>
                    </div>
                </div>
            </div>
        </section>
    )
}
