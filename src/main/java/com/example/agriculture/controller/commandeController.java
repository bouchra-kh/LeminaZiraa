package com.example.agriculture.controller;

import com.example.agriculture.model.commande;
import com.example.agriculture.service.commandeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//@CrossOrigin("*")
@RequestMapping("/commande")
@RestController
public class commandeController {


    @Autowired
    private commandeService commandeService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<commande> listproduit(){
        List<commande> us =commandeService.getallcommande();
        return us;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity savecommande(@RequestBody commande p){

        commandeService.save(p);
        return  ResponseEntity.status(HttpStatus.CREATED).body("/commande/save");
    }

    @RequestMapping(value = "/find/{id}", method = RequestMethod.GET)
    public commande findcommande(@PathVariable("id") long id){

        commande u= commandeService.findbyid(id);
        if(u.equals(null)){
            System.out.println("Cet commm nexiste pas ");
        }
        return u;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public String delete(@PathVariable("id") long id){

        commandeService.deletecommande(id);
        return "La suppresion avec success!";
    }
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public commande updatecomm(@PathVariable("id") long id, @RequestBody commande c){

        return commandeService.updatecommande(id,c);

    }

}

