package com.example.agriculture.repository;

import com.example.agriculture.model.wilaya;
import org.springframework.data.jpa.repository.JpaRepository;

public interface wilayaRepository extends JpaRepository<wilaya,Long> {
    wilaya findByNom(String nom);

}
