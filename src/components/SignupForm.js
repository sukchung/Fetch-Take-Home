import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "../styles/SignupForm.css";
import fetchLogo from "../images/fetch-logo.png";

export default function SignupForm() {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    occupation: "",
    state: "",
  });
  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);
  const [signedUp, setSignedup] = useState(false);

  useEffect(() => {
    async function getData() {
      const url = "https://frontend-take-home.fetchrewards.com/form";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setOccupations(data.occupations);
        setStates(data.states);
      }
    }
    getData();
  }, []);

  function handleChange(event) {
    setSignup((prevSignup) => {
      return {
        ...signup,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = signup;
    const url = "https://frontend-take-home.fetchrewards.com/form";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    console.log(response)

    if (response.ok) {
      event.target.reset();
      setSignup({
        name: "",
        email: "",
        password: "",
        occupation: "",
        state: "",
      });
      setSignedup(true);
    } else if (!response.ok) {
      const message = `${response.status}: ${response.statusText}`;
      throw new Error(message);
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="p-4 mt-4 small-container">
          <div className="container">
            <h2 className="heading">Sign up</h2>
            <img src={fetchLogo} className="icon" alt="icon" />
          </div>
          <form onSubmit={handleSubmit} id="create-signup-form">
            <div className="form-floating mb-3 input-sm">
              <input
                onChange={handleChange}
                placeholder="Name"
                type="text"
                name="name"
                id="name"
                value={signup.name}
                className="form-control"
                required
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                placeholder="Email"
                type="text"
                name="email"
                id="email"
                value={signup.email}
                className="form-control"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                value={signup.password}
                className="form-control"
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating mb-3">
              <select
                onChange={handleChange}
                name="occupation"
                id="occupation"
                value={signup.occupation}
                className="form-select center-select"
                required
              >
                <option value="">Choose an occupation</option>
                {occupations.map((occupation) => {
                  return (
                    <option key={occupation} value={occupation}>
                      {occupation}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <select
                onChange={handleChange}
                name="state"
                id="state"
                value={signup.state}
                className="form-select center-select"
                required
              >
                <option value="">Choose a state</option>
                {states.map((state) => {
                  return (
                    <option key={state.abbreviation} value={state.name}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {signedUp && (
              <div className="alert alert-success" role="alert">
                Thank you for joining Fetch Rewards!
              </div>
            )}
            <button className="btn btn-warning">Sign up</button>
            <div>
              <p className="spacing">
                Already have a Fetch Rewards account?{" "}
                <NavLink to="#" className="login-font">
                  Log in
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
