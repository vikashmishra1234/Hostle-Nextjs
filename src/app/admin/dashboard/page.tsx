import Complaints from '@/Components/dashboard/Complaints';
import Feedbackchart from '@/Components/dashboard/FeedbackChart';
import FeedbackStudent from '@/Components/dashboard/FeedbackStudent';
import StudentTable from '@/Components/dashboard/Table';
import TomCom from '@/Components/dashboard/TopCom';
import { Container, Typography } from '@mui/material';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getAllStudentComplaints, getFeedback } from '@/app/utils';

const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if(!user || !(user.role=='admin')){
    return <div>
      unable to show anything
    </div>
  }

  const complaints = await getAllStudentComplaints();
  const feedbacks = await getFeedback();
 

  return (
    <>
     {
      user&&user.role=='admin'&&<>
      <Container maxWidth={false} sx={{maxWidth:"1300px"}}>
      <Typography sx={{ color: 'brown',fontWeight: 'bold',
  textShadow: '0px 1px 4px',
  margin: '50px 0px', }} variant="h3">
        Admin Dashboard
      </Typography>
      <TomCom />
    </Container>
    <div className="max-w-[1250px] mt-10 mb-10 m-auto">
      <StudentTable />
      <h1 className="text-[2.8rem] mb-10 mt-10">Feedbacks on todays meal</h1>
      <div className="flex mb-20 w-full justify-between">
       {
        feedbacks&&<>
        <Feedbackchart feedback={feedbacks} />
        <FeedbackStudent feedback={feedbacks} />
        </>
       }
        
      </div>
      {complaints && <Complaints complaints={complaints} />}
    </div>
      </>
     }
    </>
  );
};

export default page;
