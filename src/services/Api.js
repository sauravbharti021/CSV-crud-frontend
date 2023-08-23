import { commonRequest } from "./ApiCall";
import { B_URL } from "./Helper";

export const RegisterPost = async(data, header)=>{
    return await commonRequest("POST", `${B_URL}/user/register`, data, header)
}

export const AllUsers= async(search, Nationality, status, sort, page)=>{
    return await commonRequest("GET", `${B_URL}/user/details?search=${search}&Nationality=${Nationality}&status=${status}&sort=${sort}&page=${page}`, "");
}

export const SingleUserGet= async(id)=>{
    return await commonRequest("GET", `${B_URL}/user/${id}`, "")
}

export const EditUser= async(id, data, header)=>{
    return await commonRequest("PUT", `${B_URL}/user/edit/${id}`, data, header)
}

export const UserDelete= async(id)=>{
    return await commonRequest("DELETE", `${B_URL}/user/delete/${id}`, {})
}

export const StatusUpdate = async(id, data)=>{
    return await commonRequest("PUT", `${B_URL}/user/status/${id}`, {data})
}

export const exportUserToCSV = async()=>{
    return await commonRequest("GET", `${B_URL}/userexport`, "")
}