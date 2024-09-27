import React, { useState, useContext } from 'react';
import classes from './SignUp.module.css';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { auth } from '../../Utility/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import { ClipLoader } from 'react-spinners';



function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation()
  console.log(navStateData)

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError("Please fill in both email and password.");

    setLoading({ ...loading, signIn: true });
    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: Type.SET_USER, user: userInfo.user });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({ ...loading, signIn: false });
      navigate(navStateData?.state?.redirect || "/")
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError("Please fill in both email and password.");

    setLoading({ ...loading, signUp: true });
    try {
      const userInfo = await createUserWithEmailAndPassword(auth, email, password);
      dispatch({ 
        type: Type.SET_USER,
         user: userInfo.user 
        });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({ ...loading, signUp: false });
    }
  };

  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/603px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small style={{padding: "5px", textAlign:"center", color:"red",fontWeight:"bold",}}>
            {navStateData.state.msg}
          </small>
        )

        }
        <form action="">
          <div>
            <label htmlFor="email">Email </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
          </div>

          <button
            type="submit"
            onClick={handleSignIn}
            name="signin"
            className={classes.login_signInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>

        </form>

        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale.Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/* create acct btn */}
        <button
          type="submit"
          name="signup"
          onClick={handleSignUp}
          className={classes.login_registerButton}
        >
          {loading.signUp ? <ClipLoader color="#000" size={15} /> : "Create Your Amazon Account"}
        </button>
        {error && <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;