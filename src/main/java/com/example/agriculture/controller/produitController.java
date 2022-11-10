package com.example.agriculture.controller;

import com.example.agriculture.model.commande;
import com.example.agriculture.model.produit;
import com.example.agriculture.service.produitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//@CrossOrigin("*")
@RequestMapping("/produit")
@RestController
public class produitController {


    @Autowired
    private produitService produitService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<produit> listproduit(){
        List<produit> us =produitService.getallproduit();
        return us;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity savep(@RequestBody produit p){

        produitService.save(p);
        return  ResponseEntity.status(HttpStatus.CREATED).body("/produit/save");

    }

    @RequestMapping(value = "/find/{id}", method = RequestMethod.GET)
    public produit findproduit(@PathVariable("id") long id){

        produit u= produitService.findbyid(id);
        if(u.equals(null)){
            System.out.println("Cet produit nexiste pas ");
        }
        return u;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public String delete(@PathVariable("id") long id){

        produitService.deleteproduit(id);
        return "La suppresion avec success!";
    }
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public produit updatep(@PathVariable("id") long id, @RequestBody produit p){

        return produitService.updatep(id,p);

    }

}

