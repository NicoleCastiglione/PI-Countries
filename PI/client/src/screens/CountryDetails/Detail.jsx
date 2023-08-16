import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../../redux/actions";
import { useEffect } from "react";
import styles from "./Detail.module.css";

export const Detail = () => {
  const { id } = useParams();
  const countries = useSelector((state) => state.countryDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [id]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.containerImage}>
          <h1 className={styles.countryName}>{countries?.name}</h1>
          <img
            className={styles.flag}
            src={countries?.imageFlag}
            alt={countries?.name}
          />
        </div>

        <div>
          <div className={styles.containerDetails}>
            <h1 className={styles.title}>Country Data</h1>
            <h3 className={styles.text}>Continent: {countries?.continent} </h3>
            <h3 className={styles.text}>Capital: {countries?.capital}</h3>
            <h3 className={styles.text}>Subregion: {countries?.subregion}</h3>
            <h3 className={styles.text}>Area: {countries?.area} km²</h3>
            <h3 className={styles.text}>Population: {countries?.population}</h3>
          </div>

          <div className={styles.containerDetails}>
            <h1 className={styles.title}>Tourist Activities</h1>

            <div className={styles.activity}>
              {countries?.Activities?.length > 0 ? (
                countries?.Activities?.map((activity) => (
                  <div className={styles.actcontainer}>
                    <h3 className={styles.titleAct}>{activity.name}</h3>
                    <h5 className={styles.text}>
                      Difficulty: {activity.difficulty}
                    </h5>
                    <h5 className={styles.text}>
                      Duration: {activity.duration} hs
                    </h5>
                    <h5 className={styles.text}>Season: {activity.season}</h5>
                  </div>
                ))
              ) : (
                <p className={styles.actEmpty}>
                  No Tourist Activities added so far
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
