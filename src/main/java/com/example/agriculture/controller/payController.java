package com.example.agriculture.controller;

import com.example.agriculture.model.*;
import com.example.agriculture.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//@CrossOrigin("*")
@RequestMapping("/payement")
@RestController
public class payController {


    @Autowired
    private payementService payementService;
    @PostAuthorize("hasAuthority('ADMIN')")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<payement> listrole(){
        List<payement> us =payementService.getallpayement();
        return us;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity savepay(@RequestBody payement p){

        payementService.save(p);
        return  ResponseEntity.status(HttpStatus.CREATED).body("/payement/save");

    }

    @RequestMapping(value = "/find/{id}", method = RequestMethod.GET)
    public payement findpayement(@PathVariable("id") long id){

        payement u= payementService.findbyid(id);
        if(u.equals(null)){
            System.out.println("Cet pay nexiste pas ");
        }
        return u;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public String delete(@PathVariable("id") long id){

        payementService.deletepayement(id);
        return "La suppresion avec success!";
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public payement updatepay(@PathVariable("id") long id, @RequestBody payement p){

        return payementService.updatepayement(id,p);

    }
}

