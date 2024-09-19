import React from "react";
import { categoryImage } from "./categoryfullinfos";
import CategoryCard from "./CategoryCard";
import classes from "./category.module.css";




function Category() {
  return (
    <section className={classes.category__container}>
      {categoryImage.map((image) => (
        <CategoryCard key={image.name} data={image} />
      ))}
    </section>
  );
}

export default Category;
