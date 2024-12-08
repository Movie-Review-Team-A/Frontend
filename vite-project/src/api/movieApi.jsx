import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMoviesByRating } from "./movieApi"; // 평점순 API 호출 함수

const MovieList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]); // 서버에서 가져온 영화 데이터
  const [ratingFilter, setRatingFilter] = useState("All"); // 평점 필터 상태

  useEffect(() => {
    // 평점 순으로 영화 목록을 가져오는 함수
    const getMovies = async () => {
      try {
        const data = await fetchMoviesByRating(0); // 기본값: 평점순 정렬
        setMovies(data);
      } catch (error) {
        console.error("영화 목록을 가져오는 중 오류 발생:", error);
        alert("영화 목록을 가져오는 데 실패했습니다.");
      }
    };

    getMovies();
  }, []);

  // 평점 필터링 로직
  const filteredMovies = movies.filter((movie) => {
    return ratingFilter === "All" || movie.rating === Number(ratingFilter);
  });

  const handleAddMovieClick = () => {
    navigate("/upload");
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
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="All">모든 평점</option>
          <option value="5">5점</option>
          <option value="4">4점</option>
          <option value="3">3점</option>
          <option value="2">2점</option>
          <option value="1">1점</option>
          <option value="0">0점</option>
        </FilterDropdown>
      </FilterBar>
      <MovieCardList>
        {filteredMovies.map((movie, index) => (
          <MovieCard key={index}>
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
              <StatusTag>{movie.status}</StatusTag>
            </Tags>
            <Actions>
              <FiEdit2 />
              <FiTrash2 />
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
