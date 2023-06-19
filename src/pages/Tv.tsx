import styled from 'styled-components';
import { useQuery } from 'react-query';
import Api from '../api/api';

import MovieSlider from '../components/MovieSlider';
import Banner from '../components/Banner';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Slider = styled.section`
  margin-top: -300px;
  z-index: 1;
`;

export default function Tv() {
  const api = new Api();

  const {
    isLoading: nowLoding,
    error: nowError,
    data: nowPlaying,
  } = useQuery(['tv', 'nowPlaying'], () => api.getTv('airing_today'), {
    staleTime: 50000,
  });

  const {
    isLoading: topLoading,
    error: topError,
    data: topRated,
  } = useQuery(['tv', 'topRated'], () => api.getTv('top_rated'), {
    staleTime: 50000,
  });

  return (
    <section>
      <>
        {topRated && (
          <Banner movie={topRated[0]} page='tv' type='tv_topRated' />
        )}
        {topLoading && <Loading />}
        {topError ? <Error /> : null}
        {topRated && (
          <Slider>
            <MovieSlider
              movies={topRated.slice(0, 10)}
              title='최고 평점을 받은 TV SHOW 추천'
              ranking={true}
              type='tv_topRated'
            />
          </Slider>
        )}

        {nowLoding && <Loading />}
        {nowError ? <Error /> : null}
        {nowPlaying && (
          <MovieSlider
            movies={nowPlaying}
            title='현재 절찬 상영중'
            type='tv_nowPlaying'
          />
        )}
      </>
    </section>
  );
}
