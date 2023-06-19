import axios, { AxiosInstance } from 'axios';

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

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface IMediaDetail {
  adult?: boolean;
  backdrop_path: string;
  genres: Genre[];
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date?: string;
  runtime?: number;
  status?: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface IMedia {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  title: string;
  original_title: string;
}

export interface ITVShow extends IMedia {
  first_air_date?: string;
  name?: string;
  origin_country?: string[];
  original_name?: string;
}

export interface IMovie extends IMedia {
  adult?: boolean;
  release_date?: string;
  video?: boolean;
}

const API_KEY = '7b86c0c40a44a8f351d5618936d807a1';

export default class Api {
  private apiClient: AxiosInstance;
  constructor() {
    this.apiClient = axios.create({
      baseURL: 'https://api.themoviedb.org/3/',
      params: {
        api_key: API_KEY,
        language: 'ko-KR',
      },
    });
  }

  async getMovies(type: string): Promise<IMovie[]> {
    return await this.apiClient.get(`movie/${type}`).then((data) => {
      return data.data.results;
    });
  }

  async getVideos(movie_id: number): Promise<IVideosResponse> {
    return await this.apiClient
      .get(`movie/${movie_id}/videos`)
      .then((data) => data.data);
  }

  async getDetail(movie_id: number, type: string): Promise<IMediaDetail> {
    return await this.apiClient
      .get(`${type}/${movie_id}`)
      .then((data) => data.data);
  }

  async getTv(type: string): Promise<ITVShow[]> {
    return await this.apiClient.get(`tv/${type}`).then((data) => {
      return data.data.results.map((result: ITVShow) => ({
        ...result,
        title: result.name,
        original_title: result.original_name,
      }));
    });
  }
}
