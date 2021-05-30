package ifi.ase.ascout.browseservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CorsConfiguration is for configuring allowed origins
 */
@Configuration
public class CorsConfiguration {

    /**
     *  The allowed origins
     */
    @Value("${settings.cors_origin}")
    private String[] origins;

    /**
     * Configure the cors
     * @return WebMvcConfigurer
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/browse/**").allowedOrigins(origins);
            }
        };
    }
}