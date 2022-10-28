const SingleProduct = ({ product }) => (
  <div className="polaroid">
    <img src={product.image_url} alt="product" />
    <div className="container">
      <p>{product.name}</p>
    </div>
  </div>
);

export default SingleProduct;
