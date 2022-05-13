import axios from 'axios';

const TEACHER_API_BASE_URL = 'http://localhost:8081/teacher';

class TeacherGroupsService {

    getGroup (id) {
        return axios.get(TEACHER_API_BASE_URL + `/group/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    getGroups(){
        return axios.get(TEACHER_API_BASE_URL + '/allGroups', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    filterGroups (id, name) {
        return axios.post(TEACHER_API_BASE_URL + '/filterGroups',{
            "id": id,
            "name": name
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    getStudentsByGroup (id) {
        return axios.get(TEACHER_API_BASE_URL + `/group/${id}/students`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
}

export default new TeacherGroupsService();