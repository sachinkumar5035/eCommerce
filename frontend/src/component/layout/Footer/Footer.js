import React from 'react';
import PlayStore from "../../../Images/playstore.png";
import AppStore from "../../../Images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">

      <div className="leftFooter">
        <h4>Download our app</h4>
        <p>Download app for android and IOS mobile phone</p>
        <img src={PlayStore} alt="playstore" />
        <img src={AppStore} alt="appstore" />
      </div>

      <div className="midFooter">
        <h1>codeMonk community</h1>
        <p>Deliver high quality product is our first priority</p>
        <p>copyrights 2023 &copy; sKumar </p>
      </div>

      <div className="rightFooter">
        <h4>Follow us on</h4>
        <a href="https://www.instagram.com/skumar.563/"> Instagram</a><br/>
        <a href="https://twitter.com/Sachink81720711">Twitter</a>
      </div>
    </footer>
  )
}

export default Footer
