import React, { useState } from 'react';
import styles from './popup.module.css';

const Popup = ({ onClose, onAddProduct }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!name || !category || !price || !description) {
      alert('Заполните все поля!');
      return;
    }

    const newProduct = { name, category_id: category, price, description };
    
    console.log('Добавить продукт:', newProduct);
    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h3>Добавить продукт</h3>

        <div className={styles.formGroup}>
          <label htmlFor="name">Название</label>
          <input
            type="text"
            id="name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Название"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            className={styles.selectInput}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Выберите категорию</option>
            <option value="1">Легкий</option>
            <option value="2">Хрупкий</option>
            <option value="3">Тяжелый</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Цена</label>
          <input
            type="number"
            id="price"
            className={styles.input}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Цена"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание продукта"
          />
        </div>

        <div className={styles.formActions}>
          <button className={styles.submitButton} onClick={handleSubmit}>Добавить</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
