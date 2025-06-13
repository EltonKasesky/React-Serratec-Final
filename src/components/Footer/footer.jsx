import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} FarmDev. Todos os direitos reservados.</p>
    
      </div>
    </footer>
  );
};

export default Footer;
