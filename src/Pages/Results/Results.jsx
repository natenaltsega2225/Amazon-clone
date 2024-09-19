import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import classes from "./Results.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader"; 



function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize with true to show loader
  const { categoryName } = useParams();

  useEffect(() => {
    setIsLoading(true); // Set loading to true when a new request starts
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false); // Data fetched, stop loading
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Stop loading on error
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader /> // Loading spinner when waiting for data
        ) : (
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
