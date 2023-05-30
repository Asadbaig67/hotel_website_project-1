import React from "react";
import style from "./About.module.css";
import about1 from "./img/about/about-1.jpg";
import gallery1 from "./img/gallery/gallery-1.jpg";
import gallery2 from "./img/gallery/gallery-2.jpg";
import gallery3 from "./img/gallery/gallery-3.jpg";
import gallery4 from "./img/gallery/gallery-4.jpg";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="conatiner-fluid">
        <section class={`${style.aboutus_page_section} mt-3`}>
          <div class="container">
            <div class={style.about_page_text}>
              <div class="row">
                <div class="col-lg-6">
                  <div class={style.ap_title}>
                    <h2>Welcome To Desalis.</h2>
                    <p style={{ fontFamily: "Rubik" }}>
                      Built in 1910 during the Belle Epoque period, this hotel
                      is located in the center of Paris, with easy access to the
                      city’s tourist attractions. It offers tastefully decorated
                      rooms.
                    </p>
                  </div>
                </div>
                <div
                  class="col-lg-5 offset-lg-1"
                  style={{ fontFamily: "Rubik" }}
                >
                  <ul class="ap-services">
                    <li>
                      <i class={style.icon_check}></i> 20% Off On Accommodation.
                    </li>
                    <li>
                      <i class={style.icon_check}></i> Complimentary Daily
                      Breakfast
                    </li>
                    <li>
                      <i class={style.icon_check}></i> 3 Pcs Laundry Per Day
                    </li>
                    <li>
                      <i class={style.icon_check}></i> Free Wifi.
                    </li>
                    <li>
                      <i class={style.icon_check}></i> Discount 20% On F&B
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class={style.about_page_services}>
              <div class="row">
                <div class="col-md-4">
                  <div
                    class={`${style.ap_service_item} ${style.set_bg}`}
                    style={{
                      backgroundImage: `url(${about1})`,
                      height: "400px",
                    }}
                  >
                    <div class={style.api_text}>
                      <h3>Restaurants Services</h3>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div
                    class={`${style.ap_service_item} ${style.set_bg}`}
                    style={{
                      backgroundImage: `url(${about1})`,
                      height: "400px",
                    }}
                  >
                    <div class={style.api_text}>
                      <h3>Travel & Camping</h3>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div
                    class={`${style.ap_service_item} ${style.set_bg}`}
                    style={{
                      backgroundImage: `url(${about1})`,
                      height: "400px",
                    }}
                  >
                    <div class={style.api_text}>
                      <h3>Event & Party</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          class={`${style.video_section} ${style.set_bg}`}
          data-setbg="img/video-bg.jpg"
        >
          <div class="container">
            <div
              class="row"
              style={{ backgroundImage: `url(${gallery1})`, height: "300px" }}
            >
              <div class="col-lg-12">
                <div class={style.video_text}>
                  <h2>Discover Our Hotel & Services.</h2>
                  <p>
                    It S Hurricane Season But We Are Visiting Hilton Head Island
                  </p>
                  <a href="/" class="play-btn video-popup">
                    <img src="img/play.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class={`${style.gallery_section} ${style.spad}`}>
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class={style.section_title}>
                  <span>Our Gallery</span>
                  <h2>Discover Our Work</h2>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <div
                  class={`${style.gallery_item} ${style.set_bg}`}
                  style={{ backgroundImage: `url(${gallery1})` }}
                >
                  <div class={style.gi_text}>
                    <h3>Room Luxury</h3>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div
                      class={`${style.gallery_item} ${style.set_bg}`}
                      style={{ backgroundImage: `url(${gallery3})` }}
                    >
                      <div class={style.gi_text}>
                        <h3>Room Luxury</h3>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div
                      class={`${style.gallery_item} ${style.set_bg}`}
                      style={{ backgroundImage: `url(${gallery4})` }}
                    >
                      <div class={style.gi_text}>
                        <h3>Room Luxury</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div
                  class={`${style.gallery_item} ${style.set_bg}`}
                  style={{
                    backgroundImage: `url(${gallery2})`,
                    height: "580px",
                  }}
                >
                  <div class={style.gi_text}>
                    <h3>Room Luxury</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
