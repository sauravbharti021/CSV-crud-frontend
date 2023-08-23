import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function SpinnerLoading() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center" style={{width:"100%", height:"50%"}}>
        <Spinner animation="border" variant='danger' />
          <span> &nbsp; Loading...</span>

      </div>
    </>
  )
}
