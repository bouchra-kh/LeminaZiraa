package com.example.agriculture.controller;

import com.example.agriculture.model.livraison;
import com.example.agriculture.service.livraisonService;
import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;

        import java.util.List;
//@CrossOrigin("*")
@RequestMapping("/livraison")
@RestController
public class livraisonController {


    @Autowired
    private livraisonService livraisonService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<livraison> listlivraison(){
        List<livraison> us = livraisonService.getalllivraisons();
        return us;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity savelivraison(@RequestBody livraison c){

        livraisonService.save(c);
        return  ResponseEntity.status(HttpStatus.CREATED).body("/livraison/save");

    }

    @RequestMapping(value = "/find/{id}", method = RequestMethod.GET)
    public livraison findlivraison(@PathVariable("id") long id){

        livraison u= livraisonService.findbyid(id);
        if(u.equals(null)){
            System.out.println("Cet livraison nexiste pas ");
        }
        return u;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public String delete(@PathVariable("id") long id){

        livraisonService.deletelivraison(id);
        return "La suppresion avec success!";
    }
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public livraison updatelivraison(@PathVariable("id") long id, @RequestBody livraison l){

        return livraisonService.updatelivraison(id,l);

    }

}

