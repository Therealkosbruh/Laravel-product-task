import React, { useState } from "react";
import styles from "./popup.module.css";

const OrderPopup = ({ product, onClose }) => {
  const [customerName, setCustomerName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");

  const totalPrice = product.price * quantity;

  const handleOrder = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            customer_name: customerName,
            product_id: product.id,
            quantity,
            comment,
            total_price: totalPrice, 
          }),          
      });

      if (!response.ok) throw new Error("Ошибка при оформлении заказа");

      console.log("Заказ успешно оформлен");
      onClose(); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        
        <h3 className={styles.productTitle}>{product.name}</h3>

        <div className={styles.formGroup}>
          <label htmlFor="customer_name">Имя</label>
          <input
            type="text"
            id="customer_name"
            className={styles.input}
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Ваше имя"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quantity">Количество</label>
          <input
            type="number"
            id="quantity"
            className={styles.input}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            min="1"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="comment">Комментарий</label>
          <textarea
            id="comment"
            className={styles.textarea}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Дополнительная информация"
          />
        </div>
        <hr className={styles.separator} />
        <div className={styles.totalPriceContainer}>
          <span className={styles.totalPrice}>Итого: {totalPrice} ₽</span>
        </div>

        <div className={styles.formActions}>
          <button className={`${styles.popupButton} ${styles.orderButton}`} onClick={handleOrder}>
            Заказать
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
