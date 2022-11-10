package com.example.agriculture.controller;

import com.example.agriculture.model.wilaya;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
public class moughtbublication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private double latt;
    private double longt;
    private int np;
    private String wilaya;
}
