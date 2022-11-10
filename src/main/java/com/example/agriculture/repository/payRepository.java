package com.example.agriculture.repository;

import com.example.agriculture.model.payement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface payRepository extends JpaRepository<payement, Long> {
}
