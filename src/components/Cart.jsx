const Cart = () => {
  return (
    <div className="page-container cart">
      <h1 className="page-title">Your Cart 🛒</h1>
      <div className="cart-empty">
        <span className="cart-empty-icon">🍽️</span>
        <p>Your cart is empty.</p>
        <p className="cart-empty-sub">Add some delicious items to get started!</p>
      </div>
    </div>
  );
};

export default Cart;
