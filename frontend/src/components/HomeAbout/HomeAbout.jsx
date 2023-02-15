import React from "react";
import "./HomeAbout.css";
export default function HomeAbout({ aboutme }) {
  return (
    <section className="about">
      <div className="about_body">
        <div className="about_me">
          <div className="about_me_descr">
            <ul className="about_descr">
              {aboutme.map((item, i) => (
                <li className="about_descr_item" key={i}>
                  <div className="about_border"></div>
                  <div className="about_item">
                    <i className={item.icon}></i>
                    <span className="about_item_text">{item.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* <div className="about_hard_skills">
          <div className="container">
            <div className="card">
              <div className="box">
                <div className="percent">
                  <svg>
                    <circle cx="70" cy="70" r="70"></circle>
                    <circle cx="70" cy="70" r="70"></circle>
                  </svg>
                  <div className="num">
                    <h2>
                      90<span>%</span>
                    </h2>
                  </div>
                </div>
                <h2 className="text">Html</h2>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <div className="percent">
                  <svg>
                    <circle cx="70" cy="70" r="70"></circle>
                    <circle cx="70" cy="70" r="70"></circle>
                  </svg>
                  <div className="num">
                    <h2>
                      90<span>%</span>
                    </h2>
                  </div>
                </div>
                <h2 className="text">Html</h2>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <div className="percent">
                  <svg>
                    <circle cx="70" cy="70" r="70"></circle>
                    <circle cx="70" cy="70" r="70"></circle>
                  </svg>
                  <div className="num">
                    <h2>
                      90<span>%</span>
                    </h2>
                  </div>
                </div>
                <h2 className="text">Html</h2>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <div className="percent">
                  <svg>
                    <circle cx="70" cy="70" r="70"></circle>
                    <circle cx="70" cy="70" r="70"></circle>
                  </svg>
                  <div className="num">
                    <h2>
                      90<span>%</span>
                    </h2>
                  </div>
                </div>
                <h2 className="text">Html</h2>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <div className="percent">
                  <svg>
                    <circle cx="70" cy="70" r="70"></circle>
                    <circle cx="70" cy="70" r="70"></circle>
                  </svg>
                  <div className="num">
                    <h2>
                      90<span>%</span>
                    </h2>
                  </div>
                </div>
                <h2 className="text">Html</h2>
              </div>
            </div>
            <div className="card">
              <div className="box">
                <div className="percent">
                  <svg>
                    <circle cx="70" cy="70" r="70"></circle>
                    <circle cx="70" cy="70" r="70"></circle>
                  </svg>
                  <div className="num">
                    <h2>
                      90<span>%</span>
                    </h2>
                  </div>
                </div>
                <h2 className="text">Html</h2>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="about_soft_skills">
          <div className="container">
            <div className="card">
              <div className="imgBx"></div>
              <div className="contentBx">
                <h2>Team Work</h2>
                <div className="size">
                  <h3>Liked : 0</h3>
                </div>

                <a href="#">DisLike</a>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="card">
              <div
                className="imgBx"
                style={{ backgroundPosition: "35% 0" }}
              ></div>
              <div className="contentBx">
                <h2>Comunication</h2>
                <div className="size">
                  <h3>Liked : 0</h3>
                </div>

                <a href="#">DisLike</a>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="card">
              <div
                className="imgBx"
                style={{ backgroundPosition: "left 70% top 20px" }}
              ></div>
              <div className="contentBx">
                <h2>Problem Solving</h2>
                <div className="size">
                  <h3>Liked : 0</h3>
                </div>

                <a href="#">DisLike</a>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="card">
              <div
                className="imgBx"
                style={{ backgroundPosition: "left 100% top 35px" }}
              ></div>
              <div className="contentBx">
                <h2>Initiative and Enterprise</h2>
                <div className="size">
                  <h3>Liked : 0</h3>
                </div>

                <a href="#">DisLike</a>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="card">
              <div
                className="imgBx"
                style={{ backgroundPosition: "left 0% top 80%" }}
              ></div>
              <div className="contentBx">
                <h2>Planning and Organising</h2>
                <div className="size">
                  <h3>Liked : 0</h3>
                </div>

                <a href="#">DisLike</a>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="card">
              <div
                className="imgBx"
                style={{ backgroundPosition: "left 30% top 80%" }}
              ></div>
              <div className="contentBx">
                <h2>Self Awereness</h2>
                <div className="size">
                  <h3>Liked : 0</h3>
                </div>

                <a href="#">DisLike</a>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="card">
              <div
                className="imgBx"
                style={{ backgroundPosition: "left 68% top 90%" }}
              ></div>
              <div className="contentBx">
                <h2>Technology</h2>
                <div className="size">
                  <h3>Liked : 0</h3>
                </div>

                <a href="#">DisLike</a>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="card">
              <div
                className="imgBx"
                style={{ backgroundPosition: "left 100% top 90%" }}
              ></div>
              <div className="contentBx">
                <h2>Learning</h2>
                <div className="size">
                  <h3>Liked : 0</h3>
                </div>

                <a href="#">DisLike</a>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
