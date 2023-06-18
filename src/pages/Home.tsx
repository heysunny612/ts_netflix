import styled from 'styled-components';
import { useQuery } from 'react-query';
import Api from '../api/api';
import makeImgPath from '../utils/makeImgPath';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import MovieSlider from '../components/MovieSlider';

const Banner = styled.section<{ bg: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    ${(props) => `url(${props.bg})`};
  background-position: center center;
  background-size: cover;
`;

const BannerInfo = styled.div`
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  bottom: 0;
  padding: 0 50px;

  h2 {
    font-size: 4rem;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1.2rem;
    width: 60%;
    line-height: 1.5;
    height: 80px;
    overflow: hidden;
  }
  div {
    display: flex;
    gap: 15px;
  }
`;

const Slider = styled.section`
  margin-top: -300px;
  position: relative;
  z-index: 99;
`;

export default function Home() {
  const api = new Api();
  const {
    isLoading,
    error,
    data: movies,
  } = useQuery(['movies', 'nowPlaying'], () => api.getMovies(), {
    staleTime: 50000,
  });

  const { data: videos } = useQuery(
    ['videos'],
    () =>
      api.getMovies().then((data) => {
        const id = data.results[0].id;
        return api.getVideos(id);
      }),
    { staleTime: 50000 }
  );
  return (
    <section>
      {isLoading && <p>로딩중니다</p>}
      {error ? <p>에러입니다</p> : null}
      {movies && (
        <>
          <Banner bg={makeImgPath(movies.results[0]?.backdrop_path || '')}>
            {videos && (
              <ReactPlayer
                url={videos.results.map(
                  (video) => `https://youtu.be/${video.key}`
                )}
                width='100%'
                height='100vh'
                loop={false}
                playing={true}
                muted={true}
                controls={false}
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      loop: 1,
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                    },
                  },
                }}
                pip={true}
              />
            )}
            <BannerInfo>
              <motion.h2
                initial={{
                  transform: 'scale(1.2)',
                  transformOrigin: 'left bottom',
                }}
                animate={{
                  transform: 'scale(1) translate3d(0px, 80px, 0px)',
                  transition: { delay: 5, duration: 1 },
                }}
              >
                {movies.results[0]?.title}
              </motion.h2>
              <motion.p
                initial={{
                  transform: 'scale(1)',
                  transformOrigin: 'left bottom',
                }}
                animate={{
                  transform: 'scale(0)',
                  transition: { delay: 5, duration: 0 },
                }}
              >
                {movies.results[0]?.overview}
              </motion.p>
              <div>
                <Button accent='accent'>
                  <FaPlay />
                  재생
                </Button>
                <Button>
                  <AiOutlineInfoCircle />
                  상세 정보
                </Button>
              </div>
            </BannerInfo>
          </Banner>
          <Slider>
            <MovieSlider
              movies={movies?.results.slice(1, 11)}
              title='오늘 글로벌 TOP10 시리즈'
              ranking={true}
            />
          </Slider>
          {/* <MovieSlider
            movies={movies?.results.slice(1, 11)}
            title='새로 올라온 컨텐츠'
          /> */}
        </>
      )}
    </section>
  );
}
