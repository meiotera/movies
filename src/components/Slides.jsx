import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import style from './Slides.module.css';

const Slides = ({ posters }) => {
  return (
    <div className={style.slideContainer}>
      <Slide
        autoplay={true}
        indicators={true}
        duration={5000}
        pauseOnHover={true}
        infinite={true}
        onChange={function noRefCheck() {}}
        onStartChange={function noRefCheck() {}}
      >
        {posters
          .filter((poster) => poster.vote_average >= 6.5)
          .map((poster) => (
            <div className={style.eachSlideEffect}>
              <div
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${poster.poster})`,
                }}
              >
                <span className={style.span}>{poster.title}</span>
              </div>
            </div>
          ))}
      </Slide>
    </div>
  );
};

export default Slides;
