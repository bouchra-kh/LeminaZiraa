package com.example.agriculture;

import com.example.agriculture.model.role;
import com.example.agriculture.service.AccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.stream.Stream;

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true,securedEnabled = true)
public class AgricultureApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgricultureApplication.class, args);
	}
//	@Bean
//	CommandLineRunner start(AccountService accountService){
//		return args->{
//			accountService.save(new role(null,"USER"));
//			accountService.save(new role(null,"ADMIN"));
//			Stream.of("user","admin").forEach(un->{
//				accountService.saveUser(un,"1234","1234");
//			});
//			accountService.addRoleToUser("admin","ADMIN");
//			accountService.addRoleToUser("user","USER");
//		};
//	}
	@Bean
	BCryptPasswordEncoder getBCPE(){
		return new BCryptPasswordEncoder();
	}



}
