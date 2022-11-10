package com.example.agriculture.sec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

//@CrossOrigin("*")
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.headers().frameOptions().disable();
        // http.authorizeRequests()
        //       .antMatchers("/Categorie/**").permitAll();
        //  http.authorizeRequests().antMatchers("/refreshToken**").permitAll();
        //  http.authorizeRequests().antMatchers(HttpMethod.POST,"/login","/register/**","*").permitAll();
        //http.authorizeRequests().antMatchers(HttpMethod.GET, "/cellule/list", "/story/", "/prompt/").permitAll();
        // http.authorizeRequests().antMatchers(HttpMethod.POST,"/list").hasAuthority("ADMIN");
        // .hasAnyRole("ADMIN","USER")
        //  http.authorizeRequests().antMatchers(HttpMethod.GET,"/Categorie/list").hasAnyRole("ADMIN","USER");
        // http.authorizeRequests().anyRequest().authenticated();

        // config.addAllowedOriginPattern("*")
        http.addFilter(new JWTAuthenticationFilter(authenticationManager(),userDetailsService));
        http.addFilterBefore(new JWTAuthorizationFiler(), UsernamePasswordAuthenticationFilter.class);
        http.formLogin();
    }
}
