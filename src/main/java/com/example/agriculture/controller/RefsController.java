package com.example.agriculture.controller;

import com.example.agriculture.model.TypeIrrigation;
import com.example.agriculture.model.TypeSole;
import com.example.agriculture.model.TypologieAgricole;
import com.example.agriculture.repository.TypeIrrigationRepository;
import com.example.agriculture.repository.TypeSoleRepository;
import com.example.agriculture.repository.TypologieAgricoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("/api/refs")
public class RefsController {
    @Autowired
    private TypeSoleRepository typeSoleRepository;
    @Autowired
    private TypeIrrigationRepository typeIrrigationRepository;
    @Autowired
    private TypologieAgricoleRepository typologieAgricoleRepository;

    @RequestMapping("/typeSoles")
    public List<TypeSole> getAllTypeSole() {
        return typeSoleRepository.findAll();
    }
    @RequestMapping("/typeIrrigations")
    public List<TypeIrrigation> getAllTypeIrrigation() {
        return typeIrrigationRepository.findAll();
    }
    @RequestMapping("/typologieAgricoles")
    public List<TypologieAgricole> getAllTypologieAgricole() {
        return typologieAgricoleRepository.findAll();
    }

}
