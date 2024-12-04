import { jsonAxios } from "./axios.config.js";

export const fetchMovies = async (genre, isScreening) => {
  try {
    const response = await jsonAxios.get("/movies", {
      params: {
        genre: genre,
        isScreening: isScreening,
      },
    });
    return response.data;
  } catch (error) {
    console.error("영화 조회 오류발생:", error);
    throw error;
  }
};

export const deleteMovie = async (movieId) => {
  try {
    const response = await jsonAxios.delete(`/movies/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("영화 삭제 중 오류 발생:", error);
    throw error;
  }
};

export const updateMovie = async (movieId, updatedMovieData) => {
  try {
    const response = await jsonAxios.put(
      `/movies/${movieId}`,
      updatedMovieData
    );
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
