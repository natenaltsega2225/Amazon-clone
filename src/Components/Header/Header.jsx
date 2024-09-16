import React from 'react';
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from './Header.module.css';
import LowerHeader from './LowerHeader';

const Header = () => {
  return (
    <>
        <section>
            <div className={classes.header_container}>
            {/* logo section */}
            <div className={classes.logo_container}>
        <a href=""><img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
        </a>
        

       {/* delivery */}
       <div className={classes.delivery}>

        <span>
            <SlLocationPin/>
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
            <input type="text"/>
            <BsSearch size={25}/>
            </div>



       {/* other section */}
       <div className={classes.order_container}>
        <a href="" className={classes.language}>
         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/383px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png" alt="" />
            
            <select name="" id="">
                <option value="">EN</option>
            </select>
        
            </a>

        <a href="">
            
                <p>Sign Inn</p>
                <span>Account & Lists</span>
            
        </a>
       
         <a href="">
            <p>returns</p>
            <span> & Orders</span>
         </a>
         
         <a href="" className={classes.cart}>         
         <BiCart size={35}/>
         <span>0</span>
         </a>

         </div>
         </div>
    </section>
    <LowerHeader/>
    </>
  )
}

export default Header