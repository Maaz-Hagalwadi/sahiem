import { backendUrl } from "./config"

export const createUser = async(data)=>{
    const response = await fetch(`${backendUrl}/register`,{
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    const user = await response.json()
    console.log(user)
    return user
}