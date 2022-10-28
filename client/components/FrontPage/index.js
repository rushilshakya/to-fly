import React from "react";
import { useSelector } from "react-redux";

const FrontPage = () => {
  const products = useSelector((state) => state.products);

  return (
    <div className="wrapper region-md flow-md">
      <h3 className="h3 hero-title text-center">Browse our products</h3>
      <div className="flex space-evenly">
        {products.map((x) => (
          <div key={x.id}>{x.name}</div>
        ))}
      </div>
    </div>
  );
};

export default FrontPage;
