import http from '../http-common';

class AdminDataService {
  addRestaurant(data){
    return http.post("/admin/add-restaurant", data);
  }
  signIn(data){
    return http.post("/admin/sign-in", data);
  }
  signOut(){
    return http.post("/admin/sign-out");
  }
  getAllRestaurant(){
    return http.get("/admin/get-restaurants");
  }
  addAdmin(data){
    return http.post("/admin/add-admin", data);
  }
  getAdmins(){
    return http.get("/admin/get-admins");
  }
  updateAdmin(data){
    return http.put("/admin/update-admin", data);
  }
  updateRestaurant(data){
    return http.put("/admin/update-restaurant", data);
  }
  deleteAdmin(data){
    return http.put("/admin/delete-admin", data);
  }
  deleteRestaurant(data){
    return http.put("/admin/delete-restaurant", data);
  }
  getCountRestaurants(){
    return http.get("/admin/count-restaurants");
  }
  getLogos(){
    return http.get("/logo/get-logos");
  }
  getDeletedLogos(){
    return http.get("/logo/get-deleted-logo");
  }
  deleteLogo(data){
    return http.put("/logo/delete-logo", data);
  }
}

export default new AdminDataService();