"use client"
import { Badge, Box, Container, Typography } from "@mui/material";
import React from "react";
import AboutCard from "./Card";
import Marquee from "../clientComponents/Marquee";
import { useTheme } from "@mui/material";

interface Props{
  latestNews:string[];
}

const About:React.FC<Props> = ({latestNews}) => {
  const theme = useTheme();
  const md = theme.breakpoints.down('md');
  const sm = theme.breakpoints.down('sm');
  return (
    <Container>
      <Typography
        variant="h2"
        sx={{
          fontSize: "3.5rem",
          fontWeight: 500,
          textAlign: "center",
          margin: "30px 0px",
          [sm]:{
            fontSize:'2.1rem'
          }
        }}
      >
        BSA Hostle: A Safe Haven
      </Typography>
      <Box sx={{display:'flex',[md]:{flexDirection:'column',alignItems:'center',height:'250vh'},gap:'50px'}}>
        <Box>
          <Typography variant="h4"sx={{
              fontWeight:"bold",
               color: '#a31010',
               marginBottom: '28px',
               borderBottom: '1px solid',
               textAlign: 'center',
               [sm]:{fontSize:"1.8rem"}
          }}>
            Hostle Intro
          </Typography>
          <AboutCard />
        </Box>
        <Box sx={{width:'575px',[sm]:{width:'320px'},height:'70vh'}}>
        <Typography variant="h4"
        sx={{
          fontWeight:"bold",
               color: '#a31010',
               marginBottom: '28px',
               borderBottom: '1px solid',
               textAlign: 'center',
               [sm]:{fontSize:"1.8rem"}
        }}
        >
            Latest News
          </Typography>
          <Marquee height="100%">
  {latestNews && latestNews.map((news: string, ind: number) => (
    <Badge
      badgeContent="New"
      color="error"
      key={ind}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{ mr: 2,ml:2,mb:'20px' }}
    >
      <Typography key={ind} sx={{ color: 'red', fontSize: '1.3rem',[sm]:{fontSize:'1.1rem'} }}>
        {news}
      </Typography>
    </Badge>
  ))}
</Marquee>

            
        </Box>
      </Box>
    </Container>
  );
};

export default About;
