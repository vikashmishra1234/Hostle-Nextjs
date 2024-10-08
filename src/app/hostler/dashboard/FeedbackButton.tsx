"use client"
import { addFeedback } from '@/app/utils';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import {motion} from 'framer-motion'
import Swal from 'sweetalert2'

const FeedbackButton:React.FC<any> = ({user}) => {
    const [selectedValue, setSelectedValue] = useState<any>(null);
    const [description,setDescription] = useState<any>('')
    const [show,setShow] = useState<any>(false);
  

    const handleChange = (event:any) => {
      setSelectedValue(event.target.value);
    };
    const handleSubmit = async()=>{
      alert(selectedValue)
      if(!selectedValue){
        alert("please choose the desired value")
      }
        const data = {
            qaulity:selectedValue,
            studentYear:user.studentYear,
            rollNumber:user.rollNumber,
            studentName:user.studentName,
            description:description
        }
       
       const res = await addFeedback(data);
       if(res){
        alert("feedback added succesfully")
       }
       else{
        Swal.fire({
          icon:'error',
          title:"Opps !",
          text:"Something went"
        })
       }
    }
  return (
    <Box>
      <motion.div
  initial={{ y: "30%", opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="text-[1.9rem] text-[brown]"
  onClick={() => setShow(!show)}
>
  Give Feedback on Today&apos; Meal
</motion.div>

        <motion.div initial={{ width: "0%", opacity: 0,margin:'auto' }}
          whileInView={{ width: "100%", opacity: 1 }}
          transition={{ duration: .7, ease: "easeInOut",delay:.3 }}
           style={{height:"3px",width:'100%',background:'brown'}}
          />

       {show && <Box  sx={{marginTop:'30px'}}>
        <FormControl fullWidth variant="outlined">
      <InputLabel id="dropdown-label">Select Option</InputLabel>
      <Select
        labelId="dropdown-label"
        value={selectedValue}
        onChange={handleChange}
       required={true}
        label="Select Option"
      >
        <MenuItem  value={'poor'}>poor qaulity</MenuItem>
        <MenuItem value={'satisfying'}>satisfying</MenuItem>
        <MenuItem value={'good'}>good qaulity</MenuItem>
      </Select>
    </FormControl>
    <TextField
        label="description (optional)"
        variant='outlined'
        sx={{marginTop:"15px"}}
        fullWidth
        multiline
        rows={3}
        onChange={(e:any)=>setDescription(e.target.value)}
    />
    <Button  sx={{marginTop:"20px",background:'brown',width:"300px",padding:"10px 0px"}} onClick={handleSubmit} variant='contained'>Submit</Button>
    </Box>}
    </Box>
  )
}

export default FeedbackButton