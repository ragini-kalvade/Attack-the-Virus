package com.G4.ATV_Backend.repository;

import com.G4.ATV_Backend.entities.Leaderboard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaderboardRepository extends JpaRepository<Leaderboard, Integer> {
    List<Leaderboard> findTop10ByOrderByScoreDescUpdatedAtDesc();
}
