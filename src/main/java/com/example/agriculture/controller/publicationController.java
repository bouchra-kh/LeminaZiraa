package com.example.agriculture.controller;

import com.example.agriculture.model.moughataa;
import com.example.agriculture.model.publication;
import com.example.agriculture.repository.moughataaRepository;
import com.example.agriculture.service.publicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.*;
import java.util.List;
//@CrossOrigin("*")
@RequestMapping("/publication")
@RestController
public class publicationController {


    @Autowired
    private com.example.agriculture.service.publicationService publicationService;
    @Autowired
    private com.example.agriculture.repository.moughataaRepository moughataaRepository;
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public List<publication> listpublication(){
        List<publication> us = publicationService.getallpublication();
        return us;
    }
    @RequestMapping(value = "/listpublication/{id}", method = RequestMethod.GET)
    public List<publication> listpubmoughas(@PathVariable("id") long id){
        moughataa m = moughataaRepository.findById(id).get();
        List<publication> us = publicationService.getallpublicationmough(m);
        return us;
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity savepublication(@RequestBody publication publication){

        publicationService.save(publication);
        return  ResponseEntity.status(HttpStatus.CREATED).body("/publication/save");
    }

    @RequestMapping(value = "/find/{id}", method = RequestMethod.GET)
    public publication findpublication(@PathVariable("id") long id){

        publication u= publicationService.findbyid(id);
        if(u.equals(null)){
            System.out.println("Cet pub nexiste pas ");
        }
        return u;
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public String delete(@PathVariable("id") long id){

        publicationService.deletepublication(id);
        return "La suppresion avec success!";
    }
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public publication updatep(@PathVariable("id") long id, @RequestBody publication p){

        return publicationService.updatep(id,p);

    }


    @RequestMapping(value = "/photo",       method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void uploadImage(@RequestParam("img") MultipartFile image) throws IOException {
        System.out.println("jjjjjjjjjjjjjjjjj");
        System.out.println(image.getOriginalFilename());
        String ex= image.getOriginalFilename().split("\\.")[1];
        String name= image.getOriginalFilename().split("\\.")[0];
        System.out.println(ex);
        System.out.println("name :   "+name);
        String path ="C:\\sajide\\pr_rim\\src\\main\\resources\\images\\"+image.getOriginalFilename();
        byte[] data=image.getBytes();
        File file = new File(path);
        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))) {
            outputStream.write(data);

            // return "success ";
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println(e);
            // return "fail";
        }
        String path2 ="C:\\sajide\\pr_rim\\target\\classes\\images\\"+image.getOriginalFilename();
        byte[] data2=image.getBytes();
        File file2 = new File(path2);
        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file2))) {
            outputStream.write(data2);

            // return "success ";
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println(e);
            // return "fail";
        }
    }
    @RequestMapping(value = "/sid/{id}", method = RequestMethod.GET,
            produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<InputStreamResource> getImage(@PathVariable("id") String id)
            throws IOException {

        var imgFile = new ClassPathResource("images/"+id);

        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(imgFile.getInputStream()));

    }

}