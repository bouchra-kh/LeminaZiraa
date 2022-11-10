package com.example.agriculture.repository;

import com.example.agriculture.model.ligne_commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ligne_commRepository extends JpaRepository<ligne_commande,Long> {
}
