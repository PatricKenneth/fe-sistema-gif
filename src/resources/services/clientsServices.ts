import { HttpClient } from "../httpClient";
import { IClient } from "../../interfaces/IClient";

const baseURL = '/clients';
class ClientsServices {

  async post(payload: IClient) {
    return HttpClient.post(`${baseURL}`, payload);
  }

  async get() {
    return HttpClient.get(`${baseURL}`);
  }

  async patch(payload: IClient) {
    return HttpClient.patch(`${baseURL}`, payload);
  }

  async delete(payload: IClient) {
    return HttpClient.delete(`${baseURL}`, { data: payload});
  }

  async getGenders() {
    return HttpClient.get(`${baseURL}/genders`);
  }
}

export default new ClientsServices();
