import axios from 'axios';

const TEACHER_API_BASE_URL = 'https://monitoring-system-back.herokuapp.com/teacher';

class TeacherMarksService {

    getScores(){
        return axios.get(TEACHER_API_BASE_URL + '/allScores', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    getAttendances (){
        return axios.get(TEACHER_API_BASE_URL + '/allAttendance', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }

    getScore (id){
        return axios.get(TEACHER_API_BASE_URL + `/score/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    getAttendance (id){
        return axios.get(TEACHER_API_BASE_URL + `/attendance/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }

    filterScores (id, studentId, checkpointId) {
        return axios.post(TEACHER_API_BASE_URL + '/filterScores',{
            "id": id,
            "studentId": studentId,
            "checkpointId": checkpointId
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    filterAttendance (id, studentId, lessonId) {
        return axios.post(TEACHER_API_BASE_URL + '/filterAttendance',{
            "id": id,
            "studentId": studentId,
            "lessonId": lessonId
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }

    editAttendance (attendance, attendance_mark){
        return axios.put(TEACHER_API_BASE_URL + `/attendance/${attendance.id}`,
            {
                "mark": attendance_mark
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }})
    }
    editScore (score, score_mark){
        return axios.put(TEACHER_API_BASE_URL + `/score/${score.id}`,
            {
                "mark": score_mark
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                }})
    }
}

export default new TeacherMarksService();