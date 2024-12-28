package com.G4.ATV_Backend.controller;

import com.G4.ATV_Backend.entities.Leaderboard;
import com.G4.ATV_Backend.service.LeaderboardService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LeaderboardControllerTest {

    @Mock
    private LeaderboardService leaderboardService;

    @InjectMocks
    private LeaderboardController leaderboardController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddNewScore() {
        String username = "testUser";
        int score = 150;
        Leaderboard mockLeaderboard = new Leaderboard();
        mockLeaderboard.setId(1);
        mockLeaderboard.setUsername(username);
        mockLeaderboard.setScore(score);
        mockLeaderboard.setCreatedAt(LocalDateTime.now());
        mockLeaderboard.setUpdatedAt(LocalDateTime.now());

        when(leaderboardService.addNewScore(username, score)).thenReturn(mockLeaderboard);

        Leaderboard result = leaderboardController.addNewScore(username, score);

        // Assert
        verify(leaderboardService, times(1)).addNewScore(username, score);
        assertNotNull(result);
        assertEquals(username, result.getUsername());
        assertEquals(score, result.getScore());
    }

    @Test
    void testGetTopScores() {
        Object mockTopScores = mock(Object.class);
        when(leaderboardService.getTopScores()).thenReturn(mockTopScores);

        // Act
        Object result = leaderboardController.getTopScores();

        // Assert
        verify(leaderboardService, times(1)).getTopScores();
        assertNotNull(result);
        assertEquals(mockTopScores, result);
    }
}
  
