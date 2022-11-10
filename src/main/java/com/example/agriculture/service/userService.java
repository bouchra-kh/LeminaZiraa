package com.example.agriculture.service;

import com.example.agriculture.model.utilisateur;
import com.example.agriculture.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class userService {
@Autowired
userRepository userRepository;
    public List<utilisateur> getallusers(){
        return  userRepository.findAll();
    }
    public void save(utilisateur u){
        userRepository.save(u);
    }
  public utilisateur findbyid(long id){
        return userRepository.findById(id).get();
    }
    public void deleteuser(long id){

        userRepository.deleteById(id);
    }

    public utilisateur updateuser(long id, utilisateur u){
        userRepository.findById(id);
        u.setId(id);
        utilisateur newu=u;
       return newu;

    }
}
