import React, { useState, useEffect, useContext } from 'react';
import { fetchData } from '../Utilies/Utilies';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/AuthContext';


const RoomsId = () => {
    const { user_id} = useContext(UserContext);
    const [reservationsId, setReservationsId] = useState([]);
   
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsResponse = await fetchData(`http://localhost:8000/reservations/user/${user_id}`);
                if (roomsResponse && roomsResponse.result) {
                    const roomsData = roomsResponse.result;
                    setReservationsId(roomsData);
                } else {
                    console.error('Error fetching rooms:', roomsResponse);
                }
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        if (user_id) {
            fetchRooms();
        }
    }, [user_id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `Dia de reserva: ${day}/${month}/${year} Hora: ${hours}:${minutes}`;
    };


    // FUNCION DELETE RESERVATION

    const deleteReservation = async (reservation_id) => {
        console.log(reservation_id);
        try {
            const response = await fetchData(`http://localhost:8000/reservations/delete/${reservation_id}`, {
                method: 'DELETE',
            });

            if (response) {
                setReservationsId(prevReservations => prevReservations.filter(reservation => reservation.reservation_id !== reservation_id));
                console.log("Delete reservation");
            } else {
                console.error('Error delete reservation', response);
            }
        } catch (error) {
            console.error('Error delete reservation:', error);
        }
    };




    return (
        <section className='mb-20'>
            <hr className="border-gray-300 my-4 w-full" />
            {reservationsId.length === 0 ? (
                <div className='p-4'>No Tienes Reservas, <Link to='/rooms'><button className='text-blue-900 font-bold p-1 hover:text-black hover:bg-blue-500 hover:rounded-lg hover:p-1

                '>Comienza Ya!</button></Link></div>
            ) : (

                <div>
                    <h1 className="my-2 font-bold text-xl">Your Reservations</h1>
                    <div className="flex flex-wrap items-center justify-center">

                        {reservationsId.map((reservation, i) => {
                            const formattedStartDate = formatDate(reservation.reservation_day);

                            return (
                                <div key={i} className=" text-center p-6 rounded-lg m-5 border-solid border-[1px] border-[#e3ded7] shadow-[rgba(0,0,0,0.1)0_4px_12px] transition ease-in-out delay-250 hover:shadow-[rgba(0,0,0,0.35)_0_5px_15px] hover:bg-slate-100">
                                    <h2 className='font-semibold'>Nº RESERVATION: </h2>
                                    <h2 className="font-semibold w-full border-b-2 border-neutral-200 border-opacity-100 px-6 py-3 dark:border-opacity-50">{reservation.reservation_id}</h2>
                                    <h2 className="font-semibold w-full border-b-2 border-neutral-200 border-opacity-100 px-6 py-3 dark:border-opacity-50">USER: {reservation.user_id}</h2>
                                    <h2 className=" font-semibold w-full border-b-2 border-neutral-200 border-opacity-100 px-6 py-3 dark:border-opacity-50">ROOM: {reservation.room_id}</h2>
                                    <div className=" font-semibold w-full border-b-2 border-neutral-200 border-opacity-100 px-6 py-3 dark:border-opacity-50">
                                        <h2>START DATE: {reservation.time_start}</h2>
                                        <h2>END DATE: {reservation.time_end}</h2>
                                    </div>
                                    <h2 className="w-full border-b-2 border-neutral-200 border-opacity-200 px-6 py-3 dark:border-opacity-50">{formattedStartDate}</h2>

                                    <button onClick={() => deleteReservation(reservation.reservation_id)} className="m-2 border rounded px-12 py-2 hover:bg-[#003B95] hover:scale-105 transition ease-in-out delay-250 bg-[#006CE6] text-white" >
                                        DELETE
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
};

export default RoomsId;
