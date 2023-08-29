import { Link } from "react-router-dom";
import Layout from './Layout';
import React, { useContext } from 'react';
import { UserContext } from '../Context/AuthContext';

const Header = () => {

    const { user } = useContext(UserContext);

    return (

        <header className=' justify-between flex items-center bg-[#003B95] text-white px-10 py-6'>

            <Link to={user ? '/' : '/login'}>
                <div className="">
                <h1 className="iphone m-0">M25 Space</h1>
                </div>

            </Link>
            <Layout />
        </header>

    )
}

export default Header