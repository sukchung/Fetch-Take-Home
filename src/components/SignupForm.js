import React, { useState, useEffect } from "react";

import "../styles/SignupForm.css";

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
  const [successful, setSuccessful] = useState(false);
  const [unSuccessful, setUnsuccessful] = useState(false);
  const [checkName, setCheckName] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkSpecialChar, setCheckSpecialChar] = useState(false);

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

    const specialRegex = /[$&+,:;=?@#|'<>.^*()%!-]/;

    if (signup.name.indexOf(" ") === -1) {
      setCheckName(true);
      return;
    } else if (signup.password.length < 8 || signup.password.length > 20) {
      setCheckPassword(true);
      return;
    } else if (!specialRegex.test(signup.password)) {
      setCheckSpecialChar(true);
      return;
    }

    const capitalizedFirstName =
      signup.name.split(" ")[0].charAt(0).toUpperCase() +
      signup.name.split(" ")[0].slice(1);
    const capitalizedLastName =
      signup.name.split(" ")[1].charAt(0).toUpperCase() +
      signup.name.split(" ")[1].slice(1);

    setSignup((prevSignup) => ({
      ...prevSignup,
      name: `${capitalizedFirstName} ${capitalizedLastName}`,
    }));

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

    if (response.ok) {
      event.target.reset();
      setSignup({
        name: "",
        email: "",
        password: "",
        occupation: "",
        state: "",
      });
      setSuccessful(true);
    } else if (!response.ok) {
      setUnsuccessful(true);
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="p-4 mt-4">
          <div className="container">
            <h2 className="heading">Sign Up</h2>
          </div>
          <form onSubmit={handleSubmit} id="create-signup-form">
            {checkName && (
              <span className="red">
                Name must contain first name and last name.
              </span>
            )}
            <div className="form-floating mb-3 input-sm">
              <input
                onChange={(event) => {
                  setCheckName(false);
                  handleChange(event);
                }}
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
                type="email"
                name="email"
                id="email"
                value={signup.email}
                className="form-control"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            {checkPassword && (
              <span className="red">
                Password must be 8 to 20 characters long.
              </span>
            )}
            {checkSpecialChar && (
              <span className="red">
                Password must have one special character.
              </span>
            )}
            <div className="form-floating mb-3">
              <input
                onChange={(event) => {
                  setCheckPassword(false);
                  setCheckSpecialChar(false);
                  handleChange(event);
                }}
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
                className="form-select"
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
              <label htmlFor="occupation">Occupation</label>
            </div>
            <div className="form-floating mb-3">
              <select
                onChange={handleChange}
                name="state"
                id="state"
                value={signup.state}
                className="form-select"
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
              <label htmlFor="state">State</label>
            </div>
            {successful && (
              <div className="alert alert-success" role="alert">
                Account was created successfully!
              </div>
            )}
            {unSuccessful && (
              <div className="alert alert-danger" role="alert">
                Account creation was unsuccessful.
              </div>
            )}
            <button className="btn btn-warning">Sign up</button>
            <div>
              <p className="spacing">Already have a Fetch Rewards account? </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

