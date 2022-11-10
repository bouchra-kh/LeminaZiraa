package com.example.agriculture.controller;

import com.example.agriculture.model.ResponseMessage;
import com.example.agriculture.model.moughataa;
import com.example.agriculture.service.ExcelService;
import com.example.agriculture.service.moughataaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.ArrayList;
import java.util.List;

@RequestMapping("/moughataaa")
@RestController
 //@CrossOrigin("*")
public class moughataaController {
    @Autowired
    moughataaService moughataaService;
    @Autowired
    ExcelService fileService;
    @Autowired
    com.example.agriculture.repository.publicationRepository publicationRepository;
    @PostMapping("/upload2")
    public ResponseEntity<ResponseMessage> uploadFile2(@RequestParam("file") MultipartFile file) {
        String message = "";

        //   if (ExcelHelper.hasExcelFormat(file)) {
        //    try {
        fileService.savem(file);
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


    @GetMapping("/tutorials2")
    public ResponseEntity<List<moughataa>> getAllTutorials2() {
        try {
            List<moughataa> tutorials = fileService.getAllTutorialsm();

            if (tutorials.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(tutorials, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<moughataa> listmoughataa1(){
        List<moughtbublication> lp=new ArrayList<>();

        List<moughataa> lm =moughataaService.getallMoughataa();
        return  lm;
    }
    @RequestMapping(value = "/listmap", method = RequestMethod.GET)
    public List<moughtbublication> listmoughataa(){
       List<moughtbublication> lp=new ArrayList<>();

        List<moughataa> lm =moughataaService.getallMoughataa();
        for(int i=0;i<lm.size();i++){
            int listp = publicationRepository.findAllByMoughataa(lm.get(i)).size();
            System.out.println(listp);
            moughtbublication mp=new moughtbublication();
            mp.setLatt(lm.get(i).getLatt());
            mp.setLongt(lm.get(i).getLongt());
            mp.setNom(lm.get(i).getNom());
            mp.setId(lm.get(i).getId());
            mp.setNp(listp);
           // mp.setId(lm.get(i).getId());
            if(lm.get(i).getWilaya()!=null){
            mp.setWilaya(lm.get(i).getWilaya().getNom());}
            System.out.println(mp);
            lp.add(mp);
        }

        return lp;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity savem(@RequestBody moughataa m){

        moughataaService.save(m);
        return  ResponseEntity.status(HttpStatus.CREATED).body("/moughataa/save");

    }

    @RequestMapping(value = "/find/{id}", method = RequestMethod.GET)
    public  moughataa findmoughataa(@PathVariable("id") long id){

        moughataa m= moughataaService.findbyid(id);
        if(m.equals(null)){
            System.out.println("Cet moughataa nexiste pas ");
        }
        return m;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public String delete(@PathVariable("id") long id){

        moughataaService.deletemoghata(id);
        return "La suppresion avec success!";
    }
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public moughataa updatem(@PathVariable("id") long id, @RequestBody moughataa m){

        return moughataaService.updateM(id,m);

    }

}
