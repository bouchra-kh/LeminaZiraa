package com.example.agriculture.service;

import com.example.agriculture.model.livraison;
import com.example.agriculture.repository.livraisonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class livraisonService {
    @Autowired
    livraisonRepository livraisonRepository;
    public List<livraison> getalllivraisons(){
        return  livraisonRepository.findAll();
    }
    public void save(livraison u){
        livraisonRepository.save(u);
    }
    public livraison findbyid(long id){
        return  livraisonRepository.findById(id).get();
    }
    public void deletelivraison(long id){

        livraisonRepository.deleteById(id);
    }

    public livraison updatelivraison(long id,  livraison l){
        livraisonRepository.findById(id);
        l.setId_livraison(id);
        livraison newu=l;
        return newu;

    }
}
