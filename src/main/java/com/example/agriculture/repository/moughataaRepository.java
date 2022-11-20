package com.example.agriculture.repository;

import com.example.agriculture.model.moughataa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface moughataaRepository extends JpaRepository<moughataa,Long> {
    moughataa findByNom(String nom);
}
