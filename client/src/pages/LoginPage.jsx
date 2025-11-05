import React, { useState, useContext } from 'react';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext.jsx';

const LoginPage = () => {
  const [currState, setCurrState] = useState('Sign Up');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === 'Sign Up' && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === 'Sign Up' ? 'signup' : 'login', {
      fullName,
      email,
      password,
      bio,
    });
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center
    justify-center gap-8 sm:jsutify-evenly max-sm:flex-col backdrop-blur-2xl"
    >
      {/*  --left-- */}
      <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" />
      {/* --right-- */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-violet border-gray-800 p-6
     flex flex-col gap-6 rounded-lg ml-0 sm:ml-20 md:ml-40 lg:ml-40 xl:ml-60"
      >
        <h2 className="flex items-center justify-between">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-5 float-right cursor-pointer right-0 -top-1/2 "
            />
          )}
        </h2>
        {currState === 'Sign Up' && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-gray-800 rounded-md
        focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-800 rounded-md
        focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-800 rounded-md
        focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </>
        )}

        {currState === 'Sign Up' && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-800 rounded-md
        focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Please provide a short Bio..."
            required
          ></textarea>
        )}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-orange-300 to-orange-600 text-gray-900 rounded-md cursor-pointer"
        >
          {currState === 'Sign Up' ? 'Create Account' : 'Login Now'}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-900">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === 'Sign Up' ? (
            <p className="text-sm text-gray-900">
              Already have an Account?{' '}
              <span
                onClick={() => {
                  setCurrState('Login');
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-orange-500 cursor-pointer"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-900">
              Create an account{' '}
              <span
                onClick={() => setCurrState('Sign Up')}
                className="font-medium text-orange-500 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
