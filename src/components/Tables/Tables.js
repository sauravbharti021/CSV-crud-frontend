import React from 'react'
import './Table.css'
import { Card, Row, Table, Dropdown, Badge } from 'react-bootstrap'
import { B_URL } from '../../services/Helper'
import Paginations from '../Paginations/Paginations'
import { Link } from 'react-router-dom'
import { StatusUpdate } from '../../services/Api'
import {toast, ToastContainer} from 'react-toastify'

export default function Tables({allUserData, deleteUser, userGet, handlePreviousPage, handleNextPage, page, pageCount, setPage}) {

  const handleChange= async(id, status)=>{
   
    const response = await StatusUpdate(id, status)
    
    if(response.status===200){
      userGet();
      toast.success("Status successfully updated!")
    }else{
      toast.error("Unable to update status.")
    }
  }

  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className='align-items-center' responsive="sm">
                <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Nationality</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    allUserData.length>0 ? allUserData.map( (element, index) =>{
                      return(
                        <>
                          <tr>
                            <td>{index+1 + ((page-1)*4)}</td>
                            <td>{"".concat(element.fname, " ",element.lname)}</td>
                            <td>{element.email}</td>
                            <td>{element.Nationality}</td>
                            <td className='d-flex align-items-center'>
                              <Dropdown className='text-center'>
                                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                  <Badge bg={element.status.toLowerCase()==="active" ? "primary" : "danger" }>
                                    {element.status} <i class="fa-solid fa-angle-down"></i>
                                    </Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={()=> handleChange(element._id, "Active")} >Active</Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleChange(element._id, "Inactive")} >Inactive</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td className='img_parent'>
                              <img src={`${B_URL}/uploads/${element.profile}`} alt="img" />
                            </td>
                            <td>
                              <Dropdown className='text-center'>
                                <Dropdown.Toggle variant="light" className='action' id="dropdown-basic">
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item >
                                    <Link to={`/userprofile/${element._id}`} className='text-decoration-none' >
                                      <i class="fa-solid fa-eye" style={{color:"green"}}></i> 
                                      <span> View</span>
                                    </Link>
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    <Link to={`/edit/${element._id}`} className='text-decoration-none'>
                                      <i class="fa-solid fa-pen-to-square" style={{color:"blue"}}></i> 
                                      <span> Edit</span>
                                    </Link>  
                                  </Dropdown.Item>
                                  <Dropdown.Item >
                                    <div onClick={()=> deleteUser(element._id)}>
                                      <i class="fa-solid fa-trash" style={{color:"red"}}></i> 
                                      <span> Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      )
                    } ) : <div className='no_data text-center' >No Data Found</div>
                  }
                  
                </tbody>
              </Table>
              <Paginations 
                handlePreviousPage={handlePreviousPage}
                handleNextPage={handleNextPage}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  )
}
