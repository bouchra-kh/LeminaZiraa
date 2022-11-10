package com.example.agriculture.controller;

import com.example.agriculture.model.ResponseMessage;
import com.example.agriculture.model.wilaya;
import com.example.agriculture.repository.wilayaRepository;
import com.example.agriculture.service.ExcelService;
import com.example.agriculture.service.wilayaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/wilaya")
@RestController
//@CrossOrigin("*")
public class wilayaController {

    @Autowired
    private com.example.agriculture.service.wilayaService wilayaService;
    @Autowired
    private wilayaRepository wilayaReposirory;
    @Autowired
    ExcelService fileService;


    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";

        //   if (ExcelHelper.hasExcelFormat(file)) {
        //    try {
        fileService.save(file);
        System.out.println("entrerer");
        message = "Uploaded the file successfully: " + file.getOriginalFilename();

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message,""));
//            } catch (Exception e) {
//                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
//                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message,""));
//            }
//        }
        // message = "Please upload an excel file!";
        //   return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message,""));
    }

    @GetMapping("/tutorials")
    public ResponseEntity<List<wilaya>> getAllTutorials() {
        try {
            List<wilaya> tutorials = fileService.getAllTutorials();

            if (tutorials.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(tutorials, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<wilaya> listrrr(){
        List<wilaya> lm =wilayaReposirory.findAll();
        return lm;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity saveW(@RequestBody wilaya w){

        wilayaService.save(w);
        return  ResponseEntity.status(HttpStatus.CREATED).body("/willaya/save");

    }

    @RequestMapping(value = "/find/{id}", method = RequestMethod.GET)
    public wilaya findWillaya(@PathVariable("id") long id){

        wilaya w= wilayaService.findbyid(id);
        if(w.equals(null)){
            System.out.println("Cet wilaya nexiste pas ");
        }
        return w;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public String delete(@PathVariable("id") long id){

        wilayaService.deletewilaya(id);
        return "La suppresion avec success!";
    }
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public wilaya updatew(@PathVariable("id") long id, @RequestBody wilaya w){

        return wilayaService.updatew(id,w);

    }

}
