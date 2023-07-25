import React, { useState, useEffect, useContext } from 'react';
import CheckMessage from './CheckMessage';
import { fetchData } from '../Utilies/Utilies';
import { Link } from 'react-router-dom';


const RoomsId = () => {
    const [user_id, setUser_id] = useState();
    const [reservationsId, setReservationsId] = useState([]);
    const [emailLocal, setEmailLocal] = useState('');
    const [usersEmail, setUsersEmail] = useState([]);

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('emailUser');
        if (storedEmail) {
            setEmailLocal(storedEmail.toLowerCase());
        }
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersResponse = await fetchData("http://localhost:8000/users");
                if (usersResponse && usersResponse.result) {
                    const usersData = usersResponse.result;
                    setUsersEmail(usersData);
                } else {
                    console.error('Error fetching users:', usersResponse);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const compareEmail = emailLocal && usersEmail.find((user) => user.email === emailLocal);

        if (compareEmail) {
            setUser_id(compareEmail.user_id);
        }
    }, [emailLocal, usersEmail]);

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
        return `Dia reserva ${day}/${month}/${year} Hora: ${hours}:${minutes}`;
    };

    return (
        <section>
            <hr className="border-gray-300 my-4 w-full" />
            {reservationsId.length === 0 ? (
                <div className='p-4'>No Tienes Reservas, <Link to='/rooms'><button className='text-blue-900 font-bold p-1 hover:text-black hover:bg-blue-500 hover:rounded-lg hover:p-1

                '>Comienza Ya!</button></Link></div>
            ) : (

                <div>
                    <h1 className="my-2 font-bold text-xl">Your Reservations</h1>
                    <div className="flex flex-wrap items-center justify-center">

                        {reservationsId.map((reservation, i) => {
                            const formattedStartDate = formatDate(reservation.time_start);
                            const formattedEndDate = formatDate(reservation.time_end);

                            return (
                                <div key={i} className="bg-red-200 text-center p-6 rounded-lg m-5 border-solid border-[1px] border-[#e3ded7] shadow-[rgba(0,0,0,0.1)0_4px_12px] transition ease-in-out delay-250 hover:shadow-[rgba(0,0,0,0.35)_0_5px_15px] hover:bg-[#e4dfd8]">
                                    <h1>{reservation.reservation_id}</h1>
                                    <h2>{reservation.user_id}</h2>
                                    <h2>{reservation.room_id}</h2>
                                    <h2>{formattedStartDate}</h2>
                                    <h2>{formattedEndDate}</h2>
                                    <button className="m-2 border rounded px-12 py-2 hover:bg-[#003B95] hover:scale-105 transition ease-in-out delay-250 bg-[#006CE6] text-white" >
                                        DELETE
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
            <hr className="border-gray-300 my-4 w-full" />
        </section>
    );
};

export default RoomsId;
