import React, { useEffect, useState } from 'react';
import CardGrid from '../components/CardGrid/CardGrid';
import Card from '../components/Card/Card';
import Header from '../components/header/Header';
import OrdersTable from '../OrderTable/OrderTable';

export default function ProductIndex() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [activeTab, setActiveTab] = useState('products');

  const fetchProducts = async () => {
    try {
      let url = new URL('http://127.0.0.1:8000/api/products');
      Object.keys(filters).forEach((key) => {
        if (filters[key]) url.searchParams.append(key, filters[key]);
      });

      const response = await fetch(url);
      if (!response.ok) throw new Error('Ошибка загрузки товаров');

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    }
  }, [filters, activeTab]);

  return (
    <div>
      <Header 
        onApplyFilters={setFilters} 
        onProductAdded={fetchProducts} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {activeTab === 'products' ? (
        <CardGrid>
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </CardGrid>
      ) : (
        <OrdersTable />
      )}
    </div>
  );
}
