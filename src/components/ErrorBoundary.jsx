// src/components/ErrorBoundary.jsx
import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }
  
  handleReload = () => {
    window.location.reload();
  };
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2>Oops! Something went wrong</h2>
          <p>We're sorry for the inconvenience. Please try reloading the page.</p>
          <button 
            onClick={this.handleReload}
            style={{
              padding: '10px 20px',
              background: '#48bb99',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}