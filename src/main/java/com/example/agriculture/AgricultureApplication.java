package com.example.agriculture;

import com.example.agriculture.model.moughataa;
import com.example.agriculture.model.wilaya;
import com.example.agriculture.service.AccountService;
import com.example.agriculture.service.moughataaService;
import com.example.agriculture.service.wilayaService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.File;
import java.util.List;

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true,securedEnabled = true)
public class AgricultureApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgricultureApplication.class, args);
	}
	@Bean
	CommandLineRunner runner(moughataaService moughataaService, AccountService accountService, wilayaService wilayaService){
		return args->{
			ObjectMapper mapper = new ObjectMapper();
			TypeReference<List<wilaya>> typeReferenceWilaya = new TypeReference<List<wilaya>>(){};
			List<wilaya> wilayas = mapper.readValue(new File("ref_wilayas.json"), typeReferenceWilaya);
                wilayas.forEach(wilaya -> {
					if (wilayaService.findbyid(wilaya.getId())==null){
						wilayaService.save(wilaya);
					}
				});


			// parse moughataa.json file and convert to moughataa object
			TypeReference<List<moughataa>> typeReference = new TypeReference<List<moughataa>>(){};
           List<moughataa> moughataas = mapper.readValue(new File("ref_moughataas.json"), typeReference);
			moughataas.forEach(moughataa -> {
				//System.out.println(moughataa.getId());
				if (moughataaService.findbyid(moughataa.getId())==null){
					moughataaService.save(moughataa);
				}
			});
		};
	}


	@Bean
	BCryptPasswordEncoder getBCPE(){
		return new BCryptPasswordEncoder();
	}



}
