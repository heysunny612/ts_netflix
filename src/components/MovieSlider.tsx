import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IMedia } from '../api/api';
import makeImgPath from '../utils/makeImgPath';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from './Modal';
import noImg from '../assets/noimg.jpg';
import { imgVariants } from '../utils/hoverVarients';
import { infoVariants } from '../utils/hoverVarients';

interface ImoviesPrpos {
  movies: IMedia[];
  title: string;
  ranking?: boolean;
  type: string;
}

export default function MovieSlider({
  movies,
  title,
  ranking,
  type,
}: ImoviesPrpos) {
  const navigate = useNavigate();
  const { category, movieId } = useParams();

  const ClickedMovie = movies.find((movie: IMedia) => {
    return type === category && `${movie.id}` === movieId;
  });

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <section className='slider_container'>
      <h2 className='slider_title'> {title} </h2>
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div
            className={`slider_list ${ranking ? 'ranking' : null}`}
            key={movie.id}
          >
            {ranking && (
              <div
                className={`raking_num ${movies.length - 1 ? 'last' : null}`}
              >
                {index + 1}
              </div>
            )}
            <motion.div
              className='slider_img'
              whileHover='hover'
              initial='normal'
              variants={imgVariants}
              transition={{ type: 'tween' }}
              onClick={() => navigate(`${type}/${movie.id}`)}
              role='button'
              layoutId={`${type + movie.id}`}
            >
              <img
                src={makeImgPath(
                  `${ranking ? movie.poster_path : movie.backdrop_path}`,
                  'w500'
                )}
                alt={movie.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = noImg;
                }}
              />
              <motion.div className='slider_info' variants={infoVariants}>
                <h4>{movie.title}</h4>
                {movie.original_title}
              </motion.div>
            </motion.div>
          </div>
        ))}
      </Slider>
      {ClickedMovie && <Modal movie={ClickedMovie} type={type} />}
    </section>
  );
}
