package com.example.agriculture.service;

import com.example.agriculture.model.commande;
import com.example.agriculture.model.produit;

import com.example.agriculture.repository.commandeRepository;
import com.example.agriculture.repository.produitRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class commandeService {
    @Autowired
    commandeRepository commandeRepository;
    public List<commande> getallcommande(){
        return  commandeRepository.findAll();
    }
    public void save(commande c){
        commandeRepository.save(c);
    }
    public  commande findbyid(long id){
        return commandeRepository.findById(id).get();
    }
    public void deletecommande(long id){

        commandeRepository.deleteById(id);
    }

    public  commande updatecommande(long id,  commande p){
        commandeRepository.findById(id);
        p.setId_commande(id);
        commande newu=p;
        return newu;

    }
}
