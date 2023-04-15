import React from "react";
import { Link } from "react-router-dom";
import styles from "./ParkingPropertyDetails.module.css";
import CarParkAvailability from "./CarParkAvailability";

function ParkingPropertyDetails({ property }) {
  return (
    <div className={styles.property_details}>
      <div className={styles.property_header}>
        <h2 className={styles.property_name}>{property.name}</h2>
        <div className={styles.property_ratings}>
          <span className={styles.rating_value}>{property.rating}</span>
          <span className={styles.rating_total}>
            ({property.totalRatings} ratings)
          </span>
        </div>
      </div>
      <div className={styles.property_info}>
        <div className={styles.property_description}>
          <p>{property.description}</p>
        </div>
        <div className={styles.property_features}>
          <h3>Features:</h3>
          <ul className={styles.features_list}>
            {property.features.map((feature) => (
              <li key={feature} className={styles.feature_item}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.property_prices}>
        <h3>Prices:</h3>
        <ul className={styles.prices_list}>
          {property.prices.map((price) => (
            <li key={price.id} className={styles.price_item}>
              {price.description}: ${price.amount}
            </li>
          ))}
        </ul>
      </div>
      {/* <div className={styles.property_pictures}>
        <h3>Pictures:</h3>
        <div className={styles.carousel_container}>
          <div className={styles.carousel_track}>
            {property.pictures.map((picture) => (
              <img
                key={picture.id}
                src={picture.url}
                alt={picture.alt}
                className={styles.carousel_slide}
              />
            ))}
          </div>
          <div className={styles.carousel_navigation}>
            <button className={styles.carousel_button_prev}>&#10094;</button>
            <button className={styles.carousel_button_next}>&#10095;</button>
          </div>
        </div>
      </div> */}
      <div className={styles.property_pictures}>
        <h3>Pictures:</h3>
        {property.pictures.map((picture) => (
          <img
            src={picture.url}
            className={styles.preview_image}
            alt="upload"
          />
        ))}
      </div>
      {/* <div>{<CarParkAvailability />}</div> */}
      <div className={styles.property_booking}>
        <Link to={`/booking/${property.id}`}>
          <button className={styles.book_now_button}>Book Now</button>
        </Link>
      </div>
    </div>
  );
}

export default ParkingPropertyDetails;
