import { Api } from "./airports";
import { API_URL } from "../constants";

export class HttpService implements Api {
  async get(path: string) {
    const response = await fetch(`${API_URL}${path}`);
    return response.json();
  }

  async post(path: string, body: any) {
    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
}
