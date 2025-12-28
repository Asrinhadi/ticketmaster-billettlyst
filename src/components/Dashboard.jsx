import { useState } from "react";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    setIsLoggedIn(true);
  }

  return (
    <section className="dashboard">
      {!isLoggedIn ? (
        <>
          <h1>Logg inn</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <label>
              E-post
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Passord
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit">Logg inn</button>
          </form>
        </>
      ) : (
        <section className="my-page">
          <h1>Min side</h1>
          <p>Du er nå logget inn som {formValues.email || "bruker"}.</p>
          <p>
            Data fra Sanity!!husk dette
          </p>
        </section>
      )}
    </section>
  );
}
