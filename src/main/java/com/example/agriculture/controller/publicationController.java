package com.example.agriculture.controller;

import com.example.agriculture.model.moughataa;
import com.example.agriculture.model.publication;
import com.example.agriculture.repository.moughataaRepository;
import com.example.agriculture.service.publicationService;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Objects;

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

    @RequestMapping(value = "/countByMoughataa/{id}", method = RequestMethod.GET)
    public int countByMoughataa(@PathVariable("id") long id){
        return publicationService.countpublicationmough(id);

    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public publication savepublication(@RequestBody publication publication){

        publicationService.save(publication);
        return  publication;
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


    @RequestMapping(value = "/photo/{id}",       method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void uploadImage(@RequestParam("img") MultipartFile image, @PathVariable() Long id) throws IOException {
   publication p = publicationService.findbyid(id);
        //        System.out.println(image.getOriginalFilename());
//        String ex= image.getOriginalFilename().split("\\.")[1];
//        String name= image.getOriginalFilename().split("\\.")[0];
//        System.out.println(ex);
//        System.out.println("name :   "+name);
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(image.getOriginalFilename()));

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new FileUploadException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            String fileExtension = fileName.substring(fileName.lastIndexOf("."));
            Path targetLocation = Paths.get("src", "main", "resources", "images/" + p.getId_publication()+fileExtension);

            Files.copy(image.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ex) {
            System.out.println("error file is null");
            System.out.println(ex.getMessage());
            // throw new FileUploadException();
        }
    }


//        String path ="C:\\sajide\\pr_rim\\src\\main\\resources\\images\\"+image.getOriginalFilename();
//        byte[] data=image.getBytes();
//        File file = new File(path);
//        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))) {
//            outputStream.write(data);
//
//            // return "success ";
//        } catch (IOException e) {
//            e.printStackTrace();
//            System.out.println(e);
//            // return "fail";

//        String path2 ="C:\\sajide\\pr_rim\\target\\classes\\images\\"+image.getOriginalFilename();
//        byte[] data2=image.getBytes();
//        File file2 = new File(path2);
//        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file2))) {
//            outputStream.write(data2);
//
//            // return "success ";
//        } catch (IOException e) {
//            e.printStackTrace();
//            System.out.println(e);
//            // return "fail";
//        }

    @RequestMapping(value = "/sid/{id}", method = RequestMethod.GET,
            produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<InputStreamResource> getImage(@PathVariable("id") String id)
            throws IOException {
         publication publication= publicationService.findbyid(Long.parseLong(id));
         String fileExtension = publication.getImage().substring(publication.getImage().lastIndexOf("."));
         var imgFile = new ClassPathResource("images/"+publication.getId_publication()+fileExtension);
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(imgFile.getInputStream()));

    }


}
