package com.example.agriculture.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class commande {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id_commande;
    private boolean etat;
//    @OneToOne
//    @JoinColumn(name="id_client")
//    client client;
    @OneToMany(
            mappedBy = "commande"
            //    cascade = CascadeType.ALL,
             //orphanRemoval = true
    )
    List<ligne_commande> ligne_commandeList ;

}
