import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  AuthContainer,
  AuthWrapper,
  AuthPromo,
  AuthCard,
  AuthHeader,
  AuthForm,
  AuthInput,
  AuthButton,
  AuthFooter,
  AuthError,
  RememberMe,
  ForgotPassword,
  PasswordInputGroup,
  PasswordToggle
} from '../../components/Auth/AuthStyles';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '../../assets/images/eden-acada logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login({ 
      email, 
      password, 
      rememberMe 
    });
    
    setIsLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <AuthContainer>
      <AuthWrapper>
        <AuthPromo>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img 
              src={Logo} alt="Edenites Academy" 
              style={{ 
                height: '80px', marginBottom: '2rem', cursor: 'pointer', transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </Link>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Learn Without Limits</h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '400px' }}>
            Start, switch, or advance your career with our expert-led courses.
          </p>
        </AuthPromo>
        
        <AuthCard>
          <AuthHeader>
            <h2>Log in to your Account</h2>
            <p>Welcome back! Please enter your details</p>
          </AuthHeader>
          
          <AuthForm onSubmit={handleSubmit}>
            {error && <AuthError>{error}</AuthError>}
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
              <AuthInput
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
              <PasswordInputGroup>
                <AuthInput
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </PasswordInputGroup>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <RememberMe>
                <input 
                  type="checkbox" 
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </RememberMe>
              
              <ForgotPassword>
                <a href="/forgot-password">Forgot Password?</a>
              </ForgotPassword>
            </div>
            
            <AuthButton type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <FaSpinner className="spinner" /> Logging in...
                </>
              ) : 'Login'}
            </AuthButton>
          </AuthForm>
          
          <AuthFooter>
            New to Edenites Academy? <a href="/signup">Sign Up</a>
          </AuthFooter>
        </AuthCard>
      </AuthWrapper>
    </AuthContainer>
  );
};
export default Login;