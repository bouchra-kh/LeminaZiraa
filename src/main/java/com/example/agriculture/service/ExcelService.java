package com.example.agriculture.service;


import java.io.IOException;
import java.util.List;

import com.example.agriculture.model.ExcelHelper;
import com.example.agriculture.model.ExcelHelper2;
import com.example.agriculture.model.moughataa;
import com.example.agriculture.model.wilaya;
import com.example.agriculture.repository.moughataaRepository;
import com.example.agriculture.repository.wilayaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



@Service
public class ExcelService {
    @Autowired
    wilayaRepository repository;
    @Autowired
    com.example.agriculture.repository.moughataaRepository moughataaRepository;
    public void save(MultipartFile file) {
        try {
            List<wilaya> tutorials = ExcelHelper.excelToTutorials(file.getInputStream());
            repository.saveAll(tutorials);
        } catch (IOException e) {
            throw new RuntimeException("fail to store excel data: " + e.getMessage());
        }
    }

    public List<wilaya> getAllTutorials() {
        return repository.findAll();
    }



    //moughaaaa

    public void savem(MultipartFile file) {
        try {
            List<moughataa> tutorials = ExcelHelper2.excelToTutorials(file.getInputStream());
            moughataaRepository.saveAll(tutorials);
        } catch (IOException e) {
            throw new RuntimeException("fail to store excel data: " + e.getMessage());
        }
    }

    public List<moughataa> getAllTutorialsm() {
        return moughataaRepository.findAll();
    }

}


