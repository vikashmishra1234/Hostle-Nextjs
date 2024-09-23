import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const Loader:React.FC<any> = ({loading}) => {
  return (
    <ClipLoader
    color={"brown"}
    loading={loading}
    size={100}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  )
}

export default Loader