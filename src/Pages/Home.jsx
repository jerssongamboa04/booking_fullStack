import React, { useContext } from 'react';
import { UserContext } from '../Context/AuthContext';
import RoomsId from '../Components/RoomsId';
import Slider from '../Components/Slider';


const Home = () => {
    const { user, logout } = useContext(UserContext);

    const handlelogout = async () => {
        await logout()
    }

    return (
        <div>
            <section className='flex justify-between items-center '>
                <h1 className="font-poppins my-4 gap-2 text-black mb-2 border rounded p-2 shadow-[rgba(0,0,0,0.1)0_4px_12px] bg-blue-200 flex justify-center items-center">
                    Welcome {user.displayName}
                    <img className='border rounded-full w-20 h-20' src={user.photoURL} alt={user.displayName} />
                </h1>

                <button onClick={handlelogout} className="my-[0.8rem] mx-[0.4rem text-white mb-2 bg-red-600 border rounded p-2 " type="submit">Logout</button>
            </section>
            <Slider/>
            <RoomsId />
            
        </div>

    )
}

export default Home;