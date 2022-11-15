package com.example.agriculture.repository;

import com.example.agriculture.model.moughataa;
import com.example.agriculture.model.publication;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface publicationRepository extends JpaRepository<publication,Long>{
    //List<wilaya> getAllByRegion(wilaya region);
    List<publication>findAllByMoughataa(moughataa moughataa);
    int countByMoughataa_Id(Long id);
}
