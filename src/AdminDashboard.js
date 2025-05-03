
// AdminDashboard.js – 관리자 화면 (간단 버전)
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [groupList, setGroupList] = useState({});

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groupList') || '{}');
    setGroupList(storedGroups);
  }, []);

  const addGroup = () => {
    const name = prompt('모둠 이름을 입력하세요');
    const pw = prompt('비밀번호를 입력하세요');
    const updated = { ...groupList, [name]: pw };
    setGroupList(updated);
    localStorage.setItem('groupList', JSON.stringify(updated));
  };

  const deleteGroup = (name) => {
    const updated = { ...groupList };
    delete updated[name];
    setGroupList(updated);
    localStorage.setItem('groupList', JSON.stringify(updated));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">🧑‍🏫 관리자 페이지</h1>
      <button onClick={addGroup} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">모둠 추가</button>
      <ul>
        {Object.entries(groupList).map(([name, pw]) => (
          <li key={name} className="mb-2 flex justify-between">
            <span>{name} / {pw}</span>
            <button onClick={() => deleteGroup(name)} className="text-red-500">삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
