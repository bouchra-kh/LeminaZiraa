package com.example.agriculture.service;

import com.example.agriculture.model.role;
import com.example.agriculture.model.utilisateur;
import com.example.agriculture.repository.roleRepository;
import com.example.agriculture.repository.userRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {
    private userRepository userRepository;
    private roleRepository roleRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AccountServiceImpl(userRepository userRepository, roleRepository roleRepository,BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository= userRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;


    }
    public List<utilisateur> getallUsers(){
        return userRepository.findAll();
    }

    @Override
    public utilisateur saveUser(String username, String password, String confirmedPassword, String email,
    String adresse,String telephone) {
        utilisateur user=userRepository.findByUsername(username);
        if(user!=null) throw new RuntimeException("User already exists");
        if(!password.equals(confirmedPassword)) throw new RuntimeException("Please confirm your password");
        utilisateur appUser=new utilisateur();
        appUser.setUsername(username);
        appUser.setEmail(email);
        appUser.setAdresse(adresse);
        appUser.setTelephone(telephone);
        appUser.setActived(true);
        appUser.setPassword(bCryptPasswordEncoder.encode(password));
        userRepository.save(appUser);
        //addRoleToUser(username,"USER");
        return appUser;
    }

    @Override
    public role save(role role) {
        return roleRepository.save(role);
    }

    @Override
    public utilisateur loadUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public void addRoleToUser(String username, String rolename) {
        utilisateur user=userRepository.findByUsername(username);
        role role=roleRepository.findByRoleName(rolename);
        user.getRoles().add(role);
    }
}
