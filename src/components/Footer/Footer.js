import React from "react";
import "./footer.scss";
function Footer() {
  return (
    <footer className="container footer">
      <h1>MyAnime</h1>
      <ul>
        <li>Get started</li>
        <li>Home</li>
        <li>Sign up</li>
        <li>Dowloads</li>
      </ul>
      <ul>
        <li>About us</li>
        <li>Company</li>
        <li>Imformation</li>
      </ul>
      <ul>
        <li>Support</li>
        <li>FAQ</li>
        <li>Help desk</li>
      </ul>
      <ul className="icon">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </footer>
  );
}

export default Footer;
