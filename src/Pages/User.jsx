import React, { useState, useEffect } from 'react'
import { fetchData } from '../Utilies/Utilies';


const User = () => {

    const [users, setUsers] = useState();

    useEffect(() => {

        fetchData("http://localhost:8000/users")
            .then(async (res) => {
                const data = await res.result;
                if (data) {
                    setUsers(data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    }, [setUsers])
    return (
        <section>
            <h2 className="my-6 [text-shadow:_2px_4px_3px_rgba(0,0,0,0.3)] text-5xl">Users</h2>
            <div className="flex my-12 flex-wrap">
                {users &&
                    users.map((users, i) => {
                        return (

                            <div key={i} className={" text-center p-6 rounded-lg m-5 border-solid border-[1px] border-[#e3ded7] shadow-[rgba(0,0,0,0.1)0_4px_12px] transition ease-in-out delay-250 hover:shadow-[rgba(0,0,0,0.35)_0_5px_15px] hover:bg-[#e4dfd8]"}>
                                <p>{users.user_id}</p>
                                <h1>{users.name}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default User