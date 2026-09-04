import DestinationCard from "../components/DestinationCard";
import { sampleDestinations } from "../data/sampleDestinations";

function Destinations() {
    return (
        <div>
            <div className="page-header">
                <h1>All Destinations</h1>
                <p>Browse places across Sri Lanka</p>
            </div>

            {/* Member 3 will add Search + Filter UI here later */}

            <div className="card-grid">
                {sampleDestinations.map((dest) => (
                    <DestinationCard key={dest.id} destination={dest} />
                ))}
            </div>
        </div>
    );
}

export default Destinations;