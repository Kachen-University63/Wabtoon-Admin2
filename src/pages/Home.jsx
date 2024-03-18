import React, { useEffect, useState } from 'react';
import './css/Home.css';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';

function Home() {
  const [popularCartoons, setPopularCartoons] = useState([]);
  const [totalFavorites, setTotalFavorites] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, 'users');
      const f = query(collectionRef, orderBy('favorite', 'desc'));
      

      const querySnapshot = await getDocs(f);
      

      const popularData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        favorite: doc.data().favorite,
      }));
      const totalFavorites = popularData.reduce((sum, cartoon) => sum + cartoon.favorite.length, 0);

      setTotalFavorites(totalFavorites);

      setPopularCartoons(popularData);
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
              {popularCartoons.map(cartoon => (
                <div key={cartoon.id}>

                  <p>Favorite Count: {cartoon.favorite} </p>
                </div>
              ))}
               
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
