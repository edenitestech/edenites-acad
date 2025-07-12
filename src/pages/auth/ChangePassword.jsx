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
  AuthError,
  PasswordInputGroup,
  PasswordToggle,
  PasswordRequirements,
  RequirementItem
} from '../../components/Auth/AuthStyles';
import { FaSpinner, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';

const ChangePassword = () => {
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const passwordRequirements = [
    { id: 1, text: 'At least 8 characters', validator: (p) => p.length >= 8 },
    { id: 2, text: 'Contains a number', validator: (p) => /\d/.test(p) },
    { id: 3, text: 'Has a special character', validator: (p) => /[!@#$%^&*]/.test(p) },
    { id: 4, text: 'Contains uppercase letter', validator: (p) => /[A-Z]/.test(p) },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords don't match");
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulate password change process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Password changed successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Logout user after successful password change
      setTimeout(() => {
        logout();
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError('Failed to change password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>
          <h2>Change Password</h2>
          <p>Create a new secure password</p>
        </AuthHeader>
        
        <AuthForm onSubmit={handleSubmit}>
          {error && <AuthError>{error}</AuthError>}
          {success && <div style={{ color: '#48bb99', marginBottom: '1rem' }}>{success}</div>}
          
          <PasswordInputGroup>
            <AuthInput
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
            <PasswordToggle onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </PasswordInputGroup>
          
          <PasswordInputGroup>
            <AuthInput
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <PasswordToggle onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </PasswordInputGroup>
          
          <PasswordInputGroup>
            <AuthInput
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <PasswordToggle onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </PasswordInputGroup>
          
          <PasswordRequirements>
            {passwordRequirements.map((req) => (
              <RequirementItem 
                key={req.id} 
                valid={req.validator(formData.newPassword)}
              >
                {req.validator(formData.newPassword) ? <FaCheck /> : <FaTimes />}
                <span>{req.text}</span>
              </RequirementItem>
            ))}
          </PasswordRequirements>

          <AuthButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <FaSpinner className="spinner" /> Changing...
              </>
            ) : 'Change Password'}
          </AuthButton>
        </AuthForm>
        
        <AuthFooter>
          <a href="/dashboard">Back to Dashboard</a>
        </AuthFooter>
      </AuthCard>
    </AuthContainer>
  );
};

export default ChangePassword;