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

export default function Home() {
  const api = new Api();

  const {
    isLoading: nowLoding,
    error: nowError,
    data: nowPlaying,
  } = useQuery(['movies', 'nowPlaying'], () => api.getMovies('now_playing'), {
    staleTime: 50000,
  });

  const {
    isLoading: popularLoading,
    error: popularError,
    data: popular,
  } = useQuery(['movies', 'popular'], () => api.getMovies('popular'), {
    staleTime: 50000,
  });

  const {
    isLoading: topLoading,
    error: topError,
    data: topRated,
  } = useQuery(['movies', 'topRated'], () => api.getMovies('top_rated'), {
    staleTime: 50000,
  });

  const {
    isLoading: upcomingLoading,
    error: upcomingError,
    data: upcoming,
  } = useQuery(['movies', 'upcoming'], () => api.getMovies('upcoming'), {
    staleTime: 50000,
  });

  return (
    <section>
      <>
        {popularLoading && <Loading />}
        {popularError ? <Error /> : null}
        {nowPlaying && <Banner movie={nowPlaying[0]} type='nowPlaying' />}
        {popular && (
          <Slider>
            <MovieSlider
              movies={popular.slice(1, 11)}
              title='오늘 글로벌 TOP10 시리즈'
              ranking={true}
              type='popular'
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
        {topLoading && <Loading />}
        {topError ? <Error /> : null}
        {topRated && (
          <MovieSlider
            movies={topRated.slice(1, 11)}
            title='최고 평점을 받은 영화 추천'
            ranking={true}
            type='topRated'
          />
        )}
        {upcomingLoading && <Loading />}
        {upcomingError ? <Error /> : null}
        {upcoming && (
          <MovieSlider
            movies={upcoming}
            title='곧 상영되는 기대작'
            type='upcoming'
          />
        )}
      </>
    </section>
  );
}
