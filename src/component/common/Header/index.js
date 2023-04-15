import React from 'react';
import { AiOutlineAndroid } from "react-icons/ai";
import './index.css'

const Header = () => {
  return (
    <header className="k-flex k-jcsb k-aic k-pl16 k-pr16">
      <div className="logo k-flex k-jcsb k-aic">
        <AiOutlineAndroid /> <span>Order Management Tool</span>
      </div>
    </header>
  )
}

export default Header

