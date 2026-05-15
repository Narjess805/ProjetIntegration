package com.example.gradingservice.kafka;

import com.example.gradingservice.dto.NoteDTO;
import com.example.gradingservice.event.NoteEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {
    private final KafkaTemplate<String, NoteEvent> kafkaTemplate;

    public void publishNoteCreated(NoteDTO note) {
        NoteEvent event = NoteEvent.builder()
                .studentId(note.getStudentId())
                .matiere(note.getMatiere())
                .valeur(note.getValeur())
                .timestamp(LocalDateTime.now())
                .build();
        kafkaTemplate.send("note-created", event);
    }
}
