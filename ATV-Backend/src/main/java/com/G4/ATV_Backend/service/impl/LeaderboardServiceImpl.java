package com.G4.ATV_Backend.service.impl;

import com.G4.ATV_Backend.entities.Leaderboard;
import com.G4.ATV_Backend.repository.LeaderboardRepository;
import com.G4.ATV_Backend.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeaderboardServiceImpl implements LeaderboardService {
    @Autowired
    private LeaderboardRepository leaderboardRepository;

    @Override
    public Leaderboard addNewScore(String username, int score) {
        Leaderboard newLead = new Leaderboard();
        newLead.setUsername(username);
        newLead.setScore(score);
        return leaderboardRepository.save(newLead);
    }

    @Override
    public Object getTopScores() {
        return leaderboardRepository.findTop10ByOrderByScoreDescUpdatedAtDesc();
    }


}
