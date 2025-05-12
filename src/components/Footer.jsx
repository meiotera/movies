import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Renan Ferreira da Costa</p>
      <p>Desenvolvedor Web | Node.js | Mossoró - RN</p>
    </footer>
  );
};

export default Footer;
