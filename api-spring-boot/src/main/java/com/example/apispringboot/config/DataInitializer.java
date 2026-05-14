package com.example.apispringboot.config;

import com.example.apispringboot.model.Etudiant;
import com.example.apispringboot.repository.EtudiantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(EtudiantRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(Etudiant.builder()
                        .cin("12345678")
                        .nom("Nawres")
                        .dateNaissance(LocalDate.of(2000, 1, 15))
                        .build());

                repository.save(Etudiant.builder()
                        .cin("12345679")
                        .nom("Mohamed")
                        .dateNaissance(LocalDate.of(2001, 3, 22))
                        .build());

                repository.save(Etudiant.builder()
                        .cin("12345680")
                        .nom("Khaled")
                        .dateNaissance(LocalDate.of(1999, 7, 10))
                        .build());

                repository.save(Etudiant.builder()
                        .cin("12345681")
                        .nom("Sondess")
                        .dateNaissance(LocalDate.of(2002, 11, 5))
                        .build());

                repository.save(Etudiant.builder()
                        .cin("12345682")
                        .nom("Aya")
                        .dateNaissance(LocalDate.of(2000, 9, 30))
                        .build());
            }
        };
    }
}