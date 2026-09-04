import { useState, useEffect } from "react";
import DestinationCard from "../components/DestinationCard";
import { getDestinations } from "../services/api";

function Destinations() {
    const [destinations, setDestinations] = useState([]);
    const [filteredDestinations, setFilteredDestinations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = ["All", "Historical", "Nature", "Beach", "Adventure"];

    // Fetch data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getDestinations();
                setDestinations(data);
                setFilteredDestinations(data);
                setError(null);
            } catch (err) {
                setError("Unable to load destinations. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Search + Filter logic
    useEffect(() => {
        let result = destinations;

        // Filter by category
        if (selectedCategory !== "All") {
            result = result.filter(
                (dest) => dest.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Search by name or location
        if (searchTerm.trim() !== "") {
            result = result.filter(
                (dest) =>
                    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    dest.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredDestinations(result);
    }, [searchTerm, selectedCategory, destinations]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "3rem" }}>
                <h2>Loading destinations...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: "center", padding: "3rem", color: "#dc2626" }}>
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div>
            <div className="page-header">
                <h1>All Destinations</h1>
                <p>Browse and discover places across Sri Lanka</p>
            </div>

            {/* Search + Filter Section */}
            <div style={{ marginBottom: "2rem" }}>
                {/* Search Box */}
                <input
                    type="text"
                    placeholder="Search by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: "100%",
                        maxWidth: "400px",
                        padding: "0.7rem 1rem",
                        fontSize: "1rem",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        marginBottom: "1rem",
                    }}
                />

                {/* Category Filter Buttons */}
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            style={{
                                padding: "0.45rem 1rem",
                                borderRadius: "999px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "600",
                                backgroundColor:
                                    selectedCategory === category ? "#0f766e" : "#e2e8f0",
                                color: selectedCategory === category ? "white" : "#334155",
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            {filteredDestinations.length === 0 ? (
                <p style={{ textAlign: "center", color: "#64748b" }}>
                    No destinations found.
                </p>
            ) : (
                <div className="card-grid">
                    {filteredDestinations.map((dest) => (
                        <DestinationCard key={dest.id} destination={dest} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Destinations;