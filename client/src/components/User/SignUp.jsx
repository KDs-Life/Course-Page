function SignUp() {
  return (
    <>
      {" "}
      <div className="Sign-Up-container">
        <div className="left">
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
            <input
              type="password"
              name="password_confirmation"
              value=""
              onChange=""
              placeholder="Password Confirmation"
              required
            />
            <input
              type="text"
              name="address"
              value=""
              onChange=""
              placeholder="Address"
              required
            />
            <input
              type="text"
              name="city"
              value=""
              onChange=""
              placeholder="City"
              required
            />
            <input
              type="text"
              name="state"
              value=""
              onChange=""
              placeholder="State"
              required
            />
            <input
              type="text"
              name="zip_code"
              value=""
              onChange=""
              placeholder="Zip Code"
              required
            />
            <input
              type="text"
              name="country"
              value=""
              onChange=""
              placeholder="Country"
              required
            />
            <input
              type="tel"
              name="phone_number"
              value=""
              onChange=""
              placeholder="Phone Number"
              required
            />

            <button type="submit">Sign-Up</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
