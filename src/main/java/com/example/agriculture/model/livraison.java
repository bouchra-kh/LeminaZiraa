package com.example.agriculture.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;
@Entity
@Data
public class livraison {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_livraison;
    private String numlivraison;
    private Date date_livraison;
    private String localisation;
}
