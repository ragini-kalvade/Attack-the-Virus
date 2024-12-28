package com.G4.ATV_Backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/health")
    public String healthCheck() {
        return "Health Check";
    }

    @GetMapping("/admin/health")
    public String securedHealthCheck() {
        return "Admin Health Check";
    }

}
