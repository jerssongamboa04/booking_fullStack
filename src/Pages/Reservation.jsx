import React, { useEffect, useState } from 'react';
import { fetchData } from '../Utilies/Utilies';

const Reservation = () => {
    const [reservations, setReservations] = useState([]);
    console.log(reservations);

    useEffect(() => {
        fetchData('http://localhost:8000/reservations')
            .then(async (res) => {
                const data = await res.result;
                if (data) {
                    setReservations(data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `Dia reserva ${day}/${month}/${year} Hora: ${hours}:${minutes}`;
    };

    return (
        <section>
            <h2 className="my-6 [text-shadow:_2px_4px_3px_rgba(0,0,0,0.3)] text-5xl">Reservations</h2>
            <div className="flex my-12 flex-wrap">
                {reservations.map((reservation, i) => {
                    const formattedStartDate = formatDate(reservation.time_start);
                    const formattedEndDate = formatDate(reservation.time_end);

                    return (
                        <div key={i} className="bg-red-200 text-center p-6 rounded-lg m-5 border-solid border-[1px] border-[#e3ded7] shadow-[rgba(0,0,0,0.1)0_4px_12px] transition ease-in-out delay-250 hover:shadow-[rgba(0,0,0,0.35)_0_5px_15px] hover:bg-[#e4dfd8]">
                            <h1>{reservation.reservation_id}</h1>
                            <h2>{reservation.user_id}</h2>
                            <h2>{reservation.room_id}</h2>
                            <h2>{formattedStartDate}</h2>
                            <h2>{formattedEndDate}</h2>
                        </div>
                    );
                })}
            </div>
            <hr className="border-gray-300 my-4 w-full" />
        </section>
    );
};

export default Reservation;
