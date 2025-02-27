import React, { useState, useEffect } from 'react';
import AuctionListItem from './AuctionListItem';
import './AuctionsList.css';

const AuctionsList = () => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/auctions')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.data)) {
                    setAuctions(data.data);
                } else {
                    console.error('Error fetching auctions:', data);
                }
            })
            .catch(error => console.error('Error fetching auctions:', error));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map(auction => (
                <AuctionListItem key={auction.id} auction={auction} />
            ))}
        </div>
    );
};

export default AuctionsList;
