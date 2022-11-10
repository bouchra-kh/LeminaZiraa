package com.example.agriculture.model;



import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class publication {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id_publication;
    private String description;
    private boolean est_affiche;
    private Date date_publication;
    private String image;
    private String typesol;
    private Date anneerecolte;
    private  String semences;
    private  double quantite;
    private  String Superficies_agricoles;
    private  String Type_dirrigation;
    private  String typologie_agricoles;
    private  String decrues;

    @ManyToOne
    @JoinColumn(name="id_utilisateur")
    private utilisateur utilisateur;
    @ManyToOne
    //@JsonIgnore
    @JoinColumn(name="id_moughata")
    private moughataa moughataa;
}