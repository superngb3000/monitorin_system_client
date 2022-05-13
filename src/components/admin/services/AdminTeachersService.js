import axios from 'axios';

const ADMIN_API_BASE_URL = 'http://localhost:8081/admin';

class AdminTeachersService {

    getTeacher(id){
        return axios.get(ADMIN_API_BASE_URL + `/teacher/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    getTeachers(){
        return axios.get(ADMIN_API_BASE_URL + '/allTeachers', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    postTeacher(id){
        return axios.post(ADMIN_API_BASE_URL + '/addTeacher', {
            "personalityId": id
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    filterTeachers (id, personality) {
        return axios.post(ADMIN_API_BASE_URL + '/filterTeachers',{
            "id": id,
            "personality": personality
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }

}

export default new AdminTeachersService();