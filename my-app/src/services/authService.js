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

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      throw new Error(errorData.message || "Deletion failed");
    }
    return response.json();
  } catch (error) {
    console.error("Error during deletion:", error);
    throw error;
  }
};