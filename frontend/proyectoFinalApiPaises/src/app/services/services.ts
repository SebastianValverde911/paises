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

    crearPais(nombre:string) {
        return axios.post(environment.apiUrl+'api/countries/', {
            name: nombre
        });
    }
    
    getPaises() {
        return axios.get(environment.apiUrl+'api/countries');
    }

    crearCiudad(nombre:string,id:number) {
        return axios.post(environment.apiUrl+'api/cities', {
            name: nombre,
            country_id: id
        });
    }

    getCitiesByCountry(id:number) {
        return axios.get(environment.apiUrl+'api/cities/country/'+id);
    }

    crearFamoso(nombre:string,motivo:string,ciudad_id:number) {
        return axios.post(environment.apiUrl+'api/famous', {
            name: nombre,
            category: motivo,
            city_id: ciudad_id
        });
    }

    crearSitio(nombre:string, tipo:string, descripcion:string, ciudad_id:number) {
        return axios.post(environment.apiUrl+'api/sites', {
            name: nombre,
            type: tipo,
            description: descripcion,
            CityId: ciudad_id
        });
    }

    getSitiosByCountry(id:number) {
        return axios.get(environment.apiUrl+'api/sites/country/'+id);
    }

    crearPlato(nombre:string, precio:number, sitio_id:number) {
        return axios.post(environment.apiUrl+'api/foods', {
            name: nombre,
            price: precio,
            SiteId: sitio_id
        });
    }
}

export default new Services();