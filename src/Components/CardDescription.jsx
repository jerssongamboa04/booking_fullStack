import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const CardDescription = ({ room_id, name, images, description, tv, air_conditioning }) => {

    return (
        <div className="h-[600px] w-[300px] flex flex-col items-center justify-center p-8 rounded-lg m-5 border-solid border-[1px] border-[#e3ded7] shadow-[rgba(0,0,0,0.1)0_4px_12px] transition ease-in-out delay-250 hover:shadow-[rgba(0,0,0,0.35)_0_5px_15px] hover:bg-[#e4dfd8]">
            <div className="w-60 h-auto">
                <img className="w-full h-full object-cover" src={images} alt={name} />
            </div>
            <h1 className="my-2 font-bold text-xl">{name}</h1>
            <p className="my-2">{tv ? 'TV' : 'N/A'}</p>
            <p className="my-2">{air_conditioning ? 'Air Conditioning' : 'N/A'}</p>
            <small className="my-2 p-1">{description}</small>
            <button className="flex items-center gap-1 border rounded px-12 py-2 hover:bg-[#003B95] hover:scale-105 transition ease-in-out delay-250 bg-[#006CE6] text-white" >
                <Link to={`reservations/${room_id}`}>see availability</Link><FaAngleRight />
            </button>
        </div>
    );
};

export default CardDescription;
