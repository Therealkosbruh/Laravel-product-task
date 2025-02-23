import React, { useState } from "react";
import styles from "./popup.module.css";

const EditPopup = ({ product, onClose, onUpdateProduct, onDeleteProduct }) => {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category_id);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description || "");

  const handleUpdate = async () => {
    const updatedProduct = {
      name,
      category_id: category,
      price,
      description,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error("Ошибка обновления продукта");

      const data = await response.json();
      console.log("Продукт обновлен:", data);
      
      if (onUpdateProduct) onUpdateProduct(data); 
      onClose(); 
    } catch (error) {
      console.error("Ошибка при обновлении продукта:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${product.id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) throw new Error("Ошибка удаления продукта");
  
      console.log("Продукт удален");
      
      if (onDeleteProduct) onDeleteProduct(product.id); 
      onClose(); 
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
    }
  };
  

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h3>Редактировать продукт</h3>

        <div className={styles.formGroup}>
          <label htmlFor="name">Название</label>
          <input
            type="text"
            id="name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название продукта"
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
            <option value="1">Легкий</option>
            <option value="2">Тяжелый</option>
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
          <button className={`${styles.popupButton} ${styles.updateButton}`} onClick={handleUpdate}>
            Обновить
          </button>
          <button className={`${styles.popupButton} ${styles.deleteButton}`} onClick={handleDelete}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
