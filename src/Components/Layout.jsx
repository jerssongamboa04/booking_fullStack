import React, { useContext } from 'react';
import Button from '../Components/Button';
import { UserContext } from '../Context/AuthContext';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const { user } = useContext(UserContext); // Obtén el usuario del contexto

  return (
    <div>
      <nav>
        <ul className='flex gap-8'>
          <li>
            <Button className="text-lg p-2 hover:rounded-xl hover:bg-[#006CE6] hover:px-2" url={'/reservation'} content={'Reservations'} />
          </li>
          <li>
            <Button className="text-lg p-2 hover:rounded-xl hover:bg-[#006CE6] hover:px-2" url={'/rooms'} content={'Rooms'} />
          </li>
          <li>
            <Button className="text-lg p-2 hover:rounded-xl hover:bg-[#006CE6] hover:px-2" url={'/user'} content={'Users'} />
          </li>

          {/* Mostrar los enlaces solo si el usuario no está autenticado */}
          {!user && (
            <>
              <li>
                <Button className="text-lg p-2 hover:rounded-xl hover:bg-[#006CE6] hover:px-2" url={'/login'} content={'Login'} />
              </li>
              <li>
                <Button className="text-lg p-2 hover:rounded-xl hover:bg-[#006CE6] hover:px-2" url={'/register'} content={'Register'} />
              </li>
            </>
          )}

          {/* Mostrar los enlaces de perfil y cierre de sesión solo si el usuario está autenticado */}
          {user && (
            <>
              <li>
                <Button className="text-lg p-2 hover:rounded-xl hover:bg-[#006CE6] hover:px-2" url={'/'} content={'My Home'} />
              </li>
             
            </>
          )}
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
