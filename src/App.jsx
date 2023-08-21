import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AuthContext from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Rooms from './Pages/Rooms';
import User from './Pages/User';
import Reservation from './Pages/Reservation';
import ReservaId from './Components/ReservaId';


function App() {
  return (
    <div className="App">
        <AuthContext>
          <Header />
          <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>} />

            <Route path='/rooms' element={
              <ProtectedRoute>
                <Rooms />
              </ProtectedRoute>} />

            <Route path='/user' element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>} />

            <Route path='/reservation' element={
              <ProtectedRoute>
                <Reservation />
              </ProtectedRoute>} />

              <Route path='/rooms/reservations/:id' element={
              <ProtectedRoute>
                <ReservaId/>
              </ProtectedRoute>} />


            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          <Footer />
        </AuthContext>
    </div>

  );
}

export default App;
