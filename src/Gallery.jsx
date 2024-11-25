//Task 2 and 3

import React, { useState, useEffect } from 'react';

function Gallery() {
    const [loading, setLoading] = useState(true); 
    const [tours, setTours] = useState([]); 
 

    const notInterested = (id) => {
        setTours((prevTours) => prevTours.filter((tour) => tour.id !== id)) 
    };

    const Expand = (id) => {
        setTours((prevTours) =>
            prevTours.map((tour) =>
                tour.id === id ? { ...tour, expanded: !tour.expanded } : tour 
            )
        );
    };
    useEffect(() => {
        setLoading(true); 
        fetch('https://www.course-api.com/react-tours-project') 
            .then(response => response.json()) 
            .then(data => {
                setTours(data.map((item) => ({ ...item, expanded: false})));  
                setLoading(false);
            })

            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            }
        );
        }, []);

    if (loading) { 
        return <div>Loading...</div>
    }

    return (

        <center>
        <div>
            <h1>Tour Selection</h1>
            <ul>
                {tours.map(tour => (
                    <li key={tour.id}>
                        {tour.name} - ${tour.price}
                    
                        <button onClick={() => Expand(tour.id)}>{tour.expanded ?'Show Less':'View'}</button>
                        {tour.expanded && ( 
                            <>
                                <p>{tour.info}</p>
                                <img src={tour.image}></img>
                            </>
                        )}
                        <button onClick={() => notInterested(tour.id)}>
                            Not Interested</button>
                    </li>
                ))}
                    </ul>
                 </div>
                </center>
    )
}

export default Gallery;