import styled from 'styled-components';
import makeImgPath from '../utils/makeImgPath';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useQuery } from 'react-query';
import Api, { IMedia } from '../api/api';
import { useMediaQuery } from '@react-hook/media-query';
import { useNavigate } from 'react-router-dom';

interface IBannerProps {
  movie: IMedia;
  page?: string;
  type: string;
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
  @media (max-width: 767px) {
    padding: 0 15px;
  }

  h2 {
    font-size: 4rem;
    margin-bottom: 0.5rem;

    @media (max-width: 767px) {
      font-size: 2rem;
    }
  }
  p {
    font-size: 1.2rem;
    width: 60%;
    height: 85px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 1.5em;

    @media (max-width: 767px) {
      font-size: 1rem;
      width: 90%;
      height: 70px;
    }
  }
  div {
    display: flex;
    gap: 15px;
  }
`;

export default function Banner({ movie, page, type }: IBannerProps) {
  const api = new Api();
  const navigate = useNavigate();
  const { data: videos } = useQuery(
    ['videos'],
    () => api.getVideos(movie?.id || 0),
    { staleTime: 1000 * 6 * 10 }
  );

  const handleClick = () => navigate(`${type}/${movie?.id}`);
  const isSmallScreen = useMediaQuery('(max-width:1024px)');
  return (
    <>
      <BannerWrap bg={makeImgPath(movie?.backdrop_path || '')}>
        {page !== 'tv' && !isSmallScreen && videos && videos?.length !== 0 && (
          <ReactPlayer
            url={videos?.map((video) => `https://youtu.be/${video.key}`)}
            loop={true}
            playing={true}
            muted={true}
            controls={false}
            width='100%'
            height='100vh'
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
              transition: { delay: 3, duration: 1 },
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
              transition: { delay: 3, duration: 0 },
            }}
          >
            {movie.overview}
          </motion.p>
          <div>
            <Button accent='accent'>
              <FaPlay />
              재생
            </Button>
            <Button onClick={handleClick}>
              <AiOutlineInfoCircle />
              상세 정보
            </Button>
          </div>
        </BannerInfo>
      </BannerWrap>
    </>
  );
}
