"use client"
import React from 'react'

const FeedbackStudent:React.FC<any> = ({feedback}) => {

  return (
    <div style={{width:"30%"}} >
        <table className='w-full' >
        <thead>
        <tr className='text-[1.2rem]'>
          <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Year</th>
          <th style={{ border: '1px solid black', padding: '8px' }}>Feedback</th>
        </tr>
      </thead>
      <tbody>
        {
          feedback.map((item:any)=>(
            <tr className='text-[1.1rem]' key={item._id}>
            <td style={{ border: '1px solid black', padding: '8px' }}>{item.studentName}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{item.studentYear}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{item.qaulity}</td>
        </tr>
          ))
        }

      </tbody>
        </table>
    </div>
  )
}

export default FeedbackStudent