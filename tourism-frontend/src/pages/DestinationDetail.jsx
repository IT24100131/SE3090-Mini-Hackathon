import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getDestinationById } from "../services/api";

function DestinationDetail() {
    const { id } = useParams();
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                setLoading(true);
                const data = await getDestinationById(id);
                setDestination(data);
                setError(null);
            } catch (err) {
                setError("Destination not found or failed to load.");
            } finally {
                setLoading(false);
            }
        };

        fetchDestination();
    }, [id]);

    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: "3rem" }}>
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error || !destination) {
        return (
            <div className="detail-container">
                <h2>{error || "Destination not found"}</h2>
                <Link to="/destinations" className="back-btn">
                    ← Back to Destinations
                </Link>
            </div>
        );
    }

    return (
        <div className="detail-container">
            <img
                src={destination.imageUrl}
                alt={destination.name}
                className="detail-image"
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/800x400?text=Sri+Lanka";
                }}
            />

            <div className="detail-header">
                <h1>{destination.name}</h1>
                <div className="detail-meta">
                    <span className="detail-location">{destination.location}</span>
                    <span className="detail-category">{destination.category}</span>
                </div>
            </div>

            <p className="detail-description">{destination.description}</p>

            <Link to="/destinations" className="back-btn">
                ← Back to Destinations
            </Link>
        </div>
    );
}

export default DestinationDetail;