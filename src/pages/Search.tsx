import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Api, { IMedia } from '../api/api';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { styled } from 'styled-components';
import makeImgPath from '../utils/makeImgPath';
import Modal from '../components/Modal';
import { motion } from 'framer-motion';
import { imgVariants } from '../utils/hoverVarients';
import { infoVariants } from '../utils/hoverVarients';
import noImg from '../assets/noimg.jpg';

const Wrap = styled.section`
  padding: 150px 50px 20px;

  ul.search_list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;

    @media (max-width: 1600px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    li {
      margin-bottom: 50px;
      cursor: pointer;
    }
    img {
      width: 100%;
    }
  }
  @media (max-width: 968px) {
    padding: 0 15px;
  }
`;

export default function Search() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const api = new Api();
  const {
    state: { keyword },
  } = useLocation();
  const { isLoading, error, data } = useQuery(['search', keyword], () =>
    api.getSearch(keyword)
  );

  const ClickedMovie = data?.find((data: IMedia) => {
    return `${data.id}` === movieId;
  });

  return (
    <Wrap>
      {isLoading && <Loading />}
      {error ? <Error /> : null}
      <h2>"{keyword}" 검색결과</h2>
      {(!data || data.length === 0) && <div>검색결과가 없습니다.</div>}
      {data && (
        <ul className='search_list'>
          {data.map((search) => (
            <motion.li
              key={search.id}
              onClick={() => navigate(`${search.id}`, { state: { keyword } })}
              layoutId={`${'search' + search.id}`}
              variants={imgVariants}
              initial='normal'
              whileHover='hover'
            >
              <img
                src={makeImgPath(search.backdrop_path, 'w500')}
                alt={search.title || search.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = noImg;
                }}
              />
              <motion.div variants={infoVariants} className='slider_info'>
                <h4>{search.title || search.name}</h4>
                {search.original_title || search.title}
              </motion.div>
            </motion.li>
          ))}
        </ul>
      )}
      {ClickedMovie && <Modal movie={ClickedMovie} type='search' />}
    </Wrap>
  );
}
