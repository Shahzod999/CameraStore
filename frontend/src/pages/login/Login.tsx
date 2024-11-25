import { useState } from "react";
import "./login.scss";
import { useForm } from "react-hook-form";
import { useLoginUserMutation, useUserRegisterMutation } from "../../app/api/userApiSlice";
import { ErrorState, UserState } from "../../app/types/UserTypes";
import { useAppDispatch } from "../../app/hooks/hooks";
import { addUserInfo } from "../../app/features/useInfoSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const [isSignUp, setIsSignUp] = useState(false);
  const [totalError, setTotalError] = useState("");
  const [userRegister] = useUserRegisterMutation();
  const [loginUser] = useLoginUserMutation();

  const toggleForm = () => setIsSignUp(!isSignUp);

  const onSubmit = async (data: UserState) => {
    const action = isSignUp ? userRegister : loginUser;
    try {
      const res = await action(data).unwrap();
      dispatch(addUserInfo(res?.email));
      navigate("/");
      console.log(res);
    } catch (error) {
      console.log(error);

      const errorMessage = (error as ErrorState)?.data?.message || "An unknown error occurred";
      setTotalError(errorMessage);
    }
  };

  const renderInputField = (label: string, name: string, type = "text", placeholder: string) => (
    <div className="login__form-first">
      <h2 className="login__form-title">{label}</h2>
      <input type={type} className="login__form-input" placeholder={placeholder} {...register(name)} />
    </div>
  );

  return (
    <div className="container">
      <div className="login">
        <div className={`login__first ${isSignUp ? "signup" : ""}`}>
          <h2 className="login__first-title">{isSignUp ? "Create Your New Account!" : "Welcome Back! Log in to Your Account:"}</h2>
          <a href="#" className="login__first-acc" onClick={toggleForm}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </a>
          <span>{totalError}</span>

          <a href="#" className="login__first-link" onClick={toggleForm}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </a>
        </div>

        <div className={`login__sec ${isSignUp ? "signup" : ""}`}>
          <div className="login__title-div">
            <h2 className="login__sec-title">{isSignUp ? "Create Your Account:" : "Login to Your Account:"}</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="login__form">
            {isSignUp && renderInputField("Your Name", "userName", "text", "Enter your Name")}
            {renderInputField(isSignUp ? "Email" : "Username or Email", "email", "email", isSignUp ? "Enter your Email" : "Enter your Email or Username")}
            {renderInputField("Password", "password", "password", isSignUp ? "Create a Password" : "Enter your Password")}
            <button type="submit" className="login__link-sign">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          {!isSignUp && (
            <>
              <div className="login__line"></div>
              <p className="login__text">
                If you don't have an account, you can open a new account by clicking the <span className="login__span">Sign Up</span> button
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
