package com.example.agriculture.model;



public class JwtResponse {

    private utilisateur user;
   // private Collection<AppRole> role;
    private String jwtToken;
    private String refreshtoken;
    public JwtResponse(utilisateur user , String jwtToken , String ref) {

        this.user=user;
        this.jwtToken = jwtToken;
        this.refreshtoken=ref;
    }

//    public Collection<AppRole> getRle() {
//        return role;
//    }
//
//    public void setRole(Collection<AppRole> role) {
//        this.role = role;
//    }
    public utilisateur getUser() {
        return user;
    }
public  void setUser(utilisateur user) {
    this.user = user;
}
    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getRefreshtoken() {
        return refreshtoken;
    }

    public void setRefreshtoken(String refreshtoken) {
        this.refreshtoken = refreshtoken;
    }
}
