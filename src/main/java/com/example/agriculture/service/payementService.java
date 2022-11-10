package com.example.agriculture.service;

import com.example.agriculture.model.commande;
import com.example.agriculture.model.payement;
import com.example.agriculture.model.produit;

import com.example.agriculture.model.role;
import com.example.agriculture.repository.commandeRepository;
import com.example.agriculture.repository.payRepository;
import com.example.agriculture.repository.produitRepository;

import com.example.agriculture.repository.roleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class payementService {
    @Autowired
    payRepository payementRepository;
    public List<payement> getallpayement(){
        return  payementRepository.findAll();
    }
    public void save(payement p){
        payementRepository.save(p);
    }
    public payement findbyid(long id){
        return payementRepository.findById(id).get();
    }
    public void deletepayement(long id){

        payementRepository.deleteById(id);
    }

    public  payement updatepayement(long id, payement p){
        payementRepository.findById(id);
        p.setId_payement(id);
        payement newu=p;
        return newu;

    }
}
