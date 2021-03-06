import axios from 'axios';
import {localStorageService} from "./localStorage.service";

axios.defaults.baseURL = 'http:localhost:5000/api/';

class ApiService {

    get(endPoint, params, useAuthHeader = false) {
        const config = {
            headers: ApiService._buildHeader(useAuthHeader),
            params
        };
        return (axios.get(endPoint, config)).then((res) => {
            return res.data;
        })
    }

    post(endPoint, body, useAuthHeader = false) {
        const config = {
            headers: ApiService._buildHeader(useAuthHeader),
        };
        return (axios.post(endPoint, body, config)).then((res) => {
            return res.data;
        });
    }

    put(endPoint, body, useAuthHeader = false) {
        const config = {
            headers: ApiService._buildHeader(useAuthHeader),
        };
        return (axios.put(endPoint, body, config)).then((res) => {
            return res.data;
        });
    }

    delete(endPoint, useAuthHeader = false) {
        const config = {
            headers: ApiService._buildHeader(useAuthHeader),
        };
        return (axios.delete(endPoint, config)).then((res) => {
            return res.data;
        });
    }

    static _buildHeader(useAuthHeaders) {
        let headers = {'Content-Type': 'application/json'}
        if (useAuthHeaders) {
            headers = {
                ...headers,
                authorization: `Bearer ${localStorageService.getToken()}`
            };
        }
        return headers;
    }
}

export const apiService = new ApiService();
