import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_KEY");

const ClientAppointmentPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    age: "",
    gender: "",
    date: "",
    phoneNumber: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("appointments")
        .insert([formData]);
      if (error) {
        console.error("Error submitting appointment:", error.message);
      } else {
        console.log("Appointment submitted successfully:", data);
        // Reset form data after successful submission
        setFormData({
          firstname: "",
          surname: "",
          age: "",
          gender: "",
          date: "",
          phoneNumber: "",
          email: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Error submitting appointment:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Book an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Surname:</label>
            <input
              type="text"
              className="form-control"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date:</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number:</label>
          <input
            type="tel"
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ClientAppointmentPage;
