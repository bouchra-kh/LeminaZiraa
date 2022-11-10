package com.example.agriculture.repository;

import com.example.agriculture.model.livraison;
import org.springframework.data.jpa.repository.JpaRepository;

public interface livraisonRepository extends JpaRepository<livraison,Long> {
}
