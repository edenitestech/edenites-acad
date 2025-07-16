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
  PasswordRequirements,
  RequirementItem,
  PasswordInputGroup,
  PasswordToggle
} from '../../components/Auth/AuthStyles';
import { FaCheck, FaTimes, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '../../assets/images/eden-acada logo.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const passwordRequirements = [
    { id: 1, text: 'At least 8 characters', validator: (p) => p.length >= 8 },
    { id: 2, text: 'Contains a number', validator: (p) => /\d/.test(p) },
    { id: 3, text: 'Has a special character', validator: (p) => /[!@#$%^&*]/.test(p) },
    { id: 4, text: 'Contains uppercase letter', validator: (p) => /[A-Z]/.test(p) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setIsSubmitting(true);
    const result = await signup(formData);
    setIsSubmitting(false);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AuthContainer>
      <AuthWrapper>
        <AuthPromo>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img 
              src={Logo} 
              alt="Edenites Academy" 
              style={{ 
                height: '80px', 
                marginBottom: '2rem',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </Link>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Join Our Community</h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '400px' }}>
            Revolutionize your learning experience with our expert-led courses.
          </p>
        </AuthPromo>
        
        <AuthCard>
          <AuthHeader>
            <h2>Create an Account</h2>
            <p>Start your learning journey with us today</p>
          </AuthHeader>
          
          <AuthForm onSubmit={handleSubmit}>
            {error && <AuthError>{error}</AuthError>}
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
              <AuthInput
                name="fullname"
                type="text"
                placeholder="Your full name"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
              <AuthInput
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
              <PasswordInputGroup>
                <AuthInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </PasswordInputGroup>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Confirm Password</label>
              <PasswordInputGroup>
                <AuthInput
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <PasswordToggle onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </PasswordInputGroup>
            </div>
            
            <PasswordRequirements>
              {passwordRequirements.map((req) => (
                <RequirementItem 
                  key={req.id} 
                  valid={req.validator(formData.password)}
                >
                  {req.validator(formData.password) ? <FaCheck /> : <FaTimes />}
                  <span>{req.text}</span>
                </RequirementItem>
              ))}
            </PasswordRequirements>

            <AuthButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <FaSpinner className="spinner" /> Processing...
                </>
              ) : (
                'Create Account'
              )}
            </AuthButton>
          </AuthForm>
          
          <AuthFooter>
            Already have an account? <a href="/login">Login</a>
          </AuthFooter>
        </AuthCard>
      </AuthWrapper>
    </AuthContainer>
  );
};
export default Signup;