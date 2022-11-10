package com.example.agriculture.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class produit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id_produit;
    @Column(name = "nom")
    private  String nom;
    @Column(name = "prix")
    private double prix;
    @Column(name = "quantite")
    private String quantite;
    private String image;
    private String type;
    @ManyToOne
    @JoinColumn(name="id_utilisateur")
    private utilisateur utilisateur;

}
