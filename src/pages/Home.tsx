import styled from 'styled-components';
import { useQuery } from 'react-query';
import Api from '../api/api';
import makeImgPath from '../utils/makeImgPath';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';

const Banner = styled.section<{ bg: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  background-image: ${(props) => `url(${props.bg})`};
  background-position: center center;
  background-size: cover;
`;

const BannerInfo = styled.div`
  position: absolute;
  bottom: 30%;
  left: 50px;
  h2 {
    font-size: 5rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
    width: 50%;
    line-height: 1.5;
  }
`;

export default function Home() {
  const api = new Api();
  const {
    isLoading,
    error,
    data: movies,
  } = useQuery(['movies', 'nowPlaying'], () => api.getMovies());

  const { data: videos } = useQuery(['videos'], () =>
    api.getMovies().then((data) => {
      const id = data.results[0].id;
      return api.getVideos(id);
    })
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
                url={`https://youtu.be/${videos?.results[0].key}`}
                width='100%'
                height='100vh'
                loop={true}
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
                initial={{ fontSize: '12rem', y: 0 }}
                animate={{
                  y: 150,
                  fontSize: '7rem',
                  transition: { delay: 5, duration: 1.5 },
                }}
              >
                {movies.results[0]?.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 1 }}
                animate={{
                  opacity: 0,
                  y: 150,
                  transition: { delay: 5, duration: 1.5 },
                }}
              >
                {movies.results[0]?.overview}
              </motion.p>
              <button style={{ backgroundColor: 'red' }}>시청하기</button>
              <button style={{ backgroundColor: 'red' }}>상세정보</button>
            </BannerInfo>
          </Banner>
        </>
      )}
    </section>
  );
}
