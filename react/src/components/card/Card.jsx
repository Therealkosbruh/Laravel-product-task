import React, { useState } from "react";
import styles from "./card.module.css";
import EditPopup from "../popup/EditPopup";
import OrderPopup from "../popup/OrderPopup";

export default function Card({ product, onUpdateProduct, onDeleteProduct }) {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);

  return (
    <>
      <div className={styles.card} onClick={() => setIsEditPopupOpen(true)}>
        <div className={styles.imgBox}>
        <img
            src={product.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBHBYVChy_GJRsxdEcGMe95guRIuz7YUdOlC73BLHZZN9stvcrIS-fWDtxvyNN-rDJqpD2cIgc7rlSX5Wjb9EStqQW2iP3YDqkuFHLPA"} 
            alt={product.name}
            className={styles.prodImg}
          />
        </div>
        <div className={styles.contentBox}>
          <h3 className={styles.productTitle}>{product.name}</h3>
          <h2 className={styles.price}>{product.price} ₽</h2>
          <button
            className={styles.buy}
            onClick={(e) => {
              e.stopPropagation();
              setIsOrderPopupOpen(true);
            }}
          >
            В корзину
          </button>
        </div>
      </div>

      {isEditPopupOpen && (
        <EditPopup
          product={product}
          onClose={() => setIsEditPopupOpen(false)}
          onUpdateProduct={onUpdateProduct} 
          onDeleteProduct={onDeleteProduct} 
        />
      )}

      {isOrderPopupOpen && (
        <OrderPopup product={product} onClose={() => setIsOrderPopupOpen(false)} />
      )}
    </>
  );
}
