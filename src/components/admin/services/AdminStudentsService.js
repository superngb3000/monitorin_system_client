import axios from 'axios';

const ADMIN_API_BASE_URL = 'http://localhost:8081/admin';

class AdminStudentsService {

    getStudents(){
        return axios.get(ADMIN_API_BASE_URL + '/allStudents', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    postStudent(id, student_card_id, group_name){
        return axios.post(ADMIN_API_BASE_URL + '/addStudent', {
            "personalityId": id,
            "studentCardId": student_card_id,
            "groupName": group_name
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    filterStudents (id, student_card_id, personality, group_id) {
        return axios.post(ADMIN_API_BASE_URL + '/filterStudents',{
            "id": id,
            "studentCardId": student_card_id,
            "personalityId":personality,
            "groupId": group_id
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    editStudent (id, group_name) {
        return axios.put(ADMIN_API_BASE_URL + `/student/${id}`,{
            "group": group_name
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
}

export default new AdminStudentsService();