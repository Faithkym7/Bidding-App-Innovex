import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { fetchUser, clearUser } from '../../store/userSlice';
import './LogIn.scss';
import { cars } from '../../data/index';
import { motion } from 'framer-motion';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setOpenSnackbar(true);  // Open snackbar on success
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/Dashboard'), 1500);  // Redirect to dashboard
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  // onAuthStateChanged - runs on mount
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchUser(user.uid));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className='login'>
      <div className="login-container">
        <div className='login-container-media'>
          <motion.img
            src={cars.bidding}
            alt='care'
            className='signup-container-image'
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <h6>Bidding at your price</h6>
        </div>
        <div className='login-container-section'>
          <h1>Welcome Back</h1>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={{display:'flex', alignItems:'center'}}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  marginLeft: '0.5rem',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  fontSize: '1rem',
                }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              </div>
            </div>

            <button type="submit" className="login-button">Log In</button>
          </form>

          <div className="signup-prompt">
            <p>Don't have an account? <span onClick={() => navigate('/sign-up')}>Sign up</span></p>
          </div>
        </div>

        {/* Snackbar for Login Success */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}  // Snackbar will disappear after 3 seconds
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Login successful!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Login;