export const getAuctionDetails = async (auctionId) => {
  try {
    const response = await fetch(`http://localhost:8080/auctions/${auctionId}`);
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      throw new Error(errorData.message || "Failed to fetch auction details");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching auction details:", error);
    throw error;
  }
};

export const updateAuctionDetails = async (auctionId, auctionData) => {
  try {
    const response = await fetch(`http://localhost:8080/auctions/${auctionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auctionData),
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      throw new Error(errorData.message || "Auction update failed");
    }
    return response.json();
  } catch (error) {
    console.error("Error updating auction:", error);
    throw error;
  }
};

export const createAuction = async (auctionData) => {
  try {
    const response = await fetch("http://localhost:8080/auctions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auctionData),
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      throw new Error(errorData.message || "Auction creation failed");
    }
    return response.json();
  } catch (error) {
    console.error("Error during auction creation:", error);
    throw error;
  }
};

export const uploadAuctionImage = async (auctionId, file) => { // Changed from image to file
  try {
    const formData = new FormData();
    formData.append("file", file); // Changed from image to file

    const response = await fetch(`http://localhost:8080/auctions/${auctionId}/images`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      throw new Error(errorData.message || "File upload failed"); // Changed from Image to File
    }
    return response.json();
  } catch (error) {
    console.error("Error during file upload:", error); // Changed from image to file
    throw error;
  }
};

export const getUserAuctions = async (userName) => {
  try {
    const response = await fetch(`http://localhost:8080/auctions/user/${encodeURIComponent(userName)}`);
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      throw new Error(errorData.message || "Failed to fetch user auctions");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching user auctions:", error);
    throw error;
  }
};

// export const deleteAuction = async (auctionId) => {
//   try {
//     // First, delete associated bids
//     const deleteBidsResponse = await fetch(`http://localhost:8080/bids/auction/${auctionId}`, {
//       method: "DELETE",
//     });

//     if (!deleteBidsResponse.ok) {
//       const errorData = await deleteBidsResponse.json();
//       throw new Error(errorData.message || `Failed to delete bids for auction ${auctionId}`);
//     }

//     // Then, delete the auction
//     const response = await fetch(`http://localhost:8080/auctions/${auctionId}`, {
//       method: "DELETE",
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Auction deletion failed");
//     }

//     return { success: true }; // Return a success message
//   } catch (error) {
//     console.error("Error deleting auction:", error);
//     throw error;
//   }
// };
export const deleteAuction = async (auctionId) => {
  try {
    // First, delete associated bids
    const deleteBidsResponse = await fetch(`http://localhost:8080/bids/auction/${auctionId}`, {
      method: "DELETE",
    });

    if (!deleteBidsResponse.ok) {
      const errorData = await deleteBidsResponse.json();
      throw new Error(errorData.message || `Failed to delete bids for auction ${auctionId}`);
    }

    // Then, delete associated images
    const deleteImagesResponse = await fetch(`http://localhost:8080/auctions/${auctionId}/images`, {
      method: "DELETE",
    });

    if (!deleteImagesResponse.ok) {
      const errorData = await deleteImagesResponse.json();
      throw new Error(errorData.message || `Failed to delete images for auction ${auctionId}`);
    }

    // Finally, delete the auction
    const response = await fetch(`http://localhost:8080/auctions/${auctionId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Auction deletion failed");
    }

    return { success: true }; // Return a success message
  } catch (error) {
    console.error("Error deleting auction:", error);
    throw error;
  }
};

