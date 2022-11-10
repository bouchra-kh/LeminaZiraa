package com.example.agriculture.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Data

public class payement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id_payement;
    private String type_payement;
}
