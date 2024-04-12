import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;
  static username = "testuser";
  static password = "password";

  static async request(endpoint, data = {}, method = "get") {
  
    console.debug("API Call:", endpoint, data, method);


    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };

    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  };

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res;
  };


  /** Get details on a user by username. */

  static async getUser(username) {
    const token = localStorage.getItem("token");
    let res = await this.request(`users/${username}`, token);
    return res;
  };


  /** Get details on a job by id. */

  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  };

  /* Search for companies by name  */
  static async searchByName(searchFilters) {
    let res = await this.request(`companies`, {name: `%${searchFilters}`});
    return res.companies;
  };

  /* POST request for new user signup. Stores token on class */  
  static async signup(username, password, firstName, lastName, email) {
    let res = await this.request(`auth/register`, {username, password, firstName, lastName, email}, 'post'); 
    let token = res.token;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    return token;
  };

  /* POST request for a user to login */

  static async login(username, password) {
    let data = {username, password};
    let res = await this.request(`auth/token`, data, 'post');
    let token = res.token;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    return token;
  };

  static async editProfile(username, data) {
    const token = localStorage.getItem('token')
    const url = `users/${username}`;
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};
    let res = await this.request(url, data, 'patch', headers);

    return res.user;
  };

  static async applyToJob(jobId, username) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
    return res;
  }
};



// for now, put token ("testuser" / "password" on class)
/* JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc"; */


export default JoblyApi;