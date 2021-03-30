package ifi.ase.ascout.finderservice.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/finder")
public class FinderController {

    @GetMapping("/")
    public String imHealthy() {
        return "{healthy:true}";
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s! Welcome to AScout.", name);
    }

}
