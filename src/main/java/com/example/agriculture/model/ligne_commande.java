package com.example.agriculture.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;


@Entity
@Data
public class ligne_commande {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id_ligne_commande ;
    private double prix_totale;
    private Date date_vente;
    private String quantite;

    @ManyToOne
    @JoinColumn(name="id_produit")
    private produit produit;
    @ManyToOne
    @JoinColumn(name="id_commande")
    private commande commande;
    @OneToOne
    private  payement payement;
    @OneToOne
    private  livraison livraison;
}
