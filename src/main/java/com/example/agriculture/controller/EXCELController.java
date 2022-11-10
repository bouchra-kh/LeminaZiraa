package com.example.agriculture.controller;

//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
//import pfe.E_reclame.Backend.model.ResponseMessage;
//import pfe.E_reclame.Backend.model.Tutorial;
//import pfe.E_reclame.Backend.model.moughataa;
//import pfe.E_reclame.Backend.model.wilaya;
//import pfe.E_reclame.Backend.service.ExcelService;
//
//import java.util.List;
//
////@CrossOrigin("*")
//@Controller
//@RequestMapping("/api/excel")
//public class ExcelController {
//    @Autowired
//    ExcelService fileService;
//
//
//    @PostMapping("/upload")
//    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
//        String message = "";
//
//     //   if (ExcelHelper.hasExcelFormat(file)) {
//        //    try {
//                fileService.save(file);
//                System.out.println("entrerer");
//                message = "Uploaded the file successfully: " + file.getOriginalFilename();
//
//                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message,""));
////            } catch (Exception e) {
////                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
////                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message,""));
////            }
////        }
//       // message = "Please upload an excel file!";
//     //   return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message,""));
//    }
//
//    @GetMapping("/tutorials")
//    public ResponseEntity<List<wilaya>> getAllTutorials() {
//        try {
//            List<wilaya> tutorials = fileService.getAllTutorials();
//
//            if (tutorials.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//
//            return new ResponseEntity<>(tutorials, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//
//    @PostMapping("/upload2")
//    public ResponseEntity<ResponseMessage> uploadFile2(@RequestParam("file") MultipartFile file) {
//        String message = "";
//
//        //   if (ExcelHelper.hasExcelFormat(file)) {
//        //    try {
//        fileService.savem(file);
//        System.out.println("entrerer");
//        message = "Uploaded the file successfully: " + file.getOriginalFilename();
//
//        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message,""));
////            } catch (Exception e) {
////                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
////                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message,""));
////            }
////        }
//        // message = "Please upload an excel file!";
//        //   return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message,""));
//    }
//
//
//    @GetMapping("/tutorials2")
//    public ResponseEntity<List<moughataa>> getAllTutorials2() {
//        try {
//            List<moughataa> tutorials = fileService.getAllTutorialsm();
//
//            if (tutorials.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//
//            return new ResponseEntity<>(tutorials, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//