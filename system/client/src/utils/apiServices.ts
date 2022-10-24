/* eslint-disable class-methods-use-this */
const baseURL = "http://localhost:8080";

class APIServices {
  async createPurchaseEntry(data: FormData) {
    const response = await fetch(`${baseURL}/api/v1/upload`, {
      method: "post",
      body: data,
    });

    return response.json();
  }

  async getUploads() {
    const response = await fetch(`${baseURL}/api/v1/upload/all-uploads`, {
      method: "get",
    });

    return response.json();
  }
}

const instance = new APIServices();

export default instance;
