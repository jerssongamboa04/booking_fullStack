import React, { useEffect, useState } from 'react';
import { fetchData } from '../Utilies/Utilies';
import CardDescription from '../Components/CardDescription';
import Alert from '../Components/Alert';
import CheckMessage from '../Components/CheckMessage';


export const Rooms = () => {

    const [rooms, setRooms] = useState();
    const [error, setError] = useState();
    const [newRoom, setNewRoom] = useState();
    const [check, setCheck] = useState();
    const [user_id] = useState();


    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsData = await fetchData('https://bookin-app-api.vercel.app/rooms');
                const rooms = roomsData.result;

                setRooms(rooms);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        // Si el tipo de campo es checkbox, actualiza el estado con el valor booleano en lugar del texto
        if (type === 'checkbox') {
            setNewRoom((prevRooms) => ({
                ...prevRooms,
                [name]: checked,
            }));
        } else {
            // Si no es un checkbox, actualiza el estado normalmente con el valor del campo de texto
            setNewRoom((prevRooms) => ({
                ...prevRooms,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setCheck('');
        try {
            const response = await fetch('https://bookin-app-api.vercel.app/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        name: newRoom.name,
                        tv: newRoom.tv,
                        air_conditioning: newRoom.air,
                        description: newRoom.description,
                        images: newRoom.images
                    }),
            });

            if (response.ok) {
                setCheck('Su habitacion fue creada');
                event.target.reset();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);

            } else {
                throw new Error('Error al registrarse');
            }
        } catch (error) {
            setError(error.message);
        }
    };



    return (
        <section className=" flex flex-col items-center justify-center mb-20">
            <h1 className="my-6 font-bold text-5xl ">Rooms</h1>
            {rooms ? (
                <div className="flex  flex-wrap items-center justify-center ">
                    {rooms &&
                        rooms.map((room, i) => {

                            const uppercaseName = room.name.toUpperCase();

                            return (
                                <CardDescription user_id={user_id} room_id={room.room_id} name={uppercaseName} images={room.images} description={room.description} tv={room.tv} air_conditioning={room.air_conditioning} key={i} />
                            )
                        })
                    }
                </div>

            ) : (<div className='m-6'>
                <strong>Loading...</strong>
                <div
                    className="ml-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"></div>
            </div>)}
            <hr className="border-gray-300 my-4 w-full" />
            <h1 className='m-0'>or</h1>
            {error && <Alert message={error} />}
            {check && <CheckMessage message={check} />}
            <form onSubmit={handleSubmit} className="pb-12 my-8 w-3/6 bg-white flex flex-col border rounded-2xl px-20 shadow-[rgba(0,0,0,0.1)0_4px_12px] gap-2">

                <h1 className="m-2 font-bold text-4xl p-4">Create and customize your room reservation!</h1>

                <div className="flex flex-col my-4 text-start">
                    <input required placeholder='Name'
                        className="border rounded p-2"
                        type="text"
                        name="name"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col my-4 text-start focus:outline-none focus:shadow-outline">
                    <input required placeholder='description'
                        className="border rounded p-2"
                        type="text"
                        name="description"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col my-4 text-start focus:outline-none focus:shadow-outline">
                    <input required placeholder='Add a room image URL!'
                        className="border rounded p-2"
                        type="text"
                        name="images"
                        onChange={handleChange}
                    />
                </div>
                <div className='flex justify-around'>
                    <div className="flex flex-col my-4 text-start focus:outline-none focus:shadow-outline">
                        <input
                            type="checkbox"
                            name="tv"
                            value="Has TV"
                            onChange={handleChange}
                        />
                        <label htmlFor="tv">Whit TV?</label>
                    </div>

                    <div className="flex flex-col my-4 text-start focus:outline-none focus:shadow-outline">
                        <input
                            type="checkbox"
                            name="air_conditioning"
                            value="Has Air Conditioning"
                            onChange={handleChange}
                        />
                        <label htmlFor="air_conditioning">Whit Air Conditioning?</label>
                    </div>
                </div>

                <div className="flex justify-center items-center flex-col">
                    <button className="m-4 text-white mb-2 bg-black border rounded px-12 py-2 hover:bg-[#003B95]" type="submit">Create Rooms</button>
                </div>
            </form>
        </section>
    )
}
export default Rooms;