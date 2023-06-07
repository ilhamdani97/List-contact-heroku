import axios from "axios"

export const getDataUser = async () => {
    try {
        const response  = await axios({
                method: 'get',
                url: 'https://contact.herokuapp.com/contact'
            })
    
        return response.data;

    } catch (e) {
        console.log(e);
    } 
}
type dataProps = {
    firstName: string;
    lastName: string;
    age: number;
    photo: string;
}

export const postDataUsers = async (payload: dataProps) => {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://contact.herokuapp.com/contact',
            data: payload
        })

        return response;
    } catch(e) {
        console.log(e);
    }
}

export const deletDataUser = async (id: string) => {
    try {
        const response = await axios.delete(`https://contact.herokuapp.com/contact/${id}`)
        
        return response;
    } catch(e) {
        console.log(e);
    }
}

export const editDataUser = async(id: string, payload: dataProps) => {
    try {
        const response = await axios({
            method: 'put',
            url: `https://contact.herokuapp.com/contact/${id}`,
            data: payload
        })

        return response;
    } catch(e) {
        console.log(e);
    }
}

export const getDetailUser = async(id: string) => {
    try {
        const response  = await axios({
                method: 'get',
                url: `https://contact.herokuapp.com/contact/${id}`
            })
    
        return response.data;

    } catch (e) {
        console.log(e);
    } 
}

