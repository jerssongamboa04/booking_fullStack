import React from 'react';
import Button from '../Components/Button';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav>
        <ul className='flex gap-8'>
          <li>
            <Button className="text-lg p-2 hover:rounded-xl hover:bg-[#006CE6] hover:px-2" url={'/reservation'} content={'Reservation'} />
          </li>
          <li>
            <Button className="text-lg p-2 hover:rounded-xl hover:bg-[#006CE6] hover:px-2" url={'/rooms'} content={'Rooms'} />
          </li>
          <li>
            <Button className="text-lg p-2 hover:rounded-xl hover:bg-[#006CE6] hover:px-2" url={'/user'} content={'Users'} />
          </li>

          <li>
            <Button className="text-lg p-2 hover:rounded-xl hover:bg-[#006CE6] hover:px-2" url={'/login'} content={'Login'} />
          </li>
          <li>
            <Button className="text-lg p-2 hover:rounded-xl hover:bg-[#006CE6] hover:px-2" url={'/register'} content={'Register'} />
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;