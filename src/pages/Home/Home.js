import React, { useEffect, useContext } from 'react'
import './Home.css'
import { useState } from 'react'
import {Form, Button, Dropdown, Alert} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import Tables from '../../components/Tables/Tables'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import { AddData, DeleteData, UpdateData } from '../../context/ContextProvider'
import { AllUsers, UserDelete, exportUserToCSV } from '../../services/Api'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {

  const navigate= useNavigate()

  const [allUserData, setAllUserData] = useState([]);

  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("");
  const [Nationality, setNationality] = useState("All")
  const [status, setStatus] = useState("All")
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1); 
  const [pageCount, setPageCount] = useState(0);
  
  const {userAdd, setUserAdd} = useContext(AddData)
  const {updateUser, setUpdateUser} = useContext(UpdateData)
  const {deleteData, setDeleteData} = useContext(DeleteData)  

  const addUser =()=>{
    navigate('/register')
  }
  const userGet = async()=>{
    const response = await AllUsers(search, Nationality, status, sort, page);
    if(response.status=== 200){
      setAllUserData(response.data.user_data);
      setPageCount(response.data.Pagination.pageCount)

    }else{
      console.log("Error in getting All users data");
    }
  }

  const deleteUser= async(id)=>{
    const response = await UserDelete(id);

    if(response.status===200){
      userGet();
      setDeleteData(response.data)  
    }else {
      toast.error("Unable to delete the user.")
    }
  }

  async function exportUser(){
    const response = await exportUserToCSV();
   
    if(response.status===200){
      window.open(response.data.downloadUrl, "blank");
    }else{
      toast.error("Unable to export Users");
    }
  }

  //pagination
  // previous
  function handlePreviousPage(){
    setPage(()=>{
      if(page===1) return 1;
      else return page-1;
    })
  }
  function handleNextPage(){
    setPage(()=>{
      if(page=== pageCount) return page;
      else return page+1;
    })
  }


  useEffect(()=>{
    userGet();
    setTimeout(()=>{
      setLoading(false)
    }, 1200)
  },[search, Nationality, status, sort, page])

  return (
    <>
      { 
        userAdd ?  <Alert variant="success" onClose={() => setUserAdd("")} dismissible>{userAdd.fname.toUpperCase()} Succesfully Added</Alert>:""
      } 
      { 
        updateUser ?  <Alert variant="primary" onClose={() => setUpdateUser("")} dismissible>{updateUser.fname.toUpperCase()} Succesfully Updated</Alert>:""
      }
      { 
        deleteData ?  <Alert variant="danger" onClose={() => setDeleteData("")} dismissible>{deleteData.fname.toUpperCase()} Succesfully Deleted</Alert>:""
      }
      <div className="container">
        <div className="main_div">
          {/* search & add button */}

          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e)=>setSearch(e.target.value)}
              />
                <Button variant='success' className="search_btn">Search</Button>
              </Form>

            </div>
            <div className="add_btn">
              <Button variant='primary' onClick={addUser}> <i class='fa-solid fa-plus' ></i> Add User</Button>
            </div>
          </div>

          {/* export, nationality, status */}
          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
             <Button className='export_btn' onClick={exportUser} > Export To CSV</Button>
            </div>
            <div className="filter_nationality">
              <div className="filter">
                <h3>Filter by Nationality</h3>
                <div className="nationality d-flex justify-content-around">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="Nationality"
                    value={"All"}
                    onChange={(e)=> setNationality(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Indian`}
                    name="Nationality"
                    value={"Indian"}
                    onChange={(e)=> setNationality(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Foreigner`}
                    name="Nationality"
                    value={"Foreigner"}
                    onChange={(e)=> setNationality(e.target.value)}
                  />

                </div>
              </div>
            </div>

            {/* short by value */}
            <div className="filter_newold">
              <h3>Short by Value</h3>
              <Dropdown className='text-center'>
                <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                  <i class="fa-solid fa-sort"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={(e)=> setSort("new")} >New</Dropdown.Item>
                  <Dropdown.Item onClick={(e)=> setSort("old")} >Old</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* filter by status */}
            <div className="filter_status">
              <div className="status">
                <h3>Filter by Status</h3>
                <div className="status_radio d-flex justify-content-center flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e)=> setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e)=> setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Inactive`}
                    name="status"
                    value={"Inactive"}
                    onChange={(e)=> setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          loading? <SpinnerLoading /> : <Tables 
          allUserData={allUserData} 
          deleteUser={deleteUser} 
          userGet= {userGet}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          page={page}
          pageCount={pageCount}
          setPage={setPage}
          />
        }
      <ToastContainer position='top-right'/>
      </div>
    </>
  )
}
