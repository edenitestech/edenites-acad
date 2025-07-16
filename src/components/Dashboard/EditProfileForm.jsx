import { useState } from 'react';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #48bb99;
    box-shadow: 0 0 0 3px rgba(72, 187, 153, 0.2);
  }
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

export const EditProfileForm = ({ currentUser, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const updated = await onUpdate({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email
      });
      
      if (updated) {
        setSuccess('Profile updated successfully!');
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>First Name</Label>
        <Input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Last Name</Label>
        <Input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </FormGroup>
      
      <FormGroup style={{ gridColumn: '1 / -1' }}>
        <Label>Email Address</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </FormGroup>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      
      <FormGroup style={{ gridColumn: '1 / -1' }}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <FaSpinner className="spinner" /> Updating...
            </>
          ) : 'Save Changes'}
        </Button>
      </FormGroup>
    </Form>
  );
};