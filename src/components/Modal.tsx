import { AnimatePresence, motion } from 'framer-motion';
import Api, { IMovie } from '../api/api';
import { styled } from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import makeImgPath from '../utils/makeImgPath';
import { MdClose } from 'react-icons/md';
import { useBodyScrollLock } from '../utils/useLockBodyScroll';

const ModalBox = styled(motion.article)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100vh;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
`;

const ModalContent = styled(motion.div)`
  position: relative;
  width: 50%;
  max-height: 100vh;
  background-color: #141414;
  color: #fff;
  z-index: 999;
  overflow: auto; /* 스크롤을 허용하는 속성 */

  /* 스크롤바 커스터마이징 */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }

  @media (max-width: 1400px) {
    width: 70%;
  }
  @media (max-width: 1028px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const ModalBg = styled.div<{ bg: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)),
    ${(props) => `url(${props.bg})`};
  background-position: center center;
  background-size: cover;
  min-height: 350px;
`;

const Content = styled.div`
  padding: 0 50px 50px;
  margin-top: -100px;

  h3 {
    font-size: 2.5rem;
    margin: 0;
  }
  p {
    line-height: 1.5;
  }
  button {
    color: #ffffff;
    background-color: #141414;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border: 2px solid #fff;
    border-radius: 20px;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    display: flex;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }
    div.img {
      width: 200px;
      margin-right: 50px;
      flex-shrink: 0;
    }
    div.info {
      text-align: left;
      line-height: 1.7;
      color: #d2d2d2;
      span {
        color: #fff;
        padding-left: 10px;
        img {
          height: 20px;
        }
      }
    }
  }
`;

interface IModalProps {
  movie: IMovie;
  type: string;
}

export default function Modal({ movie, type }: IModalProps) {
  const location = useLocation();
  const isTvPage = location.pathname.startsWith('/tv');
  const { lockScroll, unLockScroll } = useBodyScrollLock();

  const api = new Api();
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery(
    ['detail', isTvPage],
    () => api.getDetail(Number(movie.id), isTvPage ? 'tv' : 'movie'),
    { staleTime: 1000 * 6 * 10 }
  );

  const bg = makeImgPath(movie.backdrop_path, 'w500');
  const poster = makeImgPath(movie.poster_path, 'w500');
  movieId && lockScroll();

  return (
    <AnimatePresence>
      {movieId ? (
        <ModalBox
          onClick={() => {
            unLockScroll();
            navigate(-1);
          }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            layoutId={`${type + movie.id}`}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
          >
            <ModalBg bg={bg}></ModalBg>
            <Content>
              <h3>
                {movie.title} ({movie.original_title})
              </h3>
              <p>{movie.overview}</p>
              <motion.button
                onClick={() => {
                  unLockScroll();
                  navigate(-1);
                }}
                whileHover={{ scale: 1.2 }}
                initial={{ scale: 1 }}
              >
                <MdClose />
              </motion.button>
              <div className='content'>
                <div className='img'>
                  <img src={poster} alt='' width='100%' />
                </div>
                <div className='info'>
                  <h4>상세정보</h4>
                  <ul>
                    <li>
                      평점
                      <span>
                        {data?.vote_average} (
                        {data?.vote_count.toLocaleString()}명 참여)
                      </span>
                    </li>
                    {data?.runtime && (
                      <li>
                        런타임
                        <span> {data?.runtime} 분</span>
                      </li>
                    )}
                    {data?.release_date && (
                      <li>
                        출시일
                        <span> {movie.release_date}</span>
                      </li>
                    )}
                    <li>
                      장르
                      {data?.genres.map((genre, index) => (
                        <span key={index}>{genre.name}</span>
                      ))}
                    </li>
                    <li>
                      프로덕션
                      {data?.production_companies.map((v, i) => (
                        <span key={i}>{v.name}</span>
                      ))}
                    </li>
                    <li>
                      만든나라
                      {data?.production_countries.map((v, i) => (
                        <span key={i}>{v.name}</span>
                      ))}
                    </li>
                    <li>
                      등급
                      <span>
                        {data?.adult === false ? '전체관람가' : '19세이상'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              {isLoading && <p>로딩중입니다</p>}
              {error ? <p>잠시후 다시 시도해주세요</p> : null}
            </Content>
          </ModalContent>
        </ModalBox>
      ) : null}
    </AnimatePresence>
  );
}
