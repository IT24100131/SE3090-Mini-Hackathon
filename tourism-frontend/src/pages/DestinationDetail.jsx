import { useParams, Link } from "react-router-dom";
import { sampleDestinations } from "../data/sampleDestinations";

function DestinationDetail() {
    const { id } = useParams();
    const destination = sampleDestinations.find(
        (d) => d.id === parseInt(id)
    );

    if (!destination) {
        return (
            <div className="detail-container">
                <h2>Destination not found</h2>
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