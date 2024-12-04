import { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    title: '',
    status: '상영 중',
    genre: '스릴러',
    releaseDate: '2024. 11. 23.',
    endDate: '2024. 11. 23.'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('등록된 영화:', movieData);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-8">
      <div className="max-w-[600px] mx-auto bg-white rounded-3xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-12">
  <h1 className="text-2xl font-bold">Add Movie</h1>
  <button 
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 bg-[#6A52FE] text-white px-4 py-2 rounded-lg"
          >
            <X size={16} />
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-base font-medium mb-2">영화 제목</label>
            <input
              type="text"
              name="title"
              value={movieData.title}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#6A52FE]"
              required
            />
          </div>

          <div>
            <label className="block text-base font-medium mb-2">상영 여부</label>
            <select
              name="status"
              value={movieData.status}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#6A52FE] appearance-none bg-white"
            >
              <option value="상영 중">상영 중</option>
              <option value="상영 예정">상영 예정</option>
              <option value="상영 종료">상영 종료</option>
            </select>
          </div>

          <div>
            <label className="block text-base font-medium mb-2">장르</label>
            <select
              name="genre"
              value={movieData.genre}
              onChange={handleInputChange}
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#6A52FE] appearance-none bg-white"
            >
              <option value="스릴러">스릴러</option>
              <option value="로맨스">로맨스</option>
              <option value="코미디">코미디</option>
              <option value="액션">액션</option>
            </select>
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-base font-medium mb-2">개봉일</label>
              <div className="relative">
                <input
                  type="text"
                  name="releaseDate"
                  value={movieData.releaseDate}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#6A52FE]"
                  required
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-base font-medium mb-2">상영 종료일</label>
              <div className="relative">
                <input
                  type="text"
                  name="endDate"
                  value={movieData.endDate}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#6A52FE]"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6A52FE] text-white py-4 rounded-lg mt-8 hover:bg-[#5842fe] font-medium"
          >
            Submit Movie
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;