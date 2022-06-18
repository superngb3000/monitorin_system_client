import axios from 'axios';

const ADMIN_API_BASE_URL = 'https://monitoring-system-back.herokuapp.com/admin';

class AdminGroupsService {

    getGroup (id) {
        return axios.get(ADMIN_API_BASE_URL + `/group/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    getGroups(){
        return axios.get(ADMIN_API_BASE_URL + '/allGroups', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    postGroup(name){
        return axios.post(ADMIN_API_BASE_URL + '/addGroup', {
            "name": name
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    filterGroups (id, name) {
        return axios.post(ADMIN_API_BASE_URL + '/filterGroups',{
            "id": id,
            "name": name
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    editGroup (id, name) {
        return axios.put(ADMIN_API_BASE_URL + `/group/${id}`,{
            "name": name }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});

    }
    getStudentsByGroup (id) {
        return axios.get(ADMIN_API_BASE_URL + `/group/${id}/students`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
}

export default new AdminGroupsService();