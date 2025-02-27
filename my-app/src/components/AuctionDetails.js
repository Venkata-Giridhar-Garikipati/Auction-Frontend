import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import AuctionImage from './AuctionImage';
import BidHistory from './BidHistory';
import { FaClock, FaGavel, FaArrowLeft } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
//import { useNotifications } from '../context/NotificationContext';

const AuctionDetails = () => {
  const { auctionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  //const { addNotification } = useNotifications();
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [auctionResponse, bidsResponse] = await Promise.all([
          fetch(`http://localhost:8080/auctions/${auctionId}`),
          fetch(`http://localhost:8080/bids/auction/${auctionId}`)
        ]);

        const auctionData = await auctionResponse.json();
        const bidsData = await bidsResponse.json();

        if (auctionData.data) {
          setAuction(auctionData.data);
        }
        if (Array.isArray(bidsData.data)) {
          setBids(bidsData.data);
        }
      } catch (error) {
        toast.error('Error loading auction details');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [auctionId]);

  const handleBidAmountChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleCreateBid = async () => {
    if (!user) {
      toast.error('You must be logged in to place a bid');
      navigate('/signin');
      return;
    }

    if (!bidAmount || bidAmount <= 0) {
      toast.error('Please enter a valid bid amount');
      return;
    }

    const currentHighest = getCurrentHighestBid();
    if (parseFloat(bidAmount) <= currentHighest) {
      toast.error(`Bid amount must be higher than $${currentHighest}`);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/bids', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.id,
          auctionId: parseInt(auctionId),
          amount: parseFloat(bidAmount),
          createdBy: `${user.firstName} ${user.lastName}`
        })
      });

      const result = await response.json();

      if (response.ok) {
        setBids([...bids, result.data]);
        setBidAmount(''); // Clear input field
        toast.success('🎉 Bid placed successfully!');
        
        // Refresh bid history
        const bidsResponse = await fetch(`http://localhost:8080/bids/auction/${auctionId}`);
        const bidsData = await bidsResponse.json();
        if (Array.isArray(bidsData.data)) {
          setBids(bidsData.data);
        }

        // Notify auction owner
        // await fetch('http://localhost:8080/notifications', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     userId: auction.userId,
        //     message: `New bid of $${bidAmount} placed on your auction "${auction.title}"`,
        //     type: 'bid'
        //   })
        // });

      //  addNotification(`Your bid of $${bidAmount} has been placed!`, 'success');
      } else {
        toast.error(result.message || 'Error placing bid');
      }
    } catch (error) {
      toast.error('Failed to place bid. Please try again.');
      console.error('Error:', error);
    }
  };

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const endTime = new Date(auction.endDateTime).getTime();
    const timeLeft = endTime - now;
    
    if (timeLeft < 0) return 'Auction Ended';
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m`;
  };

  const getCurrentHighestBid = () => {
    if (bids.length === 0) return auction.basePrice;
    return Math.max(...bids.map(bid => bid.amount));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl text-gray-600 mb-4">Auction not found</p>
        <button
          onClick={() => navigate('/auctions')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" /> Back to Auctions
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-primary-600 mb-4 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Left side - Image */}
            <div className="md:w-1/2 p-6">
              <AuctionImage auctionId={auction.id} />
            </div>

            {/* Right side - Details */}
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {auction.title}
              </h1>
              
              {/* Creator Info Card */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <div className="w-10 h-10 bg-theme-gradient rounded-full flex items-center justify-center text-white font-semibold">
                    {auction.createdBy?.charAt(0) || 'U'}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm text-gray-500">Created by</div>
                    <div className="font-medium text-primary-600">{auction.createdBy}</div>
                  </div>
                </div>
              </div>

              {/* Current Bid & Time Left Card */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500 mb-1 flex items-center">
                      <FaGavel className="mr-2 text-primary-500" />
                      Current Bid
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      ${getCurrentHighestBid()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1 flex items-center">
                      <FaClock className="mr-2 text-secondary-500" />
                      Time Left
                    </div>
                    <div className="text-2xl font-bold text-secondary-600">
                      {calculateTimeLeft()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Description</h2>
                <p className="text-gray-600">{auction.description}</p>
              </div>

              {/* Bid Input */}
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Enter bid amount"
                  value={bidAmount}
                  onChange={handleBidAmountChange}
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button 
                  onClick={handleCreateBid}
                  className="px-6 py-3 bg-theme-gradient text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>

          {/* Bid History Section */}
          <div className="p-6 border-t border-gray-100">
            <BidHistory auctionId={auction.id} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuctionDetails;
