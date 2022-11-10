package com.example.agriculture.controller;

import com.example.agriculture.model.*;
import com.example.agriculture.service.ligne_commService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;

        import java.util.List;
//@CrossOrigin("*")
@RequestMapping("/lignecommande")
@RestController
public class ligne_commController {


    @Autowired
    ligne_commService ligne_commService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<ligne_commande> listligne_commande(){
        List<ligne_commande> us = ligne_commService.getallligne_commande();
        return us;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity saveligne_commande(@RequestBody ligne_commande c){

        ligne_commService.save(c);
        return  ResponseEntity.status(HttpStatus.CREATED).body("/lignecommande/save");

    }

    @RequestMapping(value = "/find/{id}", method = RequestMethod.GET)
    public ligne_commande findligne_commande(@PathVariable("id") long id){

        ligne_commande u= ligne_commService.findbyid(id);
        if(u.equals(null)){
            System.out.println("Cette lignedecomm nexiste pas ");
        }
        return u;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public String delete(@PathVariable("id") long id){

        ligne_commService.deleteligne_commande(id);
        return "La suppresion avec success!";
    }
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public ligne_commande updateligne_commande(@PathVariable("id") long id, @RequestBody ligne_commande c){

        return ligne_commService.updateligne_commande(id,c);

    }

}

