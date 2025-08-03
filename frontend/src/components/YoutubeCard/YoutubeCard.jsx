import { Button, Typography } from "@mui/material";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteYoutube, getUser } from "../../actions/user";
import "./YoutubeCard.css";
const YoutubeCard = ({
  url = "https://youtube.com/6packprogrammer",
  date,
  title = "Title Here",
  author,
  image,
  isAdmin = false,
  id,
}) => {
 
const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);


  const deleteHandler = async (id) => {
    await dispatch(deleteYoutube(id));
    dispatch(getUser());
  };
function Time(postTime) {
  const now = new Date();
  const postDate = new Date(postTime);
  const diffMs = now - postDate;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // taxminiy
  const years = Math.floor(days / 365); // taxminiy

  if (years >= 1) {
    // 1 yildan oshgan bo‘lsa — faqat sanani qaytaradi
    return postDate.toISOString().split("T")[0]; // YYYY-MM-DD
  } else if (months >= 1) {
    return `${months} month ago`;
  } else if (hours >= 1) {
    return `${hours} hour ago`;
  } else {
    return `${minutes} minut ago`;
  }
}

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
		              src={user.about.avatar.url}
              alt="rasm"
            />
            <div className="card__header-text">
              <h3 className="card__title">@by_dior</h3>
              <span className="card__status">{Time(date)}</span>
            </div>
          </div>
          <p className="card__description">
            {title}
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
