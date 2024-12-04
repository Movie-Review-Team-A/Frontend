// src/pages/upload.jsx
import { useState } from 'react';

function Upload() {
  const [movieData, setMovieData] = useState({
    title: '',
    director: '',
    releaseDate: '',
    genre: '',
    description: ''
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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">영화 등록</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>영화 제목</label>
          <input
            type="text"
            name="title"
            value={movieData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>감독</label>
          <input
            type="text"
            name="director"
            value={movieData.director}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">
          영화 등록하기
        </button>
      </form>
    </div>
  );
}

export default Upload;