import axios from 'axios'

export const commonRequest = async(methods, url, body, header)=>{
    let config = {
        method : methods,
        url,
        headers: header ? header : {
            "Content-Type": "application/json"
        },
        data: body
    }

    // instance of axios
    return axios(config).then((data)=> { return data } ).catch((err)=>{
        console.log("error in api call" , err);
        return err;
    })
}