export const registerUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      throw new Error(errorData.message || "Registration failed");
    }
    return response.json();
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    // Convert credentials to query parameters
    const queryParams = new URLSearchParams({
      email: credentials.email,
      password: credentials.password
    }).toString();

    const response = await fetch(`http://localhost:8080/users/login?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('token', data.token);

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Failed to login. Please try again.');
  }
};

export const updateUserDetails = async (userData) => {
  try {
    const response = await fetch(`http://localhost:8080/users/${userData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      throw new Error(errorData.message || "Update failed");
    }
    return response.json();
  } catch (error) {
    console.error("Error during update:", error);
    throw error;
  }
};

const deleteUserBids = async (userId) => {
  const response = await fetch(`http://localhost:8080/bids/user/${userId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to delete user's bids");
  }
  return response;
};

const deleteUserAuctions = async (userId) => {
  const response = await fetch(`http://localhost:8080/auctions/user/${userId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to delete user's auctions");
  }
  return response;
};

export const deleteUser = async (userId) => {
  try {
    // Step 1: Delete all bids by this user
    await deleteUserBids(userId);
    
    // Step 2: Delete all auctions by this user (which will cascade delete related bids and images)
    await deleteUserAuctions(userId);
    
    // Step 3: Finally delete the user account
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || `Failed to delete user (Status: ${response.status})`);
    }

    return { success: true, message: 'Account deleted successfully' };
  } catch (error) {
    console.error("Error during deletion:", error);
    throw new Error(error.message || 'Failed to delete user account. Please try again later.');
  }
};