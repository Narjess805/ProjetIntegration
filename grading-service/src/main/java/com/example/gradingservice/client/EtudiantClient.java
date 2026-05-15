package com.example.gradingservice.client;

import com.example.gradingservice.dto.EtudiantDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
@RequiredArgsConstructor
public class EtudiantClient {

    @Value("${clients.api-spring-boot.url}")
    private String etudiantServiceUrl;

    private final RestClient restClient = RestClient.create();

    public EtudiantDTO findById(Long id) {
        return restClient.get()
                .uri(etudiantServiceUrl + "/api/etudiants/{id}", id)
                .retrieve()
                .body(EtudiantDTO.class);
    }
}