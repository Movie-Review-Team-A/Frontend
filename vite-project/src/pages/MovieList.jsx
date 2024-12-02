import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";

const MovieList = () => {
  return (
    <Container>
      <Header>
        <Title>Movie List</Title>
        <AddMovieButton>
          <BsPlusCircle size={20} /> Add Movie
        </AddMovieButton>
      </Header>
      <FilterBar>
        <FilterDropdown>
          <option>All Movies</option>
        </FilterDropdown>
        <FilterDropdown>
          <option>All Genres</option>
        </FilterDropdown>
        <FilterDropdown>
          <option>All Ratings</option>
        </FilterDropdown>
      </FilterBar>
      <MovieCardList>
        {movies.map((movie, index) => (
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

const movies = [
  { title: "범죄도시 4", rating: 4, genre: "액션", status: "상영 중" },
  { title: "스물", rating: 5, genre: "코미디", status: "상영 중" },
  { title: "히든페이스", rating: 3, genre: "스릴러", status: "상영 중" },
  {
    title: "말할 수 없는 비밀",
    rating: 2,
    genre: "로맨스",
    status: "상영 종료",
  },
  { title: "장산범", rating: 0, genre: "스릴러", status: "상영 종료" },
];

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
