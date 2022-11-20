package com.example.agriculture.service;

import com.example.agriculture.model.produit;
import com.example.agriculture.model.wilaya;
import com.example.agriculture.repository.produitRepository;
import com.example.agriculture.repository.wilayaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class wilayaService
{




        @Autowired
       wilayaRepository  wilayaRepository;
public List<wilaya>getallWilaya( ){
            return  wilayaRepository.findAll();
        }
        public void save(wilaya w){
            wilayaRepository.save(w);
        }
        public  wilaya findbyid(long id){
            return wilayaRepository.findById(id).isPresent()?wilayaRepository.findById(id).get():null;
        }
        public void deletewilaya(long id){

           wilayaRepository.deleteById(id);
        }

        public wilaya updatew(long id,  wilaya w){
            wilayaRepository.findById(id);
            w.setId(id);
            wilaya newu=  wilayaRepository.save(w);
           // wilaya newu=w;
            return newu;

        }

        public wilaya findByNom(String nom){
            return wilayaRepository.findByNom(nom);
        }
    }


