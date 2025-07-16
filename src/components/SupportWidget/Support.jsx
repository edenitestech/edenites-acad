import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes, FaPaperclip, FaPaperPlane, FaQuestionCircle } from 'react-icons/fa';

const WidgetButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #2b5876;
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: #1a3c52;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 1rem;
  background: #2b5876;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
  }
  
  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.5rem;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #2b5876;
    }
  }
  
  textarea {
    min-height: 100px;
  }
`;

const FileInput = styled.div`
  position: relative;
  margin-top: 0.5rem;
  
  input[type="file"] {
    display: none;
  }
  
  label {
    display: inline-flex;
    align-items: center;
    padding: 8px 15px;
    background: #edf2f7;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    
    &:hover {
      background: #e2e8f0;
    }
  }
`;

const FileList = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 12px;
  background: #2b5876;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: #1a3c52;
  }
`;

const Support = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    files: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5);
      setFormData(prev => ({ ...prev, files: filesArray }));
    }
  };

  const removeFile = (index) => {
    setFormData(prev => {
      const newFiles = [...prev.files];
      newFiles.splice(index, 1);
      return { ...prev, files: newFiles };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log(formData);
    alert('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '', files: [] });
    setIsOpen(false);
  };

  return (
    <>
      <WidgetButton onClick={() => setIsOpen(true)}>
        <FaQuestionCircle />
      </WidgetButton>

      {isOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h3>Leave us a message</h3>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <label htmlFor="name">Your name (optional)</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="message">How can we help you?</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>Attachments</label>
                  <FileInput>
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      multiple
                    />
                    <label htmlFor="file-upload">
                      <FaPaperclip /> Add up to 5 files
                    </label>
                  </FileInput>
                  <FileList>
                    {formData.files.map((file, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                        <span style={{ flex: 1 }}>{file.name}</span>
                        <button type="button" onClick={() => removeFile(index)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </FileList>
                </FormGroup>
                
                <SubmitButton type="submit">
                  <FaPaperPlane /> Send
                </SubmitButton>
              </form>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Support;