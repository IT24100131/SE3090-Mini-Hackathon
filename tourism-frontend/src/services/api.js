const API_BASE_URL = "https://localhost:7XXX/api"; // ← Change this to your actual backend URL

// Get all destinations
export const getDestinations = async () => {
    const response = await fetch(`${API_BASE_URL}/destinations`);
    if (!response.ok) throw new Error("Failed to fetch destinations");
    return await response.json();
};

// Get single destination by ID
export const getDestinationById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/destinations/${id}`);
    if (!response.ok) throw new Error("Destination not found");
    return await response.json();
};

// Create new destination
export const createDestination = async (destination) => {
    const response = await fetch(`${API_BASE_URL}/destinations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(destination),
    });

    if (!response.ok) throw new Error("Failed to create destination");
    return await response.json();
};