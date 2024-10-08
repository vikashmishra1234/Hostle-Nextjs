import React, { Suspense } from 'react'
import ComplaintForm from './ComplaintForm'

const page = () => {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <ComplaintForm/>
    </Suspense>
  )
}

export default page