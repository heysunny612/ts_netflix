import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IMovie } from '../api/api';
import makeImgPath from '../utils/makeImgPath';
import { Variants, motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from './Modal';

interface ImoviesPrpos {
  movies: IMovie[];
  title: string;
  ranking?: boolean;
}

const imgVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    transition: { delay: 0.3 },
    y: -10,
  },
};

const infoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.3 },
  },
};

export default function MovieSlider({ movies, title, ranking }: ImoviesPrpos) {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const ClickedMovie = movieId && movies.find((movie) => movie.id === +movieId);

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
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
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
              onClick={() => navigate(`/movies/${movie.id}`)}
              role='button'
              layoutId={movie.id + ''}
            >
              <img
                src={makeImgPath(
                  `${ranking ? movie.poster_path : movie.backdrop_path}`,
                  'w500'
                )}
                alt={movie.title}
              />
              <motion.div className='slider_info' variants={infoVariants}>
                <h4>{movie.title}</h4>
                {movie.original_title}
              </motion.div>
            </motion.div>
          </div>
        ))}
      </Slider>
      {ClickedMovie && <Modal movie={ClickedMovie} />}
    </section>
  );
}
