import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IMovie } from '../api/api';
import makeImgPath from '../utils/makeImgPath';

interface ImoviesPrpos {
  movies: IMovie[];
  title: string;
}

export default function MovieSlider({ movies, title }: ImoviesPrpos) {
  const settings = {
    dots: true,
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
        {movies.map((movie) => (
          <div className='slider_list' key={movie.id}>
            <img
              src={makeImgPath(movie.backdrop_path, 'w500')}
              alt={movie.title}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
