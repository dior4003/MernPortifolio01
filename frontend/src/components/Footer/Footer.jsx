import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import {BsTelegram, BsGithub, BsYoutube, BsInstagram, BsLinkedin } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <Typography variant="h5">About Me</Typography>
        <Typography>
          Hey, my name is Diorbek Yoldashov. I am a Full-Stack Developer. If you
          have any questions or suggestions, please contact me in my telegram
          group or I will definitely answer you.
        </Typography>

        <Link to="/contact" className="footerContactBtn">
          <Typography>Contact Us</Typography>
        </Link>
      </div>
      <div>
        <Typography variant="h6">Social Media</Typography>
        <a href="https://github.com/dior4003" target="black">
          <BsGithub />
        </a>
        <a href="https://www.youtube.com/@dioryoldashov" target="black">
          <BsYoutube />
        </a>
        <a href="https://instagram.com/by_d1or/" target="black">
          <BsInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/dior-dior-51769a238/"
          target="black"
        >
          <BsLinkedin />
        </a>
               <a
          href="https://t.me/diorbekyoldashov"
          target="black"
        >
          <BsTelegram />
        </a>
      </div>
    </div>
  );
};

export default Footer;
