import styled from 'styled-components';
import makeImgPath from '../utils/makeImgPath';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useQuery } from 'react-query';
import Api, { IMedia } from '../api/api';

interface IBannerProps {
  movie: IMedia;
  page: string;
}

const BannerWrap = styled.section<{ bg: string }>`
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

export default function Banner({ movie, page }: IBannerProps) {
  const api = new Api();
  const { data: videos } = useQuery(
    ['videos'],
    () => api.getVideos(movie?.id || 0),
    {
      staleTime: 1000 * 6 * 10,
    }
  );

  return (
    <>
      <BannerWrap bg={makeImgPath(movie?.backdrop_path || '')}>
        {page !== 'tv' && videos && (
          <ReactPlayer
            url={videos.results.map((video) => `https://youtu.be/${video.key}`)}
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
            {movie.title}
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
            {movie.overview}
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
      </BannerWrap>
    </>
  );
}
