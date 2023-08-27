import Button from '../Components/Button';
import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Alert from '../Components/Alert';

const Register = () => {

    const { user, setUser, signup } = useContext(UserContext);
    const navigate = useNavigate();
    const [error, setError] = useState();


    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await signup(user.email, user.password);

            const response = await fetch('https://bookin-app-api.vercel.app/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    images: `https://api.dicebear.com/6.x/micah/svg?seed=${user.name}`
                }),
            });

            if (response.ok) {
                navigate('/');
            } else {
                throw new Error('Error al registrarse');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center flex-col ">
            {error && <Alert message={error} />}
            <form onSubmit={handleSubmit} className="bg-white flex flex-col border rounded-2xl px-20 py-10 shadow-[rgba(0,0,0,0.1)0_4px_12px]">

                <h1 className="font-bold text-4xl m-0 p-8">REGISTER</h1>

                <div className="flex flex-col my-[0.8rem] mx-[0.4rem] text-start gap-2">
                    <input required placeholder='Name'
                        className="border rounded p-1"
                        type="text"
                        name="name"
                        onChange={handleChange}

                    />
                </div>

                <div className="flex flex-col my-[0.8rem] mx-[0.4rem] text-start gap-2">
                    <input required placeholder='Email'
                        className="border rounded p-1"
                        type="email"
                        name="email"
                        onChange={handleChange}

                    />
                </div>

                <div className="flex flex-col my-[0.8rem] mx-[0.4rem] text-start gap-2">
                    <input required placeholder='Password'
                        className="border rounded p-1"
                        type="password"
                        name="password"
                        onChange={handleChange}

                    />
                </div>
                <div className="flex justify-center">
                    <button className="m-4 text-white mb-2 bg-black border rounded px-12 py-2 hover:bg-[#003B95]" type="submit">Register</button>
                </div>
            </form>
            <Button url={user ? '/' : '/login'} content={!user ? 'Ya tienes cuenta? Inicia sesion' : 'No tienes cuenta? Registrate'} className={'text-white bg-[#1f1815] m-6 p-4 px-10 border rounded'} />
        </div>
    )
}

export default Register;