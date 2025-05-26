import axios from 'axios';
import { environment } from '../../environments/environment';
class Services {
    login(email:string,password:string) {
        return axios.post(environment.apiUrl+'api/auth/login', {
            email: email,
            password: password
        });
    }
}

export default new Services();