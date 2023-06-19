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
    isLoading: popularLoading,
    error: popularError,
    data: popular,
  } = useQuery(['tv', 'popular'], () => api.getTv('popular'), {
    staleTime: 50000,
  });

  const {
    isLoading: topLoading,
    error: topError,
    data: topRated,
  } = useQuery(['tv', 'topRated'], () => api.getTv('top_rated'), {
    staleTime: 50000,
  });

  const {
    isLoading: upcomingLoading,
    error: upcomingError,
    data: upcoming,
  } = useQuery(['tv', 'upcoming'], () => api.getTv('on_the_air'), {
    staleTime: 50000,
  });

  return (
    <section>
      <>
        {nowPlaying && <Banner movie={nowPlaying[0]} />}
        {topLoading && <Loading />}
        {topError ? <Error /> : null}
        {topRated && (
          <Slider>
            <MovieSlider
              movies={topRated.slice(1, 11)}
              title='최고 평점을 받은 TV SHOW 추천'
              ranking={true}
              type='topRated'
            />
          </Slider>
        )}

        {nowLoding && <Loading />}
        {nowError ? <Error /> : null}
        {nowPlaying && (
          <MovieSlider
            movies={nowPlaying}
            title='현재 절찬 상영중'
            type='nowPlaying'
          />
        )}

        {popularLoading && <Loading />}
        {popularError ? <Error /> : null}
        {popular && (
          <MovieSlider
            movies={popular.slice(0, 10)}
            title='오늘 글로벌 TOP10 시리즈'
            ranking={true}
            type='popular'
          />
        )}

        {upcomingLoading && <Loading />}
        {upcomingError ? <Error /> : null}
        {upcoming && (
          <MovieSlider
            movies={upcoming}
            title='일주일내로 상영되는 기대작'
            type='upcoming'
          />
        )}
      </>
    </section>
  );
}
