import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface ImageUrl {
    imageUrl:string;
    title:string;
    description:string;
}
const HomeCard:React.FC<ImageUrl> = ({imageUrl,title,description}) => {
  return (
    <Card sx={{ maxWidth: 375 ,marginTop:'30px',marginBottom:'30px'}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" sx={{fontWeight:'bold', color: 'text.secondary'}} component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary',fontSize:"1.2rem" }}>
         {
            description.split(" ").map((word:string,ind:number)=>(
               ind<23&&<>{word+" "}</>
            ))
         }
         ...
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='outlined' >know more</Button>
      </CardActions>
    </Card>
  );
}

export default HomeCard
