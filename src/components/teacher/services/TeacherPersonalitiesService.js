import axios from 'axios';

const TEACHER_API_BASE_URL = 'https://monitoring-system-back.herokuapp.com/teacher';

class TeacherPersonalitiesService {

    getPersonalities(){
        return axios.get(TEACHER_API_BASE_URL + '/allPersonalities', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    getPersonality (id){
        return axios.get(TEACHER_API_BASE_URL + `/personality/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    getStudent (id){
        return axios.get(TEACHER_API_BASE_URL + `/personality/${id}/student`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    getTeacher (id){
        return axios.get(TEACHER_API_BASE_URL + `/personality/${id}/teacher`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
}

export default new TeacherPersonalitiesService();