package com.example.agriculture.controller;

import com.example.agriculture.model.*;
import com.example.agriculture.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RequestMapping("/role")
@RestController
public class roleController {


    @Autowired
    private roleService roleService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<role> listrole(){
        List<role> us =roleService.getallrole();
        return us;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity saverole(@RequestBody role p){

        roleService.save(p);
        return  ResponseEntity.status(HttpStatus.CREATED).body("/role/save");

    }

    @RequestMapping(value = "/find/{id}", method = RequestMethod.GET)
    public role findrole(@PathVariable("id") long id){

        role u= roleService.findbyid(id);
        if(u.equals(null)){
            System.out.println("Cet role nexiste pas ");
        }
        return u;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public String delete(@PathVariable("id") long id){

        roleService.deleterole(id);
        return "La suppresion avec success!";
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public role updaterole(@PathVariable("id") long id, @RequestBody role r){

        return roleService.updater(id,r);

    }
}

