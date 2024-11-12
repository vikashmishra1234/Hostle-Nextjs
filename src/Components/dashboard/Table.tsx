"use client"

import { fetchStudents } from '@/app/utils';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
const Table:React.FC = () => {
  const [studentData,setStudentData] = useState<any>([]);
  const [change,setChange] = useState<any>([]);

  useEffect(()=>{
    const getData = async()=>{
       try {
        const fetch:any = await fetchStudents();
        setStudentData(fetch)
       } catch (error:any) {
        console.log(error)
       }
    }
    getData()
  },[change])
  const handleChange = async(studentId:string)=>{
      try {
        const res:any = await axios.put(`http://localhost:3000/api/updatefees/?studentId=${studentId}`);
        if(res&&res.data.message){
          alert(res.data.message)
          setChange(!change)
        }
      } catch (error:any) {
        alert("unable to update")
        console.log(error)
      }
  }
  return (
    <div className='mt-20 mb-20'>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr className='text-[1.2rem]'>
          <th style={{ border: '1px solid black', padding: '8px' }}>Rollno.</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Father Name</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Student Phone</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Father Phone</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Branch</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Year</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Address</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>feeStatus</th>
        </tr>
      </thead>
      <tbody>
        {studentData.map((student:any )=> (
          <tr className='text-[1.1rem]' key={student._id}>
            <td style={{ border: '1px solid black', padding: '8px' }}>{student.rollNumber}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{student.studentName}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{student.studentFatherName}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{student.studentPhone}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{student.studentEmail}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{student.studentFatherPhone}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{student.studentBranch}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{student.studentYear}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{student.studentAddress+"vildj af l dfjlkd dfajkljf"}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>
              <input type="checkbox" checked={student.feeStatus} onChange={()=>handleChange(student._id)}  />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  )
}

export default Table