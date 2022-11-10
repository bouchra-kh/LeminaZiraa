package com.example.agriculture.sec;

import org.springframework.web.bind.annotation.CrossOrigin;



public interface SecurityParams {
    public static final String JWT_HEADER_NAME="Authorization";
    public static final String SECRET="LM";
    public static final long EXPIRE_ACCESS_TOKEN=2*24*3600;
    public static final long EXPIRE_REFRSH_TOKEN=15*24*3600;
    public static final String HEADER_PREFIX="Bearer ";
}
