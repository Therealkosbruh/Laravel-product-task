import React, { useEffect, useState } from "react";
import styles from "./popup.module.css";

export default function OrderInfoPopup({ orderId, onClose, onUpdate }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/orders/${orderId}`);
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleUpdateStatus = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) throw new Error("Ошибка обновления статуса");

      const updatedOrder = await response.json();
      setOrder(updatedOrder); 
      onUpdate(); 
      onClose(); 
    } catch (error) {
      console.error("Ошибка обновления статуса", error);
    }
  };

  if (loading) {
    return (
      <div className={styles.popup}>
        <div className={styles.popupContent}>
          <h3>Загрузка...</h3>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.popup}>
        <div className={styles.popupContent}>
          <h3>Ошибка загрузки заказа</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.popup} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h3>Информация о заказе</h3>
        <div className={styles.formGroup}>
          <p><strong>ID:</strong> {order.id}</p>
          <p><strong>Дата:</strong> {order.order_date}</p>
          <p><strong>ФИО покупателя:</strong> {order.customer_name}</p>
          <p><strong>Статус:</strong> {order.status === "new" ? "Новый" : "Выполнен"}</p>
          <p><strong>Итоговая цена:</strong> {order.total_price} ₽</p>
          {order.comment && <p><strong>Комментарий:</strong> {order.comment}</p>}
        </div>
        <div className={styles.formActions}>
          <button className={`${styles.popupButton} ${styles.updateButton}`} onClick={handleUpdateStatus}>
            Обновить
          </button>
        </div>
      </div>
    </div>
  );
}
