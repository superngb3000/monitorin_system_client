import axios from 'axios';

const TEACHER_API_BASE_URL = 'https://monitoring-system-back.herokuapp.com/teacher';

class TeacherSubjectsService {

    getSubject (id){
        return axios.get(TEACHER_API_BASE_URL + `/subject/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    getSubjects(){
        return axios.get(TEACHER_API_BASE_URL + '/allSubjects', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    filterSubjects (id, name) {
        return axios.post(TEACHER_API_BASE_URL + '/filterSubjects',{
            "id": id,
            "name": name
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
}

export default new TeacherSubjectsService();