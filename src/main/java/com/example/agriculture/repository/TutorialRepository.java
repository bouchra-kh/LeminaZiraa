package com.example.agriculture.repository;

import com.example.agriculture.model.Tutorial;
import org.springframework.data.jpa.repository.JpaRepository;



public interface TutorialRepository extends JpaRepository<Tutorial, Long> {
}
