import React, { useEffect, useState, useRef, useCallback } from 'react';
import { fetchData } from '../Utilies/Utilies';
import { Link } from 'react-router-dom';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';


const Slider = () => {
    const [roomsMedia, setRoomsMedia] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsData = await fetchData('https://bookin-app-api.vercel.app/rooms');
                const rooms = roomsData.result;
                const media = rooms.map((room) => room.images);
                setRoomsMedia(media);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRooms();
    }, []);


   
  const handleOnNextClick = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === roomsMedia.length - 1) {
        return 0; // Si es el último índice, volver al primero
      } else {
        return prevIndex + 1; // Incrementar el índice normalmente
      }
    });
  }, [roomsMedia.length]);

    const handleOnPrevClick = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === 0) {
                return roomsMedia.length - 1; // Si es el primer índice, ir al último
            } else {
                return prevIndex - 1; // Decrementar el índice normalmente
            }
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleOnNextClick();
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, [roomsMedia , handleOnNextClick]);

    return (
        <section> 
            {roomsMedia.length > 0 ? (
                <div ref={slideRef} className=' select-none relative p-2'>
                    <p className='text-lg font-semibold'>Best Rooms</p>
                    <div className=' flex justify-center items-center p-2'>
                        <Link to='/rooms'>
                            <img
                                className={`w-100 h-72 rounded-lg  object-cover shadow-[rgba(0,0,0,0.1)0_4px_12px] ${slideRef.current && currentIndex === 0 ? 'fade-in' : 'fade-out'}`}
                                src={roomsMedia[currentIndex]}
                                alt='img'
                            />
                        </Link>
                    </div>

                    <div className='absolute w-full top-1/2 transform -translate-y-1/2 px3 flex justify-between items-center'>
                        <button className='px-48' onClick={handleOnPrevClick}>
                            <FaAngleLeft style={{ fontSize: '32px' }} />
                        </button>
                        <button className='px-52' onClick={handleOnNextClick}>
                            <FaAngleRight style={{ fontSize: '32px' }} />
                        </button>
                    </div>
                </div>
            ) : (<div className='m-6'>
                    <strong>Loading...</strong>
                    <div
                        className="ml-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"></div>
                </div>
                )}
        </section>
    );
};

export default Slider;
