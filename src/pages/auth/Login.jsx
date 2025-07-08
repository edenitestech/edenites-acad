import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  AuthContainer,
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

    const result = await login({ email, password, rememberMe });
    
    setIsLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>
          <h2>Welcome Back</h2>
          <p>Login to access your Edenites Academy dashboard</p>
        </AuthHeader>
        
        <AuthForm onSubmit={handleSubmit}>
          {error && <AuthError>{error}</AuthError>}
          
          <AuthInput
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <PasswordInputGroup>
            <AuthInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </PasswordInputGroup>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
              <a href="/forgot-password">Forgot password?</a>
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
          Don't have an account? <a href="/signup">Sign up</a>
        </AuthFooter>
      </AuthCard>
    </AuthContainer>
  );
};
export default Login;