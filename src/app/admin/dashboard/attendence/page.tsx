import { fetchTodaysAttendance } from '@/app/utils';
import React from 'react';

interface User {
  _id: string; // MongoDB document ID
  studentName: string;
  studentYear: string;
  rollNumber: string;
  isPresent: boolean;
}

const Page: React.FC = async () => {
  let results: User[] | null = null; // Allow `results` to be null initially

  const res = await fetchTodaysAttendance();
  if (res.success) {
    results = res.data as User[]; // Explicitly cast to User[] if res.data matches
  }

  console.log(results);

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr className="text-[1.2rem]">
            <th style={{ border: '1px solid black', padding: '8px' }}>Roll No.</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Year</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {results ? (
            results.map((data: User) => (
              <tr key={data._id}> {/* Use _id as the unique key */}
                <td style={{ border: '1px solid black', padding: '8px' }}>{data.rollNumber}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{data.studentName}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{data.studentYear}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{data.isPresent ? 'Present' : 'Absent'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', padding: '8px' }}>No attendance data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
