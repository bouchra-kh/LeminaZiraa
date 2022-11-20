package com.example.agriculture.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class moughataa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String nom;
    private double latt;
    private double longt;
    //private String Type_Sol;
    //private String Année_Récolte;
    // private String zone_agricoles;
    //private  String semences;
    @ManyToOne
    private wilaya wilaya;
    @OneToMany(
            mappedBy = "moughataa",
            cascade = javax.persistence.CascadeType.ALL
    )
    @JsonManagedReference
    List<publication> publicationList= new ArrayList<>();}
