import React from 'react';
import styles from './cardGrid.module.css';

const CardGrid = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};

export default CardGrid;