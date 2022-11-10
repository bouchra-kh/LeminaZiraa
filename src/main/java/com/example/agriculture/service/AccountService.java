package com.example.agriculture.service;

import com.example.agriculture.model.role;
import com.example.agriculture.model.utilisateur;


import java.util.List;

public interface AccountService {
    public utilisateur saveUser(String username, String password, String confirmedPassword ,String email,
                                String adresse,String telephone);
    public role save(role role);
    public utilisateur loadUserByUsername(String username);
    public void addRoleToUser(String username,String rolename);
    public List<utilisateur> getallUsers();
}


