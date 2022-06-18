import axios from 'axios';

const ADMIN_API_BASE_URL = 'https://monitoring-system-back.herokuapp.com/admin';

class AdminEventsService {

    getLesson (id){
        return axios.get(ADMIN_API_BASE_URL + `/lesson/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    getCheckpoint (id){
        return axios.get(ADMIN_API_BASE_URL + `/checkpoint/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }

    getLessons (){
        return axios.get(ADMIN_API_BASE_URL + `/allLessons`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }

    getCheckpoints (){
        return axios.get(ADMIN_API_BASE_URL + `/allCheckpoints`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }

    addLessonToSubject (name, id) {
        return axios.post(ADMIN_API_BASE_URL + `/addLesson`,{
            "name": name,
            "subjectId": id
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
    addCheckpointToSubject (checkpoint_name, id) {
        return axios.post(ADMIN_API_BASE_URL + `/addCheckpoint`,{
            "name": checkpoint_name,
            "subjectId": id
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }})
    }
}

export default new AdminEventsService();