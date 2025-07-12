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
  AuthError
} from '../../components/Auth/AuthStyles';
import { FaSpinner } from 'react-icons/fa';

const EditProfile = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update context and localStorage
      const updatedUser = {
        ...currentUser,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        fullname: `${formData.firstName} ${formData.lastName}`
      };
      
      setCurrentUser(updatedUser);
      setSuccess('Profile updated successfully!');
      
      // Optional: Store in localStorage to persist across refreshes
      localStorage.setItem('userProfile', JSON.stringify(updatedUser));
      
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>
          <h2>Edit Profile</h2>
          <p>Update your personal information</p>
        </AuthHeader>
        
        <AuthForm onSubmit={handleSubmit}>
          {error && <AuthError>{error}</AuthError>}
          {success && <div style={{ color: '#48bb99', marginBottom: '1rem' }}>{success}</div>}
          
          <AuthInput
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          
          <AuthInput
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          
          <AuthInput
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <AuthButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <FaSpinner className="spinner" /> Updating...
              </>
            ) : 'Save Changes'}
          </AuthButton>
        </AuthForm>
        
        <AuthFooter>
          <a href="/dashboard">Back to Dashboard</a>
        </AuthFooter>
      </AuthCard>
    </AuthContainer>
  );
};

export default EditProfile;