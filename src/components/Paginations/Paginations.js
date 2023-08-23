import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function Paginations({handlePreviousPage, handleNextPage, page, pageCount,setPage} ) {
  return (
    <>
    {
    pageCount>0 ? 
      <div className="pagination_div d-flex justify-content-end mx-5">
        <Pagination>
          <Pagination.Prev onClick={()=>handlePreviousPage()} />
          {
            Array(pageCount).fill(null).map((element, index)=>{
              return (
                <>
                  <Pagination.Item active={index+1 === page ? true:false } onClick={()=>setPage(index+1)}>{index+1}</Pagination.Item>
                
                </>
              )
            })
          }
          <Pagination.Next onClick={()=>handleNextPage()}/>
        </Pagination> 
      </div>
      :
      ""
    }

    </>
  )
}
