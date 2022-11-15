package com.example.agriculture.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.agriculture.model.utilisateur;
import com.example.agriculture.sec.SecurityParams;
import com.example.agriculture.service.AccountService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
//@CrossOrigin("*")
//@RequestMapping("/users")
public class UserController {
    @Autowired
    private AccountService accountService;
    @PostMapping("/register")
    // @PostAuthorize("hasAuthority('ADMIN')")
    public utilisateur register(@RequestBody  UserForm userForm){
        utilisateur ui =   accountService.saveUser(
                userForm.getUsername(),userForm.getPassword(),userForm.getConfirmedPassword(),userForm.getEmail(),userForm.getAdresse(),userForm.getTelephone());
        accountService.addRoleToUser(ui.getUsername(),"Admin");
        return ui;
    }

    //@PostAuthorize("hasAuthority('USER')")
    @GetMapping("/list")

    public List<utilisateur> listRespo(){
        List<utilisateur> users = accountService.getallUsers();
        return users;
    }
    @GetMapping(path="/refreshToken")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String auhToken=request.getHeader(SecurityParams.JWT_HEADER_NAME);
        if(auhToken!=null&& auhToken.startsWith(SecurityParams.HEADER_PREFIX)){try {
            String jwt = auhToken.substring(SecurityParams.HEADER_PREFIX.length());
            Algorithm algo = Algorithm.HMAC256(SecurityParams.SECRET);
            JWTVerifier jwtVerifier = JWT.require(algo).build();
            DecodedJWT decodedJWT = jwtVerifier.verify(jwt);
            String username = decodedJWT.getSubject();
            utilisateur user=accountService.loadUserByUsername(username);
            String jwtAcessToken=JWT.create()
                    .withSubject(user.getUsername())
                    .withExpiresAt(new Date(System.currentTimeMillis()+SecurityParams.EXPIRE_ACCESS_TOKEN))
                    .withIssuer(request.getRequestURL().toString())
                    .withClaim("roles",user.getRoles().stream().map(r->r.getRoleName()).collect(Collectors.toList()))
                    .sign (algo);
            Map<String,String> idToken=new HashMap<>();
            idToken.put("access-token",jwtAcessToken);
            idToken.put("refresh-token",jwt);
            response.setContentType("application/json");
            new ObjectMapper().writeValue(response.getOutputStream(), idToken);

        }catch (Exception e){
//            response.setHeader("error_message",e.getMessage());
//            response.sendError(HttpServletResponse.SC_FORBIDDEN);
            throw  e;
        }

        }else{
            throw new RuntimeException("refresh requierd !");
        }
    }
}

@Data
class UserForm{
    private String username;
    private String password;
    private String confirmedPassword;
    private String email;
    private String adresse;
    private String telephone;
}
