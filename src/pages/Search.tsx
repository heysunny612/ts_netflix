import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Api, { IMedia } from '../api/api';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { styled } from 'styled-components';
import makeImgPath from '../utils/makeImgPath';
import Modal from '../components/Modal';
import { motion } from 'framer-motion';

const Wrap = styled.section`
  padding: 150px 50px;
  min-height: 5000px;
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
  console.log(ClickedMovie);

  return (
    <Wrap>
      {isLoading && <Loading />}
      {error ? <Error /> : null}
      <h2>"{keyword}" 검색결과</h2>
      {(!data || data.length === 0) && <div>검색결과가 없습니다.</div>}
      {data && (
        <ul>
          {data.map((search) => (
            <motion.li
              key={search.id}
              onClick={() => navigate(`${search.id}`, { state: { keyword } })}
              layoutId={`${'search' + search.id}`}
            >
              <img src={makeImgPath(search.backdrop_path, 'w500')} alt='' />
              {search.title}
            </motion.li>
          ))}
        </ul>
      )}
      {ClickedMovie && <Modal movie={ClickedMovie} type='search' />}
    </Wrap>
  );
}
