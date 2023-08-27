import React, { useState, useEffect } from 'react'
import { fetchData } from '../Utilies/Utilies';


const User = () => {

    const [users, setUsers] = useState();



    useEffect(() => {

        fetchData("https://bookin-app-api.vercel.app/users")
            .then(async (res) => {
                const data = await res.result;
                if (data) {
                    setUsers(data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }, [setUsers]);

    // FUNCION PARA ELIMINAR USUARIOS 

    const deleteUser = async (user_id) => {
        try {
            const response = await fetchData(`https://bookin-app-api.vercel.app/users/delete/${user_id}`, {
                method: 'DELETE',
            });

            if (response) {
                setUsers(prevUsers => prevUsers.filter(users => users.user_id !== user_id));
            } else {
                console.error('Error delete User', response);
            }
        } catch (error) {
            console.error('Error delete User:', error);
        }
    };



    return (
        <section className='min-h-screen'>
            <h2 className="my-6 font-bold text-5xl">Users</h2>
            {users ? ( 
            <div className="flex my-12 flex-wrap">
                {users &&
                    users.map((users, i) => {
                        return (

                            <div key={i} className={" text-center p-6 rounded-lg m-5 border-solid border-[1px] border-[#e3ded7] shadow-[rgba(0,0,0,0.1)0_4px_12px] transition ease-in-out delay-250 hover:shadow-[rgba(0,0,0,0.35)_0_5px_15px] hover:bg-[#e4dfd8]"}>
                                <img
                                    src={users.images}
                                    className="w-32 rounded-full m-3"
                                    alt="Avatar" />
                                <h5 className="mb-2 text-xl font-medium leading-tight">{users.name}</h5>
                                <p className="text-neutral-500 dark:text-neutral-400">{users.user_id}</p>
                                <button onClick={() => deleteUser(users.user_id)} className="m-2 border rounded px-12 py-2 hover:bg-[#003B95] hover:scale-105 transition ease-in-out delay-250 bg-[#006CE6] text-white" >
                                    DELETE
                                </button>
                            </div>
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
        </section>
    )
}

export default User