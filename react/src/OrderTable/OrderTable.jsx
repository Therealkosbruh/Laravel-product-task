import React, { useState, useEffect } from "react";
import styles from "./table.module.css";
import OrderInfoPopup from "../components/popup/OrderInfoPopup";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/orders");
      if (!response.ok) throw new Error("Ошибка загрузки заказов");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowClick = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleClosePopup = () => {
    setSelectedOrderId(null);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Дата</th>
            <th>ФИО покупателя</th>
            <th>Статус</th>
            <th>Итоговая цена</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className={styles.tableRows} onClick={() => handleRowClick(order.id)}>
              <td>{order.id}</td>
              <td>{order.order_date}</td>
              <td>{order.customer_name}</td>
              <td>{order.status === "new" ? "Новый" : "Выполнен"}</td>
              <td>{order.total_price} ₽</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrderId && (
        <OrderInfoPopup orderId={selectedOrderId} onClose={handleClosePopup} onUpdate={fetchOrders} />
      )}
    </div>
  );
}
