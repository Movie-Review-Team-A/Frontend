import { jsonAxios } from "./axios.config.js";

export const fetchMovies = async (genre, isScreening) => {
  try {
    const response = await jsonAxios.get("/movies", {
      params: {
        genre: genre,
        isScreening: isScreening,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("영화 조회 오류발생:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    console.log("Fetching movie details for ID:", id); // 디버깅용 로그
    const response = await jsonAxios.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "영화 상세 조회 중 오류 발생:",
      error.response || error.message
    );
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    const response = await jsonAxios.delete(`/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error("영화 삭제 중 오류 발생:", error);
    throw error;
  }
};

export const updateMovie = async (id, updatedMovieData) => {
  try {
    const response = await jsonAxios.put(`/movies/${id}`, updatedMovieData);
    return response.data;
  } catch (error) {
    console.error("영화 수정 중 오류 발생:", error);
    throw error;
  }
};

export const createMovie = async (newMovieData) => {
  try {
    const response = await jsonAxios.post("/movies", newMovieData);
    return response.data;
  } catch (error) {
    console.error("영화 생성 중 오류 발생:", error);
    throw error;
  }
};

export const fetchMoviesByRating = async (minRating, page = 0, size = 10) => {
  try {
    const response = await jsonAxios.get(`/movies/ratings`, {
      params: {
        page: page,
        size: size,
      },
    });

    return response.data.filter((movie) => movie.averageRating >= minRating);
  } catch (error) {
    console.error("평점 기준 영화 조회 중 오류 발생:", error);
    throw error;
  }
};
