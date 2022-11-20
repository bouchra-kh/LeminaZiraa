package com.example.agriculture.controller;


import com.example.agriculture.service.publicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/stat")
public class StatController {
    @Autowired
    publicationService publicationService;
    // count of publications by mouhataa
      @GetMapping("/publications")
      @ResponseBody
      public Map<String,Long> publication(){
          Map<String, Long> publications = new HashMap<>();
              publications.put("count",publicationService.count());
              publications.put("prc_valider", (long) publicationService.prctVlider());
              publications.put("total_superficie", (long) publicationService.totalSuperfecie());
            return publications;
        }
}
