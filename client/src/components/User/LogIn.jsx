function LogIn() {
  return (
    <>
      <div className="user-log-in-container">
        <div>
          <form onSubmit="">
            <input
              type="text"
              name="name"
              value=""
              onChange=""
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="family_name"
              value=""
              onChange=""
              placeholder="Family Name"
              required
            />
            <input
              type="email"
              name="email"
              value=""
              onChange=""
              placeholder="E-Mail"
              required
            />

            <input
              type="password"
              name="password"
              value=""
              onChange=""
              placeholder="Password"
              required
            />
            <button type="submit">Log-In</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
