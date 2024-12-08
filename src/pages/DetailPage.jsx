import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { fetchMovieDetails, deleteMovie, updateMovie } from "../api/movieApi";

const DetailPage = () => {
  const { id } = useParams(); // useParams로 ID 가져오기
  const [userRating, setUserRating] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovieData(data);
        setUserRating(data.averageRating || 0); // 초기 평점 설정
      } catch (error) {
        console.error("영화 상세 조회 중 오류 발생:", error);
        alert("영화 정보를 불러오는 데 실패했습니다.");
      }
    };

    getMovieDetails();
  }, [id]);

  const handleRatingClick = (index) => {
    setUserRating(index + 1);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteMovie(id); // deleteMovie API 호출
      alert("영화가 성공적으로 삭제되었습니다.");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("영화 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await updateMovie(id, { ...movieData, rating: userRating });
      setEditMode(false);
      alert("영화가 성공적으로 수정되었습니다.");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("영화 수정 중 오류가 발생했습니다.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleScreeningChange = () => {
    setMovieData((prevData) => ({
      ...prevData,
      screening: !prevData.screening,
    }));
  };

  if (!movieData) {
    return <div>로딩 중...</div>;
  }

  return (
    <Container>
      <Header>
        <Title>{movieData.title}</Title>
      </Header>
      <Review>
        <Section>
          <Actions>
            {!editMode ? (
              <>
                <FiEdit2 onClick={handleEditClick} />
                <FiTrash2 onClick={handleDeleteClick} />
              </>
            ) : (
              <SaveButton onClick={handleSaveClick}>Save</SaveButton>
            )}
          </Actions>
          <Label>평균 평점</Label>
          <Rating>
            {[...Array(5)].map((_, i) => (
              <StarButton
                key={i}
                onClick={() => editMode && handleRatingClick(i)}
              >
                {i < userRating ? <AiFillStar /> : <AiOutlineStar />}
              </StarButton>
            ))}
          </Rating>
        </Section>
        <Section>
          <Label>상영 여부</Label>
          {editMode ? (
            <Checkbox
              type="checkbox"
              checked={movieData.screening}
              onChange={handleScreeningChange}
            />
          ) : (
            <StatusTag>
              {movieData.screening ? "상영 중" : "상영 종료"}
            </StatusTag>
          )}
        </Section>
        <Section>
          <Label>장르</Label>
          {editMode ? (
            <Select
              name="genre"
              value={movieData.genre}
              onChange={handleInputChange}
            >
              <option value="ACTION">액션</option>
              <option value="COMEDY">코미디</option>
              <option value="ROMANCE">로맨스</option>
              <option value="THRILLER">스릴러</option>
            </Select>
          ) : (
            <GenreTag>{movieData.genre}</GenreTag>
          )}
        </Section>
        <Section>
          <Label>개봉일</Label>
          {editMode ? (
            <Input
              type="date"
              name="releaseDate"
              value={movieData.releaseDate}
              onChange={handleInputChange}
            />
          ) : (
            <Input type="text" value={movieData.releaseDate} readOnly />
          )}
        </Section>
        <Section>
          <Label>상영 종료일</Label>
          {editMode ? (
            <Input
              type="date"
              name="endDate"
              value={movieData.endDate}
              onChange={handleInputChange}
            />
          ) : (
            <Input type="text" value={movieData.endDate} readOnly />
          )}
        </Section>
      </Review>

      <Review>
        <ReviewSection>
          <Rating>
            {[...Array(5)].map((_, i) => (
              <StarButton key={i} onClick={() => handleRatingClick(i)}>
                {i < userRating ? <AiFillStar /> : <AiOutlineStar />}
              </StarButton>
            ))}
          </Rating>
          <Box>
            <ReviewInput placeholder="이 영화에 대한 당신의 생각을 적어보세요!" />
            <SubmitButton>Submit</SubmitButton>
          </Box>
        </ReviewSection>
      </Review>
      <Review>
        <Rating>
          {[...Array(5)].map((_, i) => (
            <AiFillStar key={i} />
          ))}
        </Rating>
        <ReviewText>
          범죄도시 4는 강렬한 액션과 몰입감 넘치는 스토리로 관객을 사로잡았어요.
          마석도 형사는 새로운 빌런을 상대하며 한층 더 강력해진 활약을 펼쳤고,
          빌런의 독특한 캐릭터가 긴장감과 흥미를 더해줬어요. 액션 장면
          하나하나가 압도적이었고, 속도감 있는 전개 덕분에 지루할 틈이 없었어요.
          기존 시리즈에서 사랑받았던 유머와 유쾌한 팀워크도 그대로 담겨 웃음과
          재미를 놓치지 않았어요. 범죄도시 4는 시리즈의 매력을 유지하면서도
          새로운 요소로 신선한 재미를 선사하며, 액션 영화 팬들에게 큰 만족을
          줬어요.
        </ReviewText>
      </Review>
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
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  color: #777;
  cursor: pointer;
  margin-left: auto;
  width: 100%;
  justify-content: flex-end;
`;
const SaveButton = styled.button`
  background: #5b3cc4;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;
const Section = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Rating = styled.div`
  display: flex;
  color: #f5b100;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #f5b100;
  padding: 0;
  margin: 0;
`;

const StatusTag = styled.div`
  display: inline;
  background: #c3f7c3;
  padding: 5px 10px;
  border-radius: 20px;
  color: #2f8c2f;
  font-size: 14px;
  width: auto;
`;

const GenreTag = styled.div`
  display: inline;
  background: #d0c4ff;
  padding: 5px 10px;
  border-radius: 20px;
  color: #5b3cc4;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ReviewSection = styled.div`
  display: flex;
  gap: 10px;

  margin-bottom: 20px;
  flex-direction: column;
`;

const Box = styled.div`
  display: flex;
`;
const ReviewInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 4px;
`;

const SubmitButton = styled.button`
  background: #5b3cc4;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Review = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #eee;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const ReviewText = styled.p`
  margin-top: 10px;
  line-height: 1.5;
`;

export default DetailPage;
