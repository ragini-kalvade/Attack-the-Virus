package com.G4.ATV_Backend.service.impl;

import com.G4.ATV_Backend.entities.Leaderboard;
import com.G4.ATV_Backend.repository.LeaderboardRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LeaderboardServiceImplTest {

    @InjectMocks
    private LeaderboardServiceImpl leaderboardService;

    @Mock
    private LeaderboardRepository leaderboardRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddNewScore_Success() {
        // Arrange
        String username = "test_user";
        int score = 150;
        Leaderboard savedLeaderboard = new Leaderboard();
        savedLeaderboard.setUsername(username);
        savedLeaderboard.setScore(score);

        when(leaderboardRepository.save(any(Leaderboard.class))).thenReturn(savedLeaderboard);

        // Act
        Leaderboard result = leaderboardService.addNewScore(username, score);

        // Assert
        assertNotNull(result);
        assertEquals(username, result.getUsername());
        assertEquals(score, result.getScore());
        verify(leaderboardRepository, times(1)).save(any(Leaderboard.class));
    }

    @Test
    void testGetTopScores_Success() {
        // Arrange
        List<Leaderboard> mockTopScores = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            Leaderboard entry = new Leaderboard();
            entry.setUsername("User" + i);
            entry.setScore(100 + i);
            mockTopScores.add(entry);
        }

        when(leaderboardRepository.findTop10ByOrderByScoreDescUpdatedAtDesc()).thenReturn(mockTopScores);

        // Act
        Object result = leaderboardService.getTopScores();

        // Assert
        assertNotNull(result);
        assertEquals(5, ((List<?>) result).size());
        verify(leaderboardRepository, times(1)).findTop10ByOrderByScoreDescUpdatedAtDesc();
    }

    @Test
    void testGetTopScores_EmptyList() {
        // Arrange
        when(leaderboardRepository.findTop10ByOrderByScoreDescUpdatedAtDesc()).thenReturn(new ArrayList<>());

        // Act
        Object result = leaderboardService.getTopScores();

        // Assert
        assertNotNull(result);
        assertTrue(((List<?>) result).isEmpty());
        verify(leaderboardRepository, times(1)).findTop10ByOrderByScoreDescUpdatedAtDesc();
    }

    @Test
    void testAddNewScore_RepositorySaveFailure() {
        // Arrange
        String username = "test_user";
        int score = 150;
        when(leaderboardRepository.save(any(Leaderboard.class))).thenThrow(new RuntimeException("Database error"));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> leaderboardService.addNewScore(username, score));
        assertEquals("Database error", exception.getMessage());
        verify(leaderboardRepository, times(1)).save(any(Leaderboard.class));
    }

    @Test
    void testGetTopScores_RepositoryFailure() {
        // Arrange
        when(leaderboardRepository.findTop10ByOrderByScoreDescUpdatedAtDesc())
                .thenThrow(new RuntimeException("Database error"));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, leaderboardService::getTopScores);
        assertEquals("Database error", exception.getMessage());
        verify(leaderboardRepository, times(1)).findTop10ByOrderByScoreDescUpdatedAtDesc();
    }
}
