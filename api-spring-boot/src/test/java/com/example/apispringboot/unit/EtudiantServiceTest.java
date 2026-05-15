package com.example.apispringboot.unit;

import com.example.apispringboot.dto.EtudiantDTO;
import com.example.apispringboot.mapper.EtudiantMapper;
import com.example.apispringboot.model.Etudiant;
import com.example.apispringboot.repository.EtudiantRepository;
import com.example.apispringboot.service.EtudiantService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EtudiantServiceTest {

    @Mock
    private EtudiantRepository repository;

    @Mock
    private EtudiantMapper mapper;

    @InjectMocks
    private EtudiantService service;

    @Test
    void shouldReturnAllEtudiants() {
        // given
        when(repository.findAll()).thenReturn(List.of(new Etudiant()));
        // when
        List<EtudiantDTO> result = service.findAll();
        // then
        assertThat(result).hasSize(1);
    }
}