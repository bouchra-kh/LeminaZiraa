package com.example.agriculture.repository;

import com.example.agriculture.model.commande;
import org.springframework.data.jpa.repository.JpaRepository;

public interface commandeRepository extends JpaRepository<commande, Long> {
}
