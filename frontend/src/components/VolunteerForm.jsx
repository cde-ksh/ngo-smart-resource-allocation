import { useState } from "react";
import axios from "axios";

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    skills: "",
    role: "",
    availability: true,
    state: "",
    district: "",
    transport: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/volunteers/",
        formData
      );

      alert("Volunteer Registered");
      console.log(res.data);

    } catch (error) {
      console.error(error);
      alert("Submission failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Volunteer Registration</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="skills" placeholder="Skills" onChange={handleChange} />
        <input name="role" placeholder="Role" onChange={handleChange} />
        <input name="state" placeholder="State" onChange={handleChange} />
        <input name="district" placeholder="District" onChange={handleChange} />
        <input name="transport" placeholder="Transport" onChange={handleChange} />

        <label>
          Available:
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}