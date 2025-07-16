import { useState } from 'react';
import styled from 'styled-components';
import { FaSpinner, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2d3748;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  padding-right: 40px;
  
  &:focus {
    outline: none;
    border-color: #48bb99;
    box-shadow: 0 0 0 3px rgba(72, 187, 153, 0.2);
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #718096;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #48bb99;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;
  
  &:hover {
    background: #38a17e;
  }
  
  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: #48bb99;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const RequirementsList = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;
`;

const RequirementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${({ valid }) => valid ? '#48bb99' : '#718096'};
`;

export const ChangePasswordForm = ({ onChange }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    setError('');
    setSuccess('');
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords don't match");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const changed = await onChange({
        old_password: formData.currentPassword,
        new_password: formData.newPassword
      });
      
      if (changed) {
        setSuccess('Password changed successfully!');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      setError('Failed to change password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Current Password</Label>
        <InputGroup>
          <Input
            type={showCurrent ? "text" : "password"}
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          <ToggleButton 
            type="button" 
            onClick={() => setShowCurrent(!showCurrent)}
          >
            {showCurrent ? <FaEyeSlash /> : <FaEye />}
          </ToggleButton>
        </InputGroup>
      </FormGroup>
      
      <FormGroup>
        <Label>New Password</Label>
        <InputGroup>
          <Input
            type={showNew ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <ToggleButton 
            type="button" 
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? <FaEyeSlash /> : <FaEye />}
          </ToggleButton>
        </InputGroup>
        
        <RequirementsList>
          {passwordRequirements.map((req) => (
            <RequirementItem 
              key={req.id} 
              valid={req.validator(formData.newPassword)}
            >
              {req.validator(formData.newPassword) ? <FaCheck /> : <FaTimes />}
              <span>{req.text}</span>
            </RequirementItem>
          ))}
        </RequirementsList>
      </FormGroup>
      
      <FormGroup>
        <Label>Confirm New Password</Label>
        <InputGroup>
          <Input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <ToggleButton 
            type="button" 
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </ToggleButton>
        </InputGroup>
      </FormGroup>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <FaSpinner className="spinner" /> Changing...
          </>
        ) : 'Change Password'}
      </Button>
    </Form>
  );
};