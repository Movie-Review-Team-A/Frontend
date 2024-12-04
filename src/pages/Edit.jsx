import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({
    title: '',
    director: '',
    releaseDate: '',
    genre: '',
    description: ''
  });

  useEffect(() => {
    // 여기에 나중에 백엔드 API 호출 코드가 들어갈 예정
    // 예: fetchMovieData(id)
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('수정된 영화:', movieData);
    // 여기에 나중에 백엔드로 수정된 데이터를 보내는 코드가 들어갈 예정
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6">영화 정보 수정</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">영화 제목</label>
            <input
              type="text"
              name="title"
              value={movieData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">감독</label>
            <input
              type="text"
              name="director"
              value={movieData.director}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">개봉일</label>
            <input
              type="date"
              name="releaseDate"
              value={movieData.releaseDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">장르</label>
            <select
              name="genre"
              value={movieData.genre}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">장르 선택</option>
              <option value="action">액션</option>
              <option value="comedy">코미디</option>
              <option value="drama">드라마</option>
              <option value="horror">호러</option>
              <option value="romance">로맨스</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">영화 설명</label>
            <textarea
              name="description"
              value={movieData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-32"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            수정 완료
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;