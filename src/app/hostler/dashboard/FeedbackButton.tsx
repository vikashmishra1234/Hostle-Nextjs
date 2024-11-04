"use client"
import { addFeedback } from '@/app/utils';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import {motion} from 'framer-motion'
import Swal from 'sweetalert2'
import Loader from '@/app/MyLoading';

const FeedbackButton:React.FC<any> = ({user}) => {
    const [selectedValue, setSelectedValue] = useState<any>(null);
    const [description,setDescription] = useState<any>('')
    const [show,setShow] = useState<any>(false);
    const [loading,setLoading] = useState(false);
  

    const handleChange = (event:any) => {
      setSelectedValue(event.target.value);
    };
    const handleSubmit = async()=>{
      if(!selectedValue){
        Swal.fire({
          icon:'success',
          title:'error !',
          text:'Please choose the value'
        })
      }
        const data = {
            qaulity:selectedValue,
            studentYear:user.studentYear,
            rollNumber:user.rollNumber,
            studentName:user.studentName,
            description:description
        }
       setLoading(true);
       const res = await addFeedback(data);
       setLoading(false);
       if(res){
        Swal.fire({
          icon:'success',
          title:"Thank You !",
          text:'your feedback has been sent successfully'
        })
       }
       else{
        Swal.fire({
          icon:'error',
          title:"error !",
          text:'Something is wrong !'
        })
       }
    }
    if(loading){
      return <Loader loading = {loading}/>
    }
  return (
    <Box>
      <motion.div
  initial={{ y: "50%" }}
  whileInView={{ y: 0}}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="text-xl sm:text-2xl py-4 rounded-lg cursor-pointer text-white text-center bg-[#cb3a3a]"
  onClick={() => setShow(!show)}
>
  Give Feedback on Today&apos; Meal
</motion.div>

        {/* <motion.div initial={{ width: "0%", opacity: 0,margin:'auto' }}
          whileInView={{ width: "100%", opacity: 1 }}
          transition={{ duration: .7, ease: "easeInOut",delay:.3 }}
           style={{height:"3px",width:'100%',background:'brown'}}
          /> */}

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