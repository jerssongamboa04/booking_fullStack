import Button from '../Components/Button';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Alert from '../Components/Alert';
import googleLogo from '../Static/google.png';

const Login = () => {

    const { emailUser, setEmailUser } = useContext(UserContext);
    const { user, setUser, login, loginWhitGoogle } = useContext(UserContext);
    const [error, setError] = useState();

    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await login(user.email, user.password);
            setEmailUser(user.email);
            sessionStorage.setItem('emailUser', user.email); // Guardar en sessionStorage
            navigate('/rooms');
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    };

    const handleGoogleSignin = async () => {
        try {
            await loginWhitGoogle();
            navigate("/rooms");

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="flex justify-center items-center flex-col m-12 ">
            {error && <Alert message={error} />}
            <form onSubmit={handleSubmit} className="bg-white flex flex-col border rounded-2xl px-20 py-10 shadow-[rgba(0,0,0,0.1)0_4px_12px]">

                <h1 className="font-bold text-4xl p-4">LOGIN</h1>

                <div className="flex flex-col my-[0.8rem] mx-[0.4rem] text-start gap-2">
                    <input required placeholder='Email'
                        className="border rounded p-1"
                        type="email"
                        name="email"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col my-[0.8rem] mx-[0.4rem] text-start gap-2 focus:outline-none focus:shadow-outline">
                    <input required placeholder='Password'
                        className="border rounded p-1"
                        type="password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex justify-center items-center flex-col">
                    <button className="m-4 text-white mb-2 bg-[#006CE6] border rounded px-12 py-2 hover:bg-[#003B95]" type="submit">Login</button>
                    <hr className="border-gray-300 my-4 w-full" />
                    <button className='text-white bg-[#1f1815] px-2 border rounded flex text-center' onClick={handleGoogleSignin}><img className='w-8 h-8' src={googleLogo} alt="Google" /></button>
                </div>
            </form>
            <Button url={user ? '/' : '/register'} content={user ? 'Ya tienes cuenta? Inicia sesion' : 'No tienes cuenta? Registrate'} className={'text-white bg-[#1f1815] m-6 p-4 px-10 border rounded hover:opacity-80'} />

        </div>
    )
}

export default Login;