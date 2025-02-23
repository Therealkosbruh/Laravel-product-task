import React, { useState } from 'react';
import styles from './header.module.css';
import Popup from '../popup/Popup.jsx';

export default function Header({ onApplyFilters, onProductAdded, activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filters, setFilters] = useState({
    category_id: '',
    min_price: '',
    max_price: ''
  });

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  const handleAddButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setFilters({
      category_id: '',
      min_price: '',
      max_price: ''
    });
    onApplyFilters({});
  };

  const handleAddProduct = async (productData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении продукта');
      }

      const data = await response.json();
      console.log('Продукт добавлен:', data);
      onProductAdded();
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'products' ? styles.active : ''}`}
          onClick={() => {
            if (typeof setActiveTab === 'function') {
              setActiveTab('products');
            } else {
              console.error('setActiveTab is not a function', setActiveTab);
            }
          }}
        >
          Товары
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'orders' ? styles.active : ''}`}
          onClick={() => {
            if (typeof setActiveTab === 'function') {
              setActiveTab('orders');
            } else {
              console.error('setActiveTab is not a function', setActiveTab);
            }
          }}
        >
          Заказы
        </button>
      </div>
      <div className={styles.rightSection}>
        {activeTab === 'products' && (
          <button className={styles.addButton} onClick={handleAddButtonClick}>Добавить +</button>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={styles.icon}
          onClick={handleIconClick}
        >
          <path d="M21 3H5a1 1 0 0 0-1 1v2.59c0 .523.213 1.037.583 1.407L10 13.414V21a1.001 1.001 0 0 0 1.447.895l4-2c.339-.17.553-.516.553-.895v-5.586l5.417-5.417c.37-.37.583-.884.583-1.407V4a1 1 0 0 0-1-1zm-6.707 9.293A.996.996 0 0 0 14 13v5.382l-2 1V13a.996.996 0 0 0-.293-.707L6 6.59V5h14.001l.002 1.583-5.71 5.71z"></path>
        </svg>
      </div>

      {isOpen && (
        <div className={styles.filterPanel}>
          <button className={styles.closeButton} onClick={handleCloseClick}>X</button>
          <div className={styles.filterContent}>
            <h3>Фильтры</h3>

            <div className={styles.filterGroup}>
              <label htmlFor="category">Категория</label>
              <select
                id="category"
                name="category_id"
                className={styles.selectInput}
                value={filters.category_id}
                onChange={handleFilterChange}
              >
                <option value="">Все категории</option>
                <option value="1">Легкий</option>
                <option value="2">Хрупкий</option>
                <option value="3">Тяжелый</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="min_price">Минимальная цена</label>
              <input
                type="number"
                id="min_price"
                name="min_price"
                className={styles.input}
                placeholder="От"
                value={filters.min_price}
                onChange={handleFilterChange}
              />
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="max_price">Максимальная цена</label>
              <input
                type="number"
                id="max_price"
                name="max_price"
                className={styles.input}
                placeholder="До"
                value={filters.max_price}
                onChange={handleFilterChange}
              />
            </div>

            <div className={styles.filterActions}>
              <button className={styles.applyButton} onClick={applyFilters}>Применить</button>
              <button className={styles.clearButton} onClick={clearFilters}>Очистить</button>
            </div>
          </div>
        </div>
      )}

      {isPopupOpen && (
        <Popup onClose={handleClosePopup} onAddProduct={handleAddProduct} />
      )}
    </div>
  );
}
