import { Button, Typography } from "@mui/material";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteYoutube, getUser } from "../../actions/user";
import "./YoutubeCard.css";
const YoutubeCard = ({
  url = "https://youtube.com/6packprogrammer",
  title = "Title Here",
  image,
  isAdmin = false,
  id,
}) => {
  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    await dispatch(deleteYoutube(id));
    dispatch(getUser());
  };

  return (
    <div className="youtubeCard cards">
      {/* <a href={url} target="blank">
        <img src={image} alt="Video" />
        <Typography>{title}</Typography>
      </a> */}
      <a href={url} target="blank" className="card">
        <img src={image} className="card__image" alt="" />
        <div className="card__overlay">
          <div className="card__header">
            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
              <path />
            </svg>
            <img
              className="card__thumb"
              src="./img/IMG_20220106_015505_216.jpg"
              alt=""
            />
            <div className="card__header-text">
              <h3 className="card__title">Diyorbek Yo'dashov</h3>
              <span className="card__status">1 hour ago</span>
            </div>
          </div>
          <p className="card__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
            blanditiis?
          </p>
        </div>
      </a>
      {isAdmin && (
        <Button
          style={{
            margin: "auto",
            display: "block",
            color: "rgba(40,40,40,0.7)",
          }}
          onClick={() => deleteHandler(id)}
        >
          <FaTrash />
        </Button>
      )}
    </div>
  );
};

export default YoutubeCard;
