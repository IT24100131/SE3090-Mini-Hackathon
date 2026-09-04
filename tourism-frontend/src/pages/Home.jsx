import { Link } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import { sampleDestinations } from "../data/sampleDestinations";

function Home() {
    // Show only first 3 as "Popular"
    const popular = sampleDestinations.slice(0, 3);

    return (
        <div>
            <section className="hero">
                <h1>Explore Sri Lanka</h1>
                <p>Discover beautiful places, hidden gems and unforgettable experiences</p>
                <Link to="/destinations" className="btn">
                    Explore Destinations
                </Link>
            </section>

            <section>
                <h2 className="section-title">Popular Destinations</h2>
                <div className="card-grid">
                    {popular.map((dest) => (
                        <DestinationCard key={dest.id} destination={dest} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;