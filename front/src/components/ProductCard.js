import "./../style/ProductCard.css";

export default function ProductCard({ item }) {
  return (
    <div className="product-card">
      <img src={item.img} alt="img" />
      <span className="product-card-category">{item.category}</span>
      <h2 className="product-card-title">{item.title}</h2>
      <span className="product-card-text">{item.text}</span>
      <span className="product-card-price">${item.price}</span>
    </div>
  );
}
