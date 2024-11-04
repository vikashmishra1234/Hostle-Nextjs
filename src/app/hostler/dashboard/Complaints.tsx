"use client"
import { Box, Button, CardMedia, Paper, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'


const Complaints:React.FC<any> = ({complaints}) => {
  const [clickedIndex,seClickedIndex] = useState<number|null>(null)
  const [toggle,setToggle] = useState<boolean>(false)
  const theme = useTheme()
  const md = theme.breakpoints.down('sm')

  return (
    <Box  >
      <Typography sx={{margin:"90px 0px",[md]:{
        fontSize:'25px',
        margin:'60px 0px'
      }}} variant='h4'>Your Recent Complaints</Typography>
       {
        complaints.map((com:any,ind:number)=>(
            <React.Fragment key={ind}>
            <Paper key={com._id} sx={{display:'flex',[md]:{flexDirection:"column"},justifyContent:'space-around',gap:"15px",alignItems:'center',marginBottom:"10px",padding:'10px 0px 10px 30px'}} elevation={2}>
            <Typography sx={{fontSize:"1.2rem",[md]:{display:"none",fontSize:'1.5rem'}}} component='strong'>{ind+1}.</Typography>
            <Typography sx={{fontSize:"1.2rem",textTransform:"capitalize"}} >Title: {com.complaintTitle}</Typography>
            <Typography sx={{fontSize:"1.2rem",color:com.status=='pending'?"red":"green"}} >Status: {com.status}</Typography>
            <Button  onClick={()=>{
              seClickedIndex(ind)
              setToggle(!toggle)
          }}>view complaint</Button>
            </Paper>
           {
            toggle&&clickedIndex==ind&& <Box component={'form'} sx={{width:'50%',[md]:{width:"100%"},margin:'20px auto'}} >
            <Typography variant='h5'  component={"h3"}>Title: {com.complaintTitle}</Typography>
            <Typography sx={{fontSize:"1.2rem",margin:"10px 0px"}} >Description: {com.complaintDescription}</Typography>
              <CardMedia
                component="img"
                height="80"
                sx={{height:"150px",width:"100%",objectFit:'contain'}}
                image={com.imageUrl.slice(5,)}
                alt="complaint image"
              />
        </Box>
           }
            </React.Fragment>
        ))
       }
    </Box>
  )
}

export default Complaints