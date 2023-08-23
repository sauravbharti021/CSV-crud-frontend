import React, { useEffect, useState, useContext } from 'react'
import './Register.css'
import {Button, Form, Alert, Card, Row} from 'react-bootstrap'
import Select from 'react-select'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import { RegisterPost } from '../../services/Api'
import {useNavigate} from 'react-router-dom';
import { AddData } from '../../context/ContextProvider'

export default function Register() {

  const [loading, setLoading] = useState(true)
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const [input, setInput] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    Nationality: "",
    location: ""
  })
  const [status, setStatus] = useState('Active')
  const [image, setImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")


  const navigate= useNavigate();
  const {userAdd, setUserAdd} = useContext(AddData)

  function setInputValue(e){
    e.preventDefault();
    const {name, value} = e.target;
    setInput({
      ...input,
      [name]: value
    })
  }
  function setStatusValue(e){
    setStatus(e.value)
  } 
  function setProfilePicture(e){
    e.preventDefault();
    setImage(e.target.files[0])
  }
  useEffect(()=>{
    if(image){
      setPreviewImage(URL.createObjectURL(image));
    }
    setTimeout(()=>{
      setLoading(false)
    }, 1200)
  }, [image])




  async function handleSubmit(e){
    e.preventDefault();
    const {fname, lname, email, mobile, Nationality, location} = input;
    
    if(!fname){
      toast.error("First Name is required!")
    }else if(!lname){
      toast.error("Last Name is required!")
    }else if(!email || !email.includes('@')){
      toast.error("Fill the valid email");
    }else if(!mobile || mobile.length!==10){
      toast.error("Enter valid mobile number")
    }else if(!Nationality){
      toast.error("Select your Nationality")
    }else if(!location){
      toast.error("Enter the location")
    }else if(!image){
      toast.error("Enter the image.")
    }else if(!status){
      toast.error("Select the status")
    }
    else{
      
      const data = new FormData();
      data.append("fname", fname)
      data.append("lname", lname)
      data.append('email', email)
      data.append('mobile', mobile)
      data.append('Nationality', Nationality)
      data.append('status', status)
      data.append("profile_picture", image)
      data.append('location', location)

      const config= {
        "Content-Type": "multipart/form-data"
      }
      const response = await RegisterPost(data, config);
      
      if(response.status===200){
        setInput({
          ...input,
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          Nationality: "",
          location: ""
        })
        setStatus("")
        setImage("")
        console.log(response.data)
        setUserAdd(response.data);
        navigate("/")
      }else{
        toast.error("ERROR!")
      }
    }
  }

  return (
    <>
      {
        loading ?
          <SpinnerLoading />
          :
          <div className='container'>
            <h2 className='text-center mt-1'>Register your details.</h2>
            <Card className="shadow mt-3 p-3">
              <div className="profile_div text-center">
                <img src={previewImage? previewImage : "/man.png"} alt="img"/>
              </div>
              <Card.Body>
                <Form onSubmit={handleSubmit}>   
                  <Row>
    
                    <Form.Group id='fname' className='mb-3 col-lg-6'>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" name="fname" value={input.fname} onChange={setInputValue} placeholder='Enter FirstName'   />
                    </Form.Group>
                    <Form.Group id='lname' className='mb-3 col-lg-6'>
                      <Form.Label>Second Name</Form.Label>
                      <Form.Control type="text" name="lname" value={input.lname}  onChange={setInputValue} placeholder='Enter LastName'  />
                    </Form.Group>
                    <Form.Group id='email' className='mb-3 col-lg-6'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="email" value={input.email}  onChange={setInputValue} placeholder='Enter your email'  />
                    </Form.Group>
                    <Form.Group id='mobile' className='mb-3 col-lg-6'>
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control type="text" name="mobile" value={input.mobile}  onChange={setInputValue} placeholder='Enter your Mobile'  />
                    </Form.Group>
                    <Form.Group id='nationality' className='mb-3 col-lg-6'>
                      <Form.Label>Select your Nationality</Form.Label>
                      <Form.Check
                        type={"radio"}
                        label={`Indian`}
                        name="Nationality"
                        value={"Indian"}
                        onChange={setInputValue}
                      />
                      <Form.Check
                        type={"radio"}
                        label={`Foreigner`}
                        name="Nationality"
                        value={"Foreigner"}
                        onChange={setInputValue}
                      />
                    </Form.Group>
                    <Form.Group id='status' className='mb-3 col-lg-6'>
                      <Form.Label>Select your status</Form.Label>
                      <Select
                        options={options}
                        onChange={setStatusValue}
                      />
                    </Form.Group>
                    <Form.Group id='user-profile-picture' className='mb-3 col-lg-6'>
                      <Form.Label>Select your profile picture</Form.Label>
                      <Form.Control type="file" name="profile_picture" onChange={setProfilePicture}  placeholder='Enter your Profile-Picture'   />
                    </Form.Group>
                    <Form.Group id='location' className='mb-3 col-lg-6'>
                      <Form.Label>Enter your location</Form.Label>
                      <Form.Control type="text" name="location" value={input.location}  onChange={setInputValue} placeholder='Enter your location'   />
                    </Form.Group>
                  </Row>
    
                          <Button className="w-100" type="submit" >Submit</Button>
                </Form>
              </Card.Body>
            </Card>
            <ToastContainer position='top-right'/>
          </div>
      }
</>
  )
}
