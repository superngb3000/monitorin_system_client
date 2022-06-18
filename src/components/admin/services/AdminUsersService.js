import axios from 'axios';

const ADMIN_API_BASE_URL = 'https://monitoring-system-back.herokuapp.com/admin';

class AdminUsersService {

    getUsers(){
        return axios.get(ADMIN_API_BASE_URL + '/allUsers', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    postUser(id, username, password, role){
        return axios.post(ADMIN_API_BASE_URL + '/addUser', {
            "personalityId": id,
            "username": username,
            "password": password,
            "role": role
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    filterUsers (id, personality, username, role_user, role_admin) {
        return axios.post(ADMIN_API_BASE_URL + '/filterUsers',{
            "id": id,
            "personality": personality,
            "username": username,
            "roleUser": this.nullCheck(role_user),
            "roleAdmin": this.nullCheck(role_admin)
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    editUser (id, username, role_user, role_admin) {
        return axios.put(ADMIN_API_BASE_URL + `/user/${id}`,{
            "userId": id,
            "username": username,
            "roleUser": this.nullCheck(role_user),
            "roleAdmin": this.nullCheck(role_admin)
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    nullCheck (cat){
        if (cat === null || cat ===false) return ""
        else return cat
    }

}

export default new AdminUsersService();