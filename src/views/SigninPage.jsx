import { ReactComponent as User_icon } from "../assets/User_icon.svg";

const SigninPage = () => {
  return (
    <div className="signin_page_container">
      <User_icon className="singin_image" />

      <section className="singin_container">
        <h3>Welcome back!</h3>
        <div className="line"></div>

        <div className="singin_input_section">
          <p>Username</p>
          <input type="text" />
        </div>

        <div className="singin_input_section">
          <p>Password</p>
          <input type="password" name="" id="" />
        </div>

        <button className="login_button">Login</button>
        <div className="forgotpasswordtext_container">
          <p className="forgotpasswordtext">Forgot password?</p>
        </div>
        <p className="needaccounttext">
          Need an account?{" "}
          <span className="createaccounttext">Create Account</span>
        </p>
      </section>
    </div>
  );
};

export default SigninPage;
