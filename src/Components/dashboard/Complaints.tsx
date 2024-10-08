'use client';

import { Box, Button, CardMedia, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface Complaint {
  _id: string;
  studentName: string;
  studentYear: string;
  status: string;
  complaintTitle: string;
  complaintDescription: string;
  imageUrl: string;
}

interface ComplaintsProps {
  complaints: Complaint[];
}

const Complaints: React.FC<ComplaintsProps> = ({ complaints }) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  const [complaintStatus, setComplaintStatus] = useState<string>('');

  const updateStatus = async (complaintId: string) => {
    try {
      const res = await axios.put<{ success: boolean }>(`http://localhost:3000/api/updatecomplaint/?complaintId=${complaintId}`);
      if (res.data.success) {
        setComplaintStatus("solved");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Box>
      <Typography component={'div'} sx={{ fontSize: "2.8rem", marginBottom: "50px" }}>Complaints
        <motion.div initial={{ width: "0%", opacity: 0, margin: 'auto' }}
          whileInView={{ width: "100%", opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ height: "3px", width: '100%', background: 'brown' }}
        />
      </Typography>

      {
        complaints.map((com, ind) => (
          <React.Fragment key={com._id}>
            <Paper
              sx={{ display: 'flex', justifyContent: 'space-around', gap: "15px", alignItems: 'center', marginBottom: "15px", padding: '10px 0px 10px 30px' }}
              elevation={2}
            >
              <Typography sx={{ fontSize: "1.3rem" }} component='strong'>{ind + 1}.</Typography>
              <Typography sx={{ fontSize: "1.3rem" }}>
                {com.studentName} {com.studentYear} year raised a complaint
              </Typography>
              <Typography sx={{ fontSize: "1.2rem", color: com.status === 'pending' ? "red" : "green" }}>
                {complaintStatus ? complaintStatus : com.status}
              </Typography>
              <Button onClick={() => {
                setClickedIndex(ind);
                setToggle(!toggle);
              }}>View Complaint</Button>
              <Button sx={{ color: 'green' }} color="success" variant='outlined' onClick={() => updateStatus(com._id)}>Mark as done</Button>
            </Paper>

            {
              toggle && clickedIndex === ind &&
              <Box component={'form'} sx={{ width: '50%', margin: '20px auto' }}>
                <Typography variant='h5' component={"h3"}>Title: {com.complaintTitle}</Typography>
                <Typography sx={{ fontSize: "1.2rem", margin: "10px 0px" }}>Description: {com.complaintDescription}</Typography>
                <CardMedia
                  component="img"
                  height="80"
                  sx={{ height: "150px", width: "100%" }}
                  image={com.imageUrl.slice(5)} // assuming the URL slice is necessary
                  alt="complaint image"
                />
              </Box>
            }
          </React.Fragment>
        ))
      }
    </Box>
  );
};

export default Complaints;
