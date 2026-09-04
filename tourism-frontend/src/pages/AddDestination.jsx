import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDestination } from "../services/api";

function AddDestination() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        category: "",
        description: "",
        imageUrl: "",
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const categories = ["Historical", "Nature", "Beach", "Adventure"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.category) newErrors.category = "Please select a category";
        if (!formData.description.trim())
            newErrors.description = "Description cannot be empty";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validate()) return;

        try {
            setSubmitting(true);
            await createDestination(formData);
            alert("Destination added successfully!");
            navigate("/destinations");
        } catch (err) {
            setSubmitError("Failed to add destination. Please try again.");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h1 style={{ color: "#0f766e", marginBottom: "1.5rem" }}>
                Add New Destination
            </h1>

            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div style={{ marginBottom: "1.2rem" }}>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>
                        Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "0.7rem",
                            borderRadius: "8px",
                            border: errors.name ? "1px solid #dc2626" : "1px solid #cbd5e1",
                        }}
                    />
                    {errors.name && (
                        <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "0.3rem" }}>
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Location */}
                <div style={{ marginBottom: "1.2rem" }}>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>
                        Location *
                    </label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "0.7rem",
                            borderRadius: "8px",
                            border: errors.location ? "1px solid #dc2626" : "1px solid #cbd5e1",
                        }}
                    />
                    {errors.location && (
                        <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "0.3rem" }}>
                            {errors.location}
                        </p>
                    )}
                </div>

                {/* Category */}
                <div style={{ marginBottom: "1.2rem" }}>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>
                        Category *
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "0.7rem",
                            borderRadius: "8px",
                            border: errors.category ? "1px solid #dc2626" : "1px solid #cbd5e1",
                        }}
                    >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "0.3rem" }}>
                            {errors.category}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div style={{ marginBottom: "1.2rem" }}>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>
                        Description *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        style={{
                            width: "100%",
                            padding: "0.7rem",
                            borderRadius: "8px",
                            border: errors.description ? "1px solid #dc2626" : "1px solid #cbd5e1",
                        }}
                    />
                    {errors.description && (
                        <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "0.3rem" }}>
                            {errors.description}
                        </p>
                    )}
                </div>

                {/* Image URL (optional) */}
                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "0.4rem" }}>
                        Image URL (optional)
                    </label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://..."
                        style={{
                            width: "100%",
                            padding: "0.7rem",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                        }}
                    />
                </div>

                {submitError && (
                    <p style={{ color: "#dc2626", marginBottom: "1rem" }}>{submitError}</p>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        backgroundColor: "#0f766e",
                        color: "white",
                        padding: "0.8rem 1.8rem",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: submitting ? "not-allowed" : "pointer",
                        opacity: submitting ? 0.7 : 1,
                    }}
                >
                    {submitting ? "Adding..." : "Add Destination"}
                </button>
            </form>
        </div>
    );
}

export default AddDestination;