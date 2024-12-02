import { useState } from "react";

import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const DetailPage = () => {
  const [userRating, setUserRating] = useState(0);

  const handleRatingClick = (index) => {
    setUserRating(index + 1);
  };

  return (
    <Container>
      <Header>
        <Title>범죄도시 4</Title>
      </Header>
      <Review>
        <Section>
          <Actions>
            <FiEdit2 />
            <FiTrash2 />
          </Actions>
          <Label>평균 평점</Label>
          <Rating>
            {[...Array(5)].map((_, i) => (
              <AiOutlineStar key={i} />
            ))}
          </Rating>
        </Section>
        <Section>
          <Label>상영 여부</Label>
          <StatusTag>상영 중</StatusTag>
        </Section>
        <Section>
          <Label>장르</Label>
          <GenreTag>액션</GenreTag>
        </Section>
        <Section>
          <Label>개봉일</Label>
          <Input type="text" value="2024. 11. 23." readOnly />
        </Section>
        <Section>
          <Label>상영 종료일</Label>
          <Input type="text" value="2024. 12. 07." readOnly />
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
  background: #c3f7c3;
  padding: 5px 10px;
  border-radius: 20px;
  color: #2f8c2f;
  font-size: 14px;
  width: 44px;
`;

const GenreTag = styled.div`
  background: #d0c4ff;
  padding: 5px 10px;
  border-radius: 20px;
  color: #5b3cc4;
  font-size: 14px;
  width: 28px;
`;

const Input = styled.input`
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
