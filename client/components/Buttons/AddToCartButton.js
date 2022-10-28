const AddToCartButton = ({ product }) => {
  const handleSubmit = () => {
    console.log("submit", product);
  };
  return (
    <button type="submit" className="buy-button" onClick={handleSubmit}>
      Add to cart
    </button>
  );
};

export default AddToCartButton;
