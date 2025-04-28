package com.example.trueviewsys;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class TrueViewSysApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrueViewSysApplication.class, args);
    }

    //allow injection of RestTemplate in services
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
