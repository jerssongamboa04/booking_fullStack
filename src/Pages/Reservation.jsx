import React, { useEffect, useState } from 'react';
import { fetchData } from '../Utilies/Utilies';
import { Datepicker, Input, initTE } from "tw-elements";


const Reservation = () => {
    const [reservations, setReservations] = useState([]);

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
    useEffect(() => {
        initTE({ Datepicker, Input });
    }, []);

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
            <div
                class="relative mb-3"
                data-te-datepicker-init
                data-te-input-wrapper-init>
                <input
                    type="text"
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    placeholder="Select a date" />
                <label
                    for="floatingInput"
                    class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >Select a date</label>
                <button
                    data-te-datepicker-toggle-ref
                    data-te-datepicker-toggle-button-ref
                    class="justify-content-center absolute right-0.5 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center border-none bg-transparent outline-none hover:text-primary focus:text-primary dark:text-neutral-200 dark:hover:text-primary-400 dark:focus:text-primary-400 [&>svg]:h-5 [&>svg]:w-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default Reservation;
