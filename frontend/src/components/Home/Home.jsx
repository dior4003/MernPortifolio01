import React, { useEffect } from "react";
import "./Home.css";
import * as THREE from "three";
import moonImage from "../../Images/moon.jpg";
import venusImage from "../../Images/earth1.jpg";
import spaceImage from "../../Images/space2.jpg";
import { Typography } from "@mui/material";
import TimeLine from "../TimeLine/TimeLine";
import {
  SiReact,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiCss3,
  SiHtml5,
  SiThreedotjs,
} from "react-icons/si";
import YoutubeCard from "../YoutubeCard/YoutubeCard";
import { Link } from "react-router-dom";
import HomeAbout from "../HomeAbout/HomeAbout";

const Home = ({ timelines, youtubes, skills ,aboutme}) => {
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();

    const moonTexture = textureLoader.load(moonImage);
    const venusTexture = textureLoader.load(venusImage);
    const spaceTexture = textureLoader.load(spaceImage);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(-2, 4, 16);

    const canvas = document.querySelector(".homeCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas });

    const moonGeometry = new THREE.SphereGeometry(1.5, 64, 64);
    const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);

    const venusGeometry = new THREE.SphereGeometry(2.5, 81, 64);
    const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
    const venus = new THREE.Mesh(venusGeometry, venusMaterial);
    venus.position.set(8, 5, 5);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    const pointLight2 = new THREE.PointLight(0xffffff, 0.5);

    pointLight.position.set(8, 5, 5);
    pointLight2.position.set(-8, -5, -5);

    scene.add(moon);
    scene.add(venus);
    scene.add(pointLight);
    scene.add(pointLight2);
    scene.background = spaceTexture;

    const constSpeed = 0.01;
    window.addEventListener("mousemove", (e) => {
      if (e.clientX <= window.innerWidth / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y += constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y += constSpeed;
      }

      if (e.clientX > window.innerWidth / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y -= constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y -= constSpeed;
      }

      if (e.clientY > window.innerHeight / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y += constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y += constSpeed;
      }

      if (e.clientY <= window.innerHeight / 2) {
        moon.rotation.x -= constSpeed;
        moon.rotation.y -= constSpeed;
        venus.rotation.x -= constSpeed;
        venus.rotation.y -= constSpeed;
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      moon.rotation.y += 0.001;
      venus.rotation.y += 0.001;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };

    animate();

    return window.addEventListener("scroll", () => {
      camera.rotation.z = window.scrollY * 0.001;
      camera.rotation.y = window.scrollY * 0.003;

      const skillsBox = document.getElementById("homeskillsBox");

      if (window.scrollY > 1300) {
        skillsBox.style.animationName = "homeskillsBoxAnimationOn";
      } else {
        skillsBox.style.animationName = "homeskillsBoxAnimationOff";
      }
    });
  }, []);

  return (
    <div className="home">
      <canvas className="homeCanvas"></canvas>

      <div className="homeCanvasContainer">
        {/* <Typography variant="h1">
          <p>A</p>
          <p>B</p>
          <p>H</p>
          <p>I</p>
          <p>S</p>
          <p>H</p>
          <p>E</p>
          <p>K</p>
        </Typography> */}
        {/* <DemoScene/> */}

        <div className="homeCanvasBox">
          <Typography variant="h2">I'am</Typography>
          <Typography variant="h2">Full-stack</Typography>
          <Typography variant="h2">Developer</Typography>
          <Typography variant="h2">Yo'ldasho'v Diyorbek</Typography>
        </div>

        <Link to="/projects">VIEW WORK</Link>
      </div>


      <div className="homeContainer">
        <Typography variant="h3">TIMELINE</Typography>
        <TimeLine timelines={timelines} />
      </div>

      <div className="homeSkills">
        <Typography variant="h3">SKILLS</Typography>

        <div className="homeCubeSkills">
          <div className="homeCubeSkillsFaces homeCubeSkillsFace1">
            <img src={skills ? skills.image1.url : ""} alt="Face1" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace2">
            <img src={skills ? skills.image2.url : ""} alt="Face2" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace3">
            <img src={skills ? skills.image3.url : ""} alt="Face3" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace4">
            <img src={skills ? skills.image4.url : ""} alt="Face4" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace5">
            <img src={skills ? skills.image5.url : ""} alt="Face5" />
          </div>

          <div className="homeCubeSkillsFaces homeCubeSkillsFace6">
            <img src={skills ? skills.image6.url : ""} alt="Face6" />
          </div>
        </div>


        <div className="homeskillsBox" id="homeskillsBox">
          <SiHtml5 />
          <SiCss3 />
          <SiJavascript />
          <SiMongodb />
          <SiExpress />
          <SiReact />
          <SiNodedotjs />
          <SiThreedotjs />
        </div>
      </div>
      <HomeAbout aboutme={aboutme} />
      <div className="homeYoutube">
        <Typography variant="h3"> YOUTUBE VIDEOS</Typography>

        <div className="homeYoutubeWrapper">
          {youtubes.map((item) => (
            <YoutubeCard
              image={item.image.url}
              title={item.title}
              url={item.url}
              id={item._id}
              key={item._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
