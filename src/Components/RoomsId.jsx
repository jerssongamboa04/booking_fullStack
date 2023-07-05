import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/AuthContext';
import CheckMessage from './CheckMessage';

const RoomsId = () => {

    const [user_id, setUser_id] = useContext(UserContext);
    const [roomsId, setRoomsId] = useState([]);
    const [check, setCheck] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/rooms/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });

                if (response.ok) {
                    setRoomsId(response);
                } else {
                    throw new Error('Error al obtener los datos de las habitaciones');
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchData();
    }, [user_id]);


    return (

        <section>
            <hr className="border-gray-300 my-4 w-full" />
            <div className="flex  flex-wrap items-center justify-center ">
                {roomsId &&
                    roomsId.map((room, i) => {
                        return (
                            <div className="h-[600px] w-[300px] flex flex-col items-center justify-center p-8 rounded-lg m-5 border-solid border-[1px] border-[#e3ded7] shadow-[rgba(0,0,0,0.1)0_4px_12px] transition ease-in-out delay-250 hover:shadow-[rgba(0,0,0,0.35)_0_5px_15px] hover:bg-[#e4dfd8]">
                                {CheckMessage && <CheckMessage message={check} />}
                                <div className="w-60 h-auto">
                                    <img className="w-full h-full object-cover" src={room.images} alt={room.name} />
                                </div>
                                <h1 className="my-2 font-bold text-xl">{room.name}</h1>
                                <p className="my-2">{room.tv ? 'TV' : 'N/A'}</p>
                                <p className="my-2">{room.air_conditioning ? 'Air Conditioning' : 'N/A'}</p>
                                <small className="my-2 p-1">{room.description}</small>
                                <button className="border rounded px-12 py-2 hover:bg-[#003B95] hover:scale-105 transition ease-in-out delay-250 bg-[#006CE6] text-white">
                                    ELIMINAR
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <hr className="border-gray-300 my-4 w-full" />

        </section>

    )
}

export default RoomsId;