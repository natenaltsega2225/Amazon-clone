import React, { useContext } from "react";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";



const Header = () => {
  const [{ basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <>
      <section className={classes.fixed}>
        <section>
          <div className={classes.header_container}>
            {/* logo section */}
            <div className={classes.logo_container}>
              <Link to="/">
                <img
                  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="amazon logo"
                />
              </Link>

              {/* delivery */}
              <div className={classes.delivery}>
                <span>
                  <SlLocationPin />
                </span>
                <div>
                  <p>Delivered to</p>
                  <span>United States</span>
                </div>
              </div>
            </div>
            {/* search bar */}
            <div className={classes.search}>
              <select name="" id="">
                <option value="">All</option>
              </select>
              <input type="text" />
              <BsSearch size={25} />
            </div>

            {/* other section */}
            <div className={classes.order_container}>
              <Link to="/" className={classes.language}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/383px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
                  alt=""
                />

                <select name="" id="">
                  <option value="">EN</option>
                </select>
              </Link>
              <Link to="/auth">
                <p>Hello,Sign Inn</p>
                <span>Account & Lists</span>
              </Link>

              <Link to="/orders">
                <p>Returns</p>
                <span> & Orders</span>
              </Link>

              <Link to="/cart" className={classes.cart}>
                <BiCart size={35} />
                <span>{totalItem}</span>
              </Link>
            </div>
          </div>
        </section>
      </section>
      <LowerHeader />
    </>
  );
};

export default Header;
