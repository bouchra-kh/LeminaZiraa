package com.example.agriculture.service;



import com.example.agriculture.model.moughataa;
import com.example.agriculture.model.publication;
import com.example.agriculture.repository.publicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class publicationService {
    @Autowired
    com.example.agriculture.repository.publicationRepository publicationRepository;
    public List<publication> getallpublication(){
        return  publicationRepository.findAll();
    }
    public List<publication> getallpublicationmough(moughataa m){
        return  publicationRepository.findAllByMoughataa( m);
    }
    public int countpublicationmough(Long id){
        return  publicationRepository.countByMoughataa_Id(id);
    }

    public void save(publication p){
        publicationRepository.save(p);
    }
    public publication  findbyid(long id){
        return publicationRepository.findById(id).get();
    }
    public void deletepublication(long id){

        publicationRepository.deleteById(id);
    }

    public publication updatep(long id, publication p){
        publicationRepository.findById(id);
        p.setId_publication(id);
        publication newu=publicationRepository.save(p);
        return newu;

    }
}
