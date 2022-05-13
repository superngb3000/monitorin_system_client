import axios from 'axios';

const TEACHER_API_BASE_URL = 'http://localhost:8081/teacher';

class TeacherStudentsService {

    getStudent(id){
        return axios.get(TEACHER_API_BASE_URL + `/student/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    getStudents(){
        return axios.get(TEACHER_API_BASE_URL + '/allStudents', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    filterStudents (id, student_card_id, personality, group_id) {
        return axios.post(TEACHER_API_BASE_URL + '/filterStudents',{
            "id": id,
            "studentCardId": student_card_id,
            "personalityId":personality,
            "groupId": group_id
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
}

export default new TeacherStudentsService();