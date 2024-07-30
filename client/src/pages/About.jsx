import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title="About us - e-commerce">
      <div className="px-24 py-5">
        <div className="contactus gap-14 mt-2">
          <div className="">
            <img
              src="images/aboutus.avif"
              alt="about Us"
              style={{ width: "100%" }}
            />
          </div>
          <div className="flex flex-col justify-center">
           
            <div>
              <p className="mt-1 text-balance">
                Chahar Electronic is a shop, we are the best seller and services
                provider. We give multitple types of servieces and Also we sell
                electronic products like television, LED, DTH, small size Music
                System and also sell some home decoration products
              </p>

              <p>provides direct-to-home (DTH) satellite television service</p>
              <p>Recharges All DTH</p>
              <p>Repair Electronic Products</p>
              <p>Repair Free-Dish sat-up-box</p>

              <h4 className="mt-2 text-base font-medium">
                If you want any types of given services please contact us
              </h4>
            </div>
            <div>
              <address className="">
                <h4 className="font-bold text-2xl">Address:-</h4>
                <p>NAME : CHAHAR ELECTRONIC SHOP & SERVICES</p>
                <p>SHOP : Kagarol, Kheraghar(283119)</p>
                <p>City : Agra</p>
                <p>State : UTTAR PRADESH</p>
              </address>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
