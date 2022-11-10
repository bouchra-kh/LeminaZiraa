package com.example.agriculture.service;

import com.example.agriculture.model.commande;
import com.example.agriculture.model.produit;

import com.example.agriculture.model.role;
import com.example.agriculture.repository.commandeRepository;
import com.example.agriculture.repository.produitRepository;

import com.example.agriculture.repository.roleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class roleService {
    @Autowired
    roleRepository roleRepository;
    public List<role> getallrole(){
        return  roleRepository.findAll();
    }
    public void save(role r){
        roleRepository.save(r);
    }
    public  role findbyid(long id){
        return roleRepository.findById(id).get();
    }
    public void deleterole(long id){

        roleRepository.deleteById(id);
    }

    public  role updater(long id,  role p){
        roleRepository.findById(id);
        p.setId(id);
        role newu=p;
        return newu;

    }
}
