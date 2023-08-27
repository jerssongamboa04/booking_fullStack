import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { fetchData } from "../Utilies/Utilies";
import CheckMessage from './CheckMessage';
import { UserContext } from '../Context/AuthContext';
import Alert from '../Components/Alert';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from 'date-fns/format'




const ReservaId = () => {
    const { id } = useParams();
    const { user_id } = useContext(UserContext);
    const [roomForId, setRoomForId] = useState()
    const [check, setCheck] = useState();
    const [error, setError] = useState();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsData = await fetchData(`https://bookin-app-api.vercel.app/rooms/${id}`);
                const rooms = roomsData.result;

                setRoomForId(rooms);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRooms();
    }, [id]);


    const handleReserve = async (evento) => {
        evento.preventDefault();

        try {
            const response = await fetch('https://bookin-app-api.vercel.app/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id,
                    room_id: id,
                    time_start: format(startDate, 'dd/MM/yyyy'),
                    time_end: format(endDate, 'dd/MM/yyyy'),
                    reservation_day: new Date().toISOString()

                }),
            });

            if (response.ok) {
                setCheck('The room was booked');
                setTimeout(() => setCheck(''), 3000); // Limpiar mensaje después de 3 segundos


            } else {
                setError('Error creating the reservation');
                setTimeout(() => setError(''), 3000); // Limpiar mensaje después de 3 segundos

            }
        } catch (error) {
            console.error('Error creating the reservation:', error);
        }

    };

    return (

        <section className=" my-20">

            {roomForId ? (
                roomForId.map((room, i) => {
                    const uppercaseName = room.name.toUpperCase();

                    return (
                        <div key={i} className="flex m-4">
                            <div>
                                <img className="w-100 h-72  object-cover rounded-lg" src={room.images} alt={room.name} />
                            </div>
                            <div className="bg-blue-100">
                                <h1 className="font-poppins font-bold text-2xl">{uppercaseName}</h1>
                                <p className="self-center p-4 m-2 ">{room.description}</p>
                                <div className="flex gap-6 items-center justify-center m-4">
                                    <div className="flex items-center gap-2 border border-black rounded-md px-8">
                                        <i className="fa-solid fa-snowflake"></i>
                                        <h2>{room.air_conditioning ? 'Air Conditioning' : 'N/A'}</h2>
                                    </div>
                                    <div className="flex items-center gap-2 border border-black rounded-md px-8">
                                        <i className="fa-solid fa-tv"></i>
                                        <h2>{room.tv ? 'TV' : 'N/A'}</h2>
                                    </div>
                                </div>
                            </div>

                        </div>

                    )
                })
            ) : (<div className='m-6'>
                <strong>Loading...</strong>
                <div
                    className="ml-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"></div>
            </div>
            )}
            <hr className="border-gray-300 my-6 w-full" />

            <section className="flex flex-col justify-center items-center">
                <form className=" w-3/6 bg-white flex flex-col border rounded-2xl px-20 py-4 shadow-[rgba(0,0,0,0.1)0_4px_12px] gap-3 justify-center items-center">
                    <h1 className="font-poppins font-bold">YOU RESERVATION</h1>
                    {check && <CheckMessage message={check} />}
                    {error && <Alert message={error} />}

                    <div className=" justify-center items-center flex flex-col gap-2">
                        <h2 className="mr-24">START DATE</h2>
                        <DatePicker
                            selected={startDate}
                            className="border rounded border-gray-800 p-1"
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </div>

                    <div className=" justify-center items-center flex flex-col gap-2">
                        <h2 className="mr-24">END DATE</h2>
                        <DatePicker
                            className="border rounded border-gray-800 p-1"
                            selected={endDate}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </div>

                    <button onClick={handleReserve}
                        className=" m-4 text-white mb-2 bg-black border rounded-3xl px-6 py-2 hover:bg-[#003B95]"
                        type="submit">
                        RESERVE NOW!
                    </button>

                </form>

            </section>

        </section>

    )
}

export default ReservaId;