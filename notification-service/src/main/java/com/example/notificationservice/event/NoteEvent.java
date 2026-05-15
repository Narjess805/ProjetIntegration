package com.example.notificationservice.event;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoteEvent {
    private Long studentId;
    private String matiere;
    private Double valeur;
    private LocalDateTime timestamp;
}
