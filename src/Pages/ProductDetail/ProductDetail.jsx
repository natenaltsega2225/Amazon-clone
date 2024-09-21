import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import { productUrl } from "../../Api/endPoints";
import { useParams } from "react-router";
import Loader from "../../Components/Loader/Loader";
import axios from "axios";
import styles from "./ProductDetail.module.css"; // Import CSS Module




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
        setIsLoading(false); // Don't forget to handle the loading state in case of an error
      });
  }, [productId]);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.productDetailContainer}>
          <ProductCard
            product={product}
            flex={true}
            renderDesc={true}
            renderAdd={true}
            className={styles.productCard} // Apply CSS Module class
          />
        </div>
      )}
    </LayOut>
  );
}

export default ProductDetail;

