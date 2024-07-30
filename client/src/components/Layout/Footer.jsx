import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center text-2xl">
        All right Reserved &#169;:sonuchahar7351
      </h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">privacy policy</Link>
      </p>
      <div className="flex items-center justify-between gap-5 mt-5">
        <div>
        <address className="">
          <h4 className="font-bold text-2xl">Address:-</h4>
          <p>NAME : CHAHAR ELECTRONIC SHOP & SERVICES</p>
          <p>SHOP : Kagarol, Kheraghar(283119)</p>
          <p>City : Agra</p>
          <p>State : UTTAR PRADESH</p>
        </address>
        </div>
        <div>
          <h5 className="font-bold text-2xl">Contact Us :-</h5>
           <p>PHONE NO. : 8171697502</p>
           <p>WHAT'S APP : 9837991258</p>
           <p>E-MAIL : amitchahar9837@gmail.com</p>
        </div>
        <div className="">
          <h5 className="font-bold text-2xl">SERVICES :-</h5>
          <p>provides direct-to-home (DTH) satellite television service</p>
          <p>Recharges All DTH</p>
          <p>Repair Electronic Products</p>
          <p>Repair Free-Dish sat-up-box</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
