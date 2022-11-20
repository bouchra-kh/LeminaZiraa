package com.example.agriculture.model;



import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Getter
public class publication {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id_publication;
    private String titre;
    @Lob
    private String description;
    private boolean est_affiche;
    private Date date_publication;
    private String image;
    private Date anneerecolte;
    private  String semences;
    private  double quantite;
    private  String Superficies_agricoles;
    private  String decrues;
    private double prix_semance;
    private double main_ouvre;
    private double prix_outils;

    @Column(columnDefinition = "boolean default false")
    private boolean valide;
    @ManyToOne
    @JoinColumn(name="id_utilisateur")
    private utilisateur utilisateur;
    @ManyToOne
    //@JsonIgnore
    @JoinColumn(name="id_moughata")
    @JsonBackReference
    private moughataa moughataa;
    @ManyToOne
    @JoinColumn(name = "type_sole_id")
    private TypeSole typeSole;
    @ManyToOne
    @JoinColumn(name = "type_irrigation_id")
    private TypeIrrigation typeIrrigation;

    @ManyToOne
    @JoinColumn(name = "typologie_agricole_id")
    private TypologieAgricole typologieAgricole;
}
