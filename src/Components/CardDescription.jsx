import React, { useState, useEffect } from 'react';
import CheckMessage from './CheckMessage';
import { fetchData } from "../Utilies/Utilies";

const CardDescription = ({ room_id, name, images, description, tv, air_conditioning }) => {

    const [check, setCheck] = useState();
    const [user_id, setUser_id] = useState('');
    const [usersEmail, setUsersEmail] = useState([]);
    const [emailUser, setEmailUser] = useState();


    useEffect(() => {
        const storedEmail = sessionStorage.getItem('emailUser');
        if (storedEmail) {
            setEmailUser(storedEmail.toLowerCase());
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
        const compareEmail = usersEmail && usersEmail.find((user) => user.email === emailUser);

        if (compareEmail) {
            setUser_id(compareEmail.user_id);
        }
    }, [emailUser, usersEmail]);

    const handleReserve = async () => {

        try {
            const response = await fetch('http://localhost:8000/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user_id,
                    room_id: room_id,
                    time_start: new Date().toISOString(),
                    time_end: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                setCheck('The room was booked');

            } else {
                throw new Error('Error creating the reservation');
            }
        } catch (error) {
            console.error('Error creating the reservation:', error);
        }
    };

    return (
        <div className="h-[600px] w-[300px] flex flex-col items-center justify-center p-8 rounded-lg m-5 border-solid border-[1px] border-[#e3ded7] shadow-[rgba(0,0,0,0.1)0_4px_12px] transition ease-in-out delay-250 hover:shadow-[rgba(0,0,0,0.35)_0_5px_15px] hover:bg-[#e4dfd8]">
            {check && <CheckMessage message={check} />}
            <div className="w-60 h-auto">
                <img className="w-full h-full object-cover" src={images} alt={name} />
            </div>
            <h1 className="my-2 font-bold text-xl">{name}</h1>
            <p className="my-2">{tv ? 'TV' : 'N/A'}</p>
            <p className="my-2">{air_conditioning ? 'Air Conditioning' : 'N/A'}</p>
            <small className="my-2 p-1">{description}</small>
            <button className="border rounded px-12 py-2 hover:bg-[#003B95] hover:scale-105 transition ease-in-out delay-250 bg-[#006CE6] text-white" onClick={handleReserve}>
                RESERVE
            </button>
        </div>
    );
};

export default CardDescription;
