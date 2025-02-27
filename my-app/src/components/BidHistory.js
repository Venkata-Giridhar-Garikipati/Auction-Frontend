import React, { useEffect, useState } from 'react';
import { FaUser, FaCrown } from 'react-icons/fa';

const BidHistory = ({ auctionId }) => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/bids/auction/${auctionId}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setBids(data.data.sort((a, b) => b.amount - a.amount));
        } else {
          console.error('Error fetching bids:', data);
        }
      })
      .catch(error => console.error('Error fetching bids:', error));
  }, [auctionId]);

  return (
    <div className="mt-4">
      <h4 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent inline-block">
        Bid History
      </h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bidder
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bids.map((bid, index) => (
              <tr key={bid.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-theme-gradient rounded-full flex items-center justify-center text-white">
                      {index === 0 ? (
                        <FaCrown className="text-yellow-300" />
                      ) : (
                        <FaUser />
                      )}
                    </div>
                    <span className="ml-2 font-medium text-gray-700">{bid.createdBy}</span>
                  </div>
                </td>
                <td className="py-4 px-4 font-semibold text-primary-600">
                  ${bid.amount}
                </td>
                <td className="py-4 px-4 text-gray-500">
                  {new Date(bid.createdAt).toLocaleString()}
                </td>
                <td className="py-4 px-4">
                  {index === 0 ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-50 text-success-600">
                      Highest Bid
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-danger-50 text-danger-600">
                      Outbid
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bids.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No bids yet. Be the first to bid!
          </div>
        )}
      </div>
    </div>
  );
};

export default BidHistory;
