
// StudentMarketplace.js - 학생용 가상 장터
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentShop() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [balance, setBalance] = useState(50000);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('studentInfo'));
    if (!auth || !auth.groupName) {
      navigate('/login');
      return;
    }
    setGroupName(auth.groupName);
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(savedProducts);
    const savedHistory = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    setPurchaseHistory(savedHistory);
    const savedBalance = parseInt(localStorage.getItem('balance') || '50000');
    setBalance(savedBalance);
  }, [navigate]);

  const addToCart = (product) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0) + product.price;
    if (total > balance) {
      alert('잔액이 부족합니다!');
      return;
    }
    setCart([...cart, product]);
  };

  const checkout = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const newBalance = balance - total;
    setBalance(newBalance);
    localStorage.setItem('balance', newBalance);

    const record = {
      groupName,
      items: cart,
      total,
      timestamp: new Date().toLocaleString()
    };
    const updatedHistory = [...purchaseHistory, record];
    setPurchaseHistory(updatedHistory);
    localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));

    alert('결제 완료!');
    setCart([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🛍 가상 장터 ({groupName})</h1>
      <p className="mb-2">잔액: {balance} 원</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {products.map((product) => (
          <div key={product.id} className="border p-2 rounded">
            <img src={product.image} alt={product.name} className="w-full h-24 object-cover mb-1" />
            <div>{product.name}</div>
            <div>{product.price} 원</div>
            <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-2 py-1 mt-2 rounded">담기</button>
          </div>
        ))}
      </div>
      <h2 className="text-lg font-semibold mb-2">🛒 장바구니</h2>
      <ul className="mb-2">
        {cart.map((item, i) => (
          <li key={i}>{item.name} - {item.price} 원</li>
        ))}
      </ul>
      <button onClick={checkout} className="bg-green-600 text-white px-4 py-2 rounded">결제하기</button>
    </div>
  );
}
