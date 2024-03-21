import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../Dashboard/CSS/card.css'

function Favorite() {

  const [valuesWithCounts, setValuesWithCounts] = useState([]);

  useEffect(() => {
    const fetchArrayValues = async () => {
      const collectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(collectionRef);

      const countByValue = {};
      querySnapshot.forEach(doc => {
        const data = doc.data();
        const valuesArray = data['favorite']; // Replace 'your_array_field' with your actual array field name

        // Count occurrences of each value in the array
        valuesArray.forEach(value => {
          countByValue[value] = (countByValue[value] || 0) + 1;
        });
      });

      // Convert countByValue object to an array of objects with value and count properties
      const valuesWithCountsArray = Object.keys(countByValue).map(value => ({
        value,
        count: countByValue[value],
      }));

      setValuesWithCounts(valuesWithCountsArray);
    };

    fetchArrayValues();
  }, []);

  return (


    
      <div className='card-container'>
        <div className='card-ef'>
        <div className='main-title'>
          
        <ul>
          <p>รหัสการ์ตูนและการกดถูกใจ</p>
            {valuesWithCounts.map(item => (
              <div key={item.value}>
            
                การ์ตูนรหัสเรื่อง: {item.value}
                จำนวนการกดถูกใจ: {item.count}
              </div>
            ))}
          
        </ul>
        </div>
        </div>
      </div>


  );
}

export default Favorite;

