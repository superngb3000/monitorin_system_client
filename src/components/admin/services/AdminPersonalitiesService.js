import axios from 'axios';

const ADMIN_API_BASE_URL = 'https://monitoring-system-back.herokuapp.com/admin';

class AdminPersonalitiesService {

    getPersonalities(){
        return axios.get(ADMIN_API_BASE_URL + '/allPersonalities', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    postPersonality(firstName, secondName, middleName, email){
        return axios.post(ADMIN_API_BASE_URL + '/addPersonality', {
            "firstName": firstName,
            "secondName": secondName,
            "middleName": middleName,
            "email": email
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    filterPersonalities (id, firstName, secondName, middleName) {
        return axios.post(ADMIN_API_BASE_URL + '/filterPersonalities',{
            "id": id,
            "firstName": firstName,
            "secondName": secondName,
            "middleName": middleName
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    getPersonality (id){
        return axios.get(ADMIN_API_BASE_URL + `/personality/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    editPersonality (id, first_name, second_name, middle_name, email) {
        return axios.put(ADMIN_API_BASE_URL + `/personality/${id}`,{
            "firstName": first_name,
            "secondName": second_name,
            "middleName": middle_name,
            "email": email
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    getUser (id){
        return axios.get(ADMIN_API_BASE_URL + `/personality/${id}/user`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    getStudent (id){
        return axios.get(ADMIN_API_BASE_URL + `/personality/${id}/student`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    getTeacher (id){
        return axios.get(ADMIN_API_BASE_URL + `/personality/${id}/teacher`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
}

export default new AdminPersonalitiesService();