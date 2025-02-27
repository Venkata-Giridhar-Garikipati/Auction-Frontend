import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaGavel } from 'react-icons/fa';
import AuctionImage from './AuctionImage';

const AuctionCard = ({ auction }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/auctions/${auction.id}`);
  };

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const endTime = new Date(auction.endDateTime).getTime();
    const timeLeft = endTime - now;
    
    if (timeLeft < 0) return 'Ended';
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    return `${days} days left`;
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <AuctionImage auctionId={auction.id} />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{auction.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{auction.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-green-600">
            <FaGavel className="mr-2" />
            <span className="font-bold">${auction.basePrice}</span>
          </div>
          <div className="flex items-center text-blue-600">
            <FaClock className="mr-2" />
            <span className="font-bold">{calculateTimeLeft()}</span>
          </div>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default AuctionCard;
