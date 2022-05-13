import axios from 'axios';

const ADMIN_API_BASE_URL = 'http://localhost:8081/admin';

class AdminMarksService {

    getScores(){
        return axios.get(ADMIN_API_BASE_URL + '/allScores', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    getAttendances (){
        return axios.get(ADMIN_API_BASE_URL + '/allAttendance', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    getScore (id){
        return axios.get(ADMIN_API_BASE_URL + `/score/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    getAttendance (id){
        return axios.get(ADMIN_API_BASE_URL + `/attendance/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    filterScores (id, studentId, checkpointId) {
        return axios.post(ADMIN_API_BASE_URL + '/filterScores',{
            "id": id,
            "studentId": studentId,
            "checkpointId": checkpointId
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    filterAttendance (id, studentId, lessonId) {
        return axios.post(ADMIN_API_BASE_URL + '/filterAttendance',{
            "id": id,
            "studentId": studentId,
            "lessonId": lessonId
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    editAttendance (attendance, attendance_mark){
        return axios.put(ADMIN_API_BASE_URL + `/attendance/${attendance.id}`,
            {
                "mark": attendance_mark
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }})
    }
    editScore (score, score_mark){
        return axios.put(ADMIN_API_BASE_URL + `/score/${score.id}`,
            {
                "mark": score_mark
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }})
    }
}

export default new AdminMarksService();