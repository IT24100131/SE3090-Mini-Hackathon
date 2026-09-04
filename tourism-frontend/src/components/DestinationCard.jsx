import { Link } from "react-router-dom";

function DestinationCard({ destination }) {
    return (
        <Link to={`/destinations/${destination.id}`} className="card">
            <img
                src={destination.imageUrl}
                alt={destination.name}
                onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x250?text=Sri+Lanka";
                }}
            />
            <div className="card-body">
                <h3>{destination.name}</h3>
                <p className="card-location">{destination.location}</p>
                <span className="card-category">{destination.category}</span>
                <p className="card-description">{destination.description}</p>
            </div>
        </Link>
    );
}

export default DestinationCard;