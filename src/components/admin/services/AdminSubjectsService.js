import axios from 'axios';

const ADMIN_API_BASE_URL = 'https://monitoring-system-back.herokuapp.com/admin';

class AdminSubjectsService {

    getSubject (id){
        return axios.get(ADMIN_API_BASE_URL + `/subject/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    getSubjects(){
        return axios.get(ADMIN_API_BASE_URL + '/allSubjects', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    postSubject(postName){
        return axios.post(ADMIN_API_BASE_URL + '/addSubject', {
            "name": postName
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    filterSubjects (id, name) {
        return axios.post(ADMIN_API_BASE_URL + '/filterSubjects',{
            "id": id,
            "name": name
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    editSubject (id, name) {
        return axios.put(ADMIN_API_BASE_URL + `/subject/${id}`,{
            "name": name
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    addGroupToSubject (id, group_id) {
        return axios.put(ADMIN_API_BASE_URL + `/subject/${id}`,{
            "groups": [group_id]
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    addTeacherToSubject (id, teacher_id) {
        return axios.put(ADMIN_API_BASE_URL + `/subject/${id}`,{
            "teachers": [teacher_id]
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }

}

export default new AdminSubjectsService();