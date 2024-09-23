"use client"
import React from 'react'
import {motion} from 'framer-motion'
type Name={
    name:string;
};

const AnimatedText:React.FC<Name> = ({name}) => {
  return (
    <motion.span
    animate={{
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: 4,
      ease: "easeInOut",
      times: [0, 0.2, 0.2, .2],
      repeat: Infinity,
    }}
    className=" font-bold text-[brown]"
  >
   {name}
  </motion.span>
  )
}

export default AnimatedText