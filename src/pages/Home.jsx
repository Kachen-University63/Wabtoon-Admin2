import React, { useEffect, useState } from 'react';
import './css/Home.css';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'users');
      const f = query(collectionRef, where('favorite', 'array-contains', 'RB'));

      const querySnapshot = await getDocs(f);

      const newData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        email: doc.data().email,
        separatedString: doc.data().favorite.map(str => str.split(' ')),
      }));

      setData(newData);
    };

    fetchData();
  }, []);

  const isLoggedIn = localStorage.getItem('loggedInUsername');

  return (
    <div className="home-container">
      {isLoggedIn ? (
        <>
          <main className='main-container'>
            <div className='main-title'>
              <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
              <div className='card'>
                <div className='card-inner'>
                  <h3>PRODUCTS</h3>
                  <BsFillArchiveFill className='card_icon' />
                </div>
                <h1>300</h1>
              </div>

              <div className='card'>
                {data.map(item => (
                  <div key={item.id}>
                    <p>Separated String: {item.separatedString.map(subArray => subArray.join(',')).join('| ')}</p>
                    {/* <BsFillGrid3X3GapFill  /> */}
                  </div>
                ))}
              </div>

              <div className='card'>
                <div className='card-inner'>
                  <h3>CUSTOMERS</h3>
                  <BsPeopleFill className='card_icon' />
                </div>
                <h1>33</h1>
              </div>

              <div className='card'>
                <div className='card-inner'>
                  <h3>ALERTS</h3>
                  <BsFillBellFill className='card_icon' />
                </div>
                <h1>42</h1>
              </div>
            </div>

           
          </main>
        </>
      ) : (
        <>
          <h2>รายละเอียด</h2>
          <p>นี่เป็น project เกี่ยวกับการจัดการการ์ตูนบนเว็บไชต์</p>
          <p>เชื่อมต่อกับ Firebase เพื่อเก็บข้อมูลโดยใช้ React ในการเขียน</p>
          <p>โดยสามารถดูรายละเอียด เพิ่ม ลบ แก้ไข ข้อมูลต่างๆ ของการ์ตูนได้</p>
        </>
      )}
    </div>
  );
}

export default Home;
