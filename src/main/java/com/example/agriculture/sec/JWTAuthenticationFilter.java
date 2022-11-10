package com.example.agriculture.sec;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.agriculture.model.JwtResponse;
import com.example.agriculture.model.role;
import com.example.agriculture.model.utilisateur;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;
    private UserDetailsServiceImpl userDetailsService;
    public JWTAuthenticationFilter(AuthenticationManager authenticationManager,UserDetailsServiceImpl
            userDetailsService      ) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService=userDetailsService;
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String username=request.getParameter("username");
        String password=request.getParameter("password");
        System.out.println(username);
        System.out.println(password);
        UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(username,password);
        ;
        return authenticationManager.authenticate(authenticationToken);

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult) throws IOException {
        System.out.println("Succes");
        User user=(User)authResult.getPrincipal();
        Algorithm algo=Algorithm.HMAC256(SecurityParams.SECRET);
        String jwtAcessToken=JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+SecurityParams.EXPIRE_ACCESS_TOKEN))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles",user.getAuthorities().stream().
                        map(ga->ga.getAuthority()).collect(Collectors.toList()))
                .sign (algo);
        String jwtRefreshTokenToken=JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+SecurityParams.EXPIRE_REFRSH_TOKEN))
                .withIssuer(request.getRequestURL().toString())
                //.withClaim("roles",
                // user.getAuthorities().stream().map(ga->ga.getAuthority()).collect(Collectors.toList()))
                .sign (algo);


        Map<String, JwtResponse>idToken2=new HashMap<>();

      utilisateur a= userDetailsService.nn(user.getUsername());
        Collection<role> r2=userDetailsService.nn(user.getUsername()).getRoles();
        System.out.println("list roles  "+r2);
        JwtResponse jwtResponse=new JwtResponse(a,jwtAcessToken,jwtRefreshTokenToken);
        idToken2.put("user",jwtResponse);
        idToken2.put("roles",null);


        response.setContentType("application/json");
        new ObjectMapper().writeValue(response.getOutputStream(), idToken2);



    }


}
