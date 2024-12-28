package com.G4.ATV_Backend.service;

import com.G4.ATV_Backend.entities.Leaderboard;

public interface LeaderboardService {
    Leaderboard addNewScore(String username, int score);

    Object getTopScores();
}
