import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovies, deleteMovie } from "../api/movieApi"; // fetchMovies 함수 임포트

const MovieList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [genreFilter, setGenreFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const params = {};
        if (genreFilter !== "All") params.genre = genreFilter;
        if (statusFilter !== "All") {
          // 문자열 값을 실제 boolean 값으로 변환
          params.isScreening = statusFilter === "true";
        }

        const data = await fetchMovies(
          params.genre || null,
          params.isScreening || null
        ); // API 호출
        setMovies(data);
      } catch (error) {
        console.error("영화 데이터를 가져오는 중 오류 발생:", error);
        alert("영화 데이터를 가져오는 데 실패했습니다.");
      }
    };

    getMovies();
  }, [genreFilter, statusFilter]);

  // 평점 필터링 로직
  const filteredMovies = movies.filter((movie) => {
    const matchesRating =
      ratingFilter === "All" || movie.rating >= Number(ratingFilter);
    return matchesRating;
  });

  const handleAddMovieClick = () => {
    navigate("/upload");
  };

  const handleMovieClick = (id) => {
    console.log("Navigating to detail page with ID:", id); // 디버깅 로그
    navigate(`/detail/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteMovie(id); // deleteMovie API 호출
      alert("영화가 성공적으로 삭제되었습니다.");
      // 삭제 후, 영화 목록 업데이트
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      alert("영화 삭제 중 오류가 발생했습니다.");
      console.error("삭제 오류:", error);
    }
  };
  return (
    <Container>
      <Header>
        <Title>Movie List</Title>
        <AddMovieButton onClick={handleAddMovieClick}>
          <BsPlusCircle size={20} /> Add Movie
        </AddMovieButton>
      </Header>
      <FilterBar>
        <FilterDropdown
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="All">All Genres</option>
          <option value="THRILLER">스릴러</option>
          <option value="ROMANCE">로맨스</option>
          <option value="COMEDY">코믹</option>
          <option value="ACTION">액션</option>
        </FilterDropdown>
        <FilterDropdown
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="true">상영 중</option>
          <option value="false">상영 종료</option>
        </FilterDropdown>
        <FilterDropdown
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="All">All Ratings</option>
          <option value="5">5점 이상</option>
          <option value="4">4점 이상</option>
          <option value="3">3점 이상</option>
          <option value="2">2점 이상</option>
          <option value="1">1점 이상</option>
        </FilterDropdown>
      </FilterBar>
      <MovieCardList>
        {filteredMovies.map((movie, index) => (
          <MovieCard key={index} onClick={() => handleMovieClick(movie.id)}>
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>
              <Rating>
                {[...Array(5)].map((_, i) =>
                  i < movie.rating ? (
                    <AiFillStar key={i} />
                  ) : (
                    <AiOutlineStar key={i} />
                  )
                )}
              </Rating>
            </MovieInfo>
            <Tags>
              <GenreTag>{movie.genre}</GenreTag>
              <StatusTag>
                {movie.isScreening ? "상영 중" : "상영 종료"}
              </StatusTag>
            </Tags>
            <Actions>
              <FiTrash2 onClick={() => handleDeleteClick(movie.id)} />
            </Actions>
          </MovieCard>
        ))}
      </MovieCardList>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
`;

const AddMovieButton = styled.button`
  background: #5b3cc4;
  color: white;
  border: none;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterDropdown = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const MovieCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MovieCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
`;

const MovieInfo = styled.div`
  flex-grow: 1;
`;

const MovieTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 5px;
  color: #000000;
`;

const Rating = styled.div`
  display: flex;
  color: #f5b100;
`;

const Tags = styled.div`
  display: flex;
  gap: 10px;
`;

const GenreTag = styled.div`
  background: #d0c4ff;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  color: #5b3cc4;
`;

const StatusTag = styled.div`
  background: #c3f7c3;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  color: #2f8c2f;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  color: #777;
  cursor: pointer;
`;

export default MovieList;
