package com.example.gradingservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EtudiantDTO {

    private Long id;

    private String nom;

    private String prenom;

    private String email;

    private String cin;
}