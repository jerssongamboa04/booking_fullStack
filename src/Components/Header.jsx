import { Link } from "react-router-dom";
import Layout from './Layout';
import React, { useContext} from 'react';
import { UserContext } from '../Context/AuthContext';

const Header = () => {

    const { user} = useContext(UserContext);

    return (

        <header className=' justify-between flex items-center bg-[#003B95] text-white text-sm px-10 py-6'>

            <Link to={user ? '/' : '/login'}>
                <div className="flex items-center m-15">
                    <h1 className="font-bold text-4xl">M25 Space</h1>
                </div>
            </Link>
            <Layout />
        </header>

    )
}

export default Header