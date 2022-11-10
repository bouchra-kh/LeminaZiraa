package com.example.agriculture.repository;

import com.example.agriculture.model.role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface roleRepository extends JpaRepository<role, Long> {
    role findByRoleName(String rolename);
}
