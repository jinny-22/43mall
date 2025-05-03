
// LoginPage.js - 모둠 로그인 화면
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const groupList = JSON.parse(localStorage.getItem('groupList') || '{}');
    if (groupList[groupName] && groupList[groupName] === password) {
      localStorage.setItem('studentInfo', JSON.stringify({ groupName, password }));
      navigate('/student');
    } else {
      setError('모둠 이름이나 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">👩‍🎓 모둠 로그인</h1>
      <div className="mb-4">
        <label className="block mb-1">모둠 이름</label>
        <input
          type="text"
          className="border px-2 py-1 w-full rounded"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">비밀번호</label>
        <input
          type="password"
          className="border px-2 py-1 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={handleLogin}
      >
        입장하기
      </button>
    </div>
  );
}
