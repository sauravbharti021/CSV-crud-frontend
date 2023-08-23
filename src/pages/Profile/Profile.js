import React, { useState, useEffect } from 'react'
import './Profile.css'
import { Card, Row } from 'react-bootstrap'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';
import { useParams } from 'react-router-dom';
import { SingleUserGet } from '../../services/Api';
import { B_URL } from '../../services/Helper';
import moment from 'moment'


export default function Profile() {

  const [loading, setLoading] = useState(true);

  const {id} = useParams();
  const[user, setUser] = useState([])
  // console.log("lol", id)

  const singleUser = async(req, res)=>{
    const response = await SingleUserGet(id)
    console.log(response.data)
    if(response.status===200){
      setUser(response.data);
    }else{
      console.log("Error in getting data of id: ", id);
    }
  }

  useEffect(()=>{
    singleUser();
    setTimeout(()=>{
      setLoading(false)
    }, 1200)
  },[id])

  return (
    <>
      {
        loading ? <SpinnerLoading /> :
        <div className="container">
          <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img src={`${B_URL}/uploads/${user.profile}`} alt="img" />
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>{"".concat(user.fname, " ", user.lname)}</h3>
                <h4 ><i class="fa-solid fa-envelope email"></i> {user.email}</h4>
                <h5 ><i class="fa-solid fa-mobile"></i> {user.mobile}</h5>
                <h5 ><i class="fa-solid fa-earth-americas earth"></i> {user.Nationality}</h5>
                <h5 ><i class="fa-solid fa-location-dot location"></i> {user.location}</h5>
                <h5 ><i class="fa-solid fa-thumbtack"></i>{user.status}</h5>
                <h5 ><i class="fa-solid fa-calendar-days calendar"></i>Date Created :- <span>{moment(user.dateCreated).format("DD-MM-YYYY")  }</span> </h5>
                <h5 ><i class="fa-solid fa-calendar-days calendar"></i>Date Updated :- {user.dateUpdated}</h5>
              </div>
              
            </Card.Body>
          </Card>
        </div>

      }
    </>
  )
}
