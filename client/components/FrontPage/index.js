import React from "react";
import { useSelector } from "react-redux";

import SingleProduct from "../SingleProduct";

const FrontPage = () => {
  const products = useSelector((state) => state.products);

  return (
    <div className="wrapper region-md flow-md padding-top-0">
      <h3 className="h3 hero-title text-center">Browse our products</h3>
      <div className="flex space-evenly">
        {products.map((x) => (
          <SingleProduct key={x.id} product={x} />
        ))}
      </div>
    </div>
  );
};

export default FrontPage;
