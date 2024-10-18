import http from '../http-common';

class VotersDataService {
  getCountVoters(){
    return http.get("/voter/count-voters");
  }
  getVotersByRestaurant(data) {
    return http.post("/voter/get-voters", data);
  }
}

export default new VotersDataService();