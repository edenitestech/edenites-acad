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
  PasswordRequirements,
  RequirementItem
} from '../../components/Auth/AuthStyles';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
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
    
    const result = await signup(formData);
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
      <AuthCard>
        <AuthHeader>
          <h2>Join Edenites Academy</h2>
          <p>... to start your learning journey today</p>
        </AuthHeader>
        
        <AuthForm onSubmit={handleSubmit}>
          {error && <AuthError>{error}</AuthError>}
          
          <AuthInput
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <AuthInput
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <AuthInput
            name="password"
            type="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <AuthInput
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          
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
          
          <AuthButton type="submit">Create Account</AuthButton>
        </AuthForm>
        
        <AuthFooter>
          Already have an account? <a href="/login">Login</a>
        </AuthFooter>
      </AuthCard>
    </AuthContainer>
  );
};

export default Signup;