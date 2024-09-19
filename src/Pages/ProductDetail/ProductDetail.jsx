import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import { productUrl } from "../../Api/endPoints";
import { useParams } from "react-router";
import Loader from "../../Components/Loader/Loader";
import axios from "axios";




function ProductDetail() {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
