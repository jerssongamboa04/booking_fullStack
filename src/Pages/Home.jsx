import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/AuthContext';
import { fetchData } from '../Utilies/Utilies';
import RoomsId from '../Components/RoomsId';
import Slider from '../Components/Slider';


const Home = () => {
    const { user, logout } = useContext(UserContext);

    const { user_id, setUser_id } = useContext(UserContext);
    const [emailLocal, setEmailLocal] = useState('');
    const [usersEmail, setUsersEmail] = useState([]);

    const [userData, setUserData] = useState('');


    const handlelogout = async () => {
        await logout()
    }

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('emailUser');
        if (storedEmail) {
            setEmailLocal(storedEmail.toLowerCase());
        }
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersResponse = await fetchData("https://bookin-app-api.vercel.app/users");
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
        const fetchUser = async () => {
            try {
                const usersResponse = await fetchData(`https://bookin-app-api.vercel.app/users/${user_id}`);
                if (usersResponse && usersResponse.result) {
                    const userData = usersResponse.result;
                    setUserData(userData[0]);
                } else {
                    console.error('Error fetching users:', usersResponse);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUser();
    }, [user_id]);

    return (
        <div className='min-h-screen'>
            <section className=' flex justify-between items-center '>
                <h2 className="font-poppins gap-4 text-black border rounded p-2 shadow-[rgba(0,0,0,0.1)0_4px_12px] bg-blue-200 flex justify-center items-center">
                    Welcome {userData.name}
                    <img className='border rounded-full w-24 h-24' src={userData.images} alt={userData.name} />
                </h2>
                <button onClick={handlelogout} className=" mx-6 text-white bg-red-600 border rounded p-2 " type="submit">Logout</button>
            </section>
            <Slider />
            <RoomsId />

        </div>

    )
}

export default Home;