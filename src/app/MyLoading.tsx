import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const Loader:React.FC<any> = ({loading}) => {
  return (
<div className='fixed top-0 left-0 flex justify-center items-center z-50 h-full w-full bg-[rgb(105_105_105_/_62%)]'>
<ClipLoader
    color={"brown"}
    loading={loading}
    size={100}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
</div>
  )
}

export default Loader