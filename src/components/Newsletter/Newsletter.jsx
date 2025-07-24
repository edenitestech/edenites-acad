// src/components/Newsletter/Newsletter.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Newsletter = () => {
  // Inline styles object
  const styles = {
    newsletterSection: {
      background: 'linear-gradient(135deg, #031465ff, #03376aff)',
      color: '#eceeefff',
      padding: '4rem 2rem',
      textAlign: 'center',
      margin: '0',
      borderTop: '1px solid #dee2e6',
      borderBottom: '1px solid #dee2e6',
    },
    container: {
      maxWidth: '700px',
      margin: '0 auto',
    },
    heading: {
      fontSize: '2.8rem',
      marginBottom: '1rem',
      fontWeight: '600',
      color: '#e4e8ecff',
    },
    subtext: {
      fontSize: '0.95rem',
      marginBottom: '2rem',
      fontWeight: '600',
      color: '#eaedf1ff',
      lineHeight: '1.6',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    emailInput: {
      padding: '0.8rem 1rem',
      borderRadius: '25px',
      border: '1px solid #049d32ff',
      fontSize: '1rem',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
    },
    submitButton: {
      padding: '0.8rem 2rem',
      backgroundColor: '#049d32ff', // Professional blue
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: 'fit-content',
      margin: '0 auto',
    },
    disclaimer: {
      fontSize: '0.8rem',
      color: '#f3f5f7ff',
      fontWeight: '600',
      marginTop: '1.5rem',
      fontStyle: 'italic',
    },
    // Mobile styles
    mobile: {
      newsletterSection: {
        padding: '2.5rem 1rem',
      },
      heading: {
        fontSize: '1.5rem',
      },
      emailInput: {
        maxWidth: '100%',
      }
    }
  };

  // Handle button hover
  const handleHover = (e) => {
    e.target.style.backgroundColor = '#10c236ff';
    e.target.style.transform = 'translateY(-2px)';
  };

  const handleHoverEnd = (e) => {
    e.target.style.backgroundColor = styles.submitButton.backgroundColor;
    e.target.style.transform = 'translateY(0)';
  };

  return (
    <section style={styles.newsletterSection}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Join our newsletter</h2>
        <p style={styles.subtext}>
          Get monthly learning tips, course updates, and exclusive discounts straight to your inbox.
        </p>
        
        <form style={styles.form}>
          <input 
            type="email" 
            placeholder="Email address" 
            style={styles.emailInput} 
            required 
          />
          <button 
            type="submit"
            style={styles.submitButton}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverEnd}
          >
            Subscribe
          </button>
        </form>
        
        <p style={styles.disclaimer}>
          * You can unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;