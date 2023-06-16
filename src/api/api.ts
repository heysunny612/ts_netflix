import axios, { AxiosInstance } from 'axios';

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IMoviesResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

interface IVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface IVideosResponse {
  id: number;
  results: IVideo[];
}

const API_KEY = '7b86c0c40a44a8f351d5618936d807a1';

export default class Api {
  private apiClient: AxiosInstance;
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://api.themoviedb.org/3/',
      params: {
        api_key: API_KEY,
      },
    });
  }

  async getMovies(): Promise<IMoviesResponse> {
    return await this.apiClient
      .get('movie/now_playing')
      .then((data) => data.data);
  }

  async getVideos(movie_id: number): Promise<IVideosResponse> {
    return await this.apiClient
      .get(`movie/${movie_id}/videos`)
      .then((data) => data.data);
  }
}
