import React from "react";
import { landingPageStyles } from "./LandingPageStyles.js";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

const LandingPage = () => {
  return (
    <div className = {landingPageStyles.wrapper}>
      <div className = {landingPageStyles.container}>
        <div className ={landingPageStyles.contentWrapper}>
          <div className = {landingPageStyles.copyContainer}>
            <div className = {landingPageStyles.title}>
              Discover the list of companies and company details here
            </div>
            <div className = {landingPageStyles.description}>
              <Typewriter
                options={{
                  strings: ["Serving as a singular source of truth for all company details", "Providing a comprehensive list of companies", "Helping you find the information you need"],
                  changeDeleteSpeed: 1,
                  delay: 50,
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
            <div className = {landingPageStyles.buttonContainer}>
              <Link to={"/CompanyList"}>
                <button className = {landingPageStyles.accentedButton}>Company List</button>
              </Link>

              <Link to={"/CompanyDetails"}>
                <button className = {landingPageStyles.button}>Company Details</button>
              </Link>
            </div>
            </div>
            <img
              className="rounded-t-lg"
              src="https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s550"
              alt=""
            />
            </div>
            </div>
            </div>
  );
};

export default LandingPage;