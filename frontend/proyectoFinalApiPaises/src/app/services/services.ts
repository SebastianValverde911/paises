import axios from 'axios';
import { environment } from '../../environments/environment';
class Services {
    login(email:string,password:string) {
        return axios.post(environment.apiUrl+'api/auth/login', {
            email: email,
            password: password
        });
    }

    register(email:string,password:string,name:string,role:string) {
        return axios.post(environment.apiUrl+'api/auth/register', {
            email: email,
            password: password,
            name: name,
            role: role
        });
    }
}

export default new Services();