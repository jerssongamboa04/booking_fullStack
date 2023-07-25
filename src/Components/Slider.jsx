import React, { useEffect, useState, useRef } from 'react';
import { fetchData } from '../Utilies/Utilies';
import { Link } from 'react-router-dom';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import next from '../Static/next.png';


const Slider = () => {
    const [roomsData, setRoomsData] = useState([]);
    const [roomsMedia, setRoomsMedia] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsData = await fetchData('http://localhost:8000/rooms');
                const rooms = roomsData.result;
                setRoomsData(rooms);
                const media = rooms.map((room) => room.images);
                setRoomsMedia(media);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRooms();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            handleOnNextClick();
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, [roomsMedia]);

    const handleOnNextClick = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === roomsMedia.length - 1) {
                return 0; // Si es el último índice, volver al primero
            } else {
                return prevIndex + 1; // Incrementar el índice normalmente
            }
        });
    };

    const handleOnPrevClick = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === 0) {
                return roomsMedia.length - 1; // Si es el primer índice, ir al último
            } else {
                return prevIndex - 1; // Decrementar el índice normalmente
            }
        });
    };

    return (
        <section>
            {roomsMedia.length > 0 && (
                <div ref={slideRef} className='w-full select-none relative p-2'>
                    <p className='text-lg font-semibold'>Best Rooms</p>
                    <div className='aspect-w-16 aspect-h-9 flex justify-center items-center p-2'>
                        <Link to='/rooms'>
                            <img
                                className={`rounded-lg shadow-[rgba(0,0,0,0.1)0_4px_12px] ${slideRef.current && currentIndex === 0 ? 'fade-in' : 'fade-out'}`}
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
            )}
        </section>
    );
};

export default Slider;
