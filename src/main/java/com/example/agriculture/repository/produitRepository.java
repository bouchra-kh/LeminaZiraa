package com.example.agriculture.repository;

import com.example.agriculture.model.produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface produitRepository extends JpaRepository<produit, Long> {
}
