import React, { useEffect, useState } from 'react';
import { FaImage } from 'react-icons/fa';

const AuctionImage = ({ auctionId }) => {
    const [imageSrc, setImageSrc] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:8080/auctions/${auctionId}/images`)
            .then(response => response.json())
            .then(data => {
                if (data && data.data && data.data.length > 0) {
                    const imageData = data.data[0];
                    if (imageData.filePath) {
                        setImageSrc(`data:image/jpeg;base64,${imageData.filePath}`);
                    }
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching auction image:', error);
                setIsLoading(false);
            });
    }, [auctionId]);

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!imageSrc) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <FaImage className="w-12 h-12 text-gray-400" />
            </div>
        );
    }

    return (
        <img
            src={imageSrc}
            alt="Auction"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
    );
};

export default AuctionImage;