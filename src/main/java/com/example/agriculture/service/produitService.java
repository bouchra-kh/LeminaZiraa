package com.example.agriculture.service;

import com.example.agriculture.model.commande;
import com.example.agriculture.model.produit;

import com.example.agriculture.repository.produitRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class produitService {
    @Autowired
    produitRepository  produitRepository;
    public List<produit> getallproduit( ){
        return  produitRepository.findAll();
    }
    public void save(produit p){
        produitRepository.save(p);
    }
    public  produit findbyid(long id){
        return produitRepository.findById(id).get();
    }
    public void deleteproduit(long id){

        produitRepository.deleteById(id);
    }

    public  produit updatep(long id,  produit p){
        produitRepository.findById(id);
        p.setId_produit(id);
        produit newu=p;
        return newu;

    }
}
