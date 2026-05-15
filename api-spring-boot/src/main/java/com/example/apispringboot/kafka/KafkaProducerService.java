package com.example.apispringboot.kafka;

import com.example.apispringboot.dto.EtudiantDTO;
import com.example.apispringboot.event.EtudiantEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {
    private final KafkaTemplate<String, EtudiantEvent> kafkaTemplate;
    // On publie l'événement sur le topic "etudiant-created".
    // Le service qui crée l'étudiant appelle cette méthode sans se soucier
    // de qui va traiter l'événement ni quand.
    public void publishEtudiantCreated(EtudiantDTO etudiant) {
        EtudiantEvent event = EtudiantEvent.builder()
                .etudiantId(etudiant.getId())
                .nom(etudiant.getNom())
                .email(etudiant.getEmail())
                .timestamp(LocalDateTime.now())
                .build();
        kafkaTemplate.send("etudiant-created", event);
    }
}
