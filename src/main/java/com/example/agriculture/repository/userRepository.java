package com.example.agriculture.repository;

import com.example.agriculture.model.utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userRepository extends JpaRepository<utilisateur, Long> {
    public utilisateur findByUsername(String username);
}
