package com.G4.ATV_Backend.controller;

import com.G4.ATV_Backend.entities.Leaderboard;
import com.G4.ATV_Backend.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/leaderboard")
public class LeaderboardController {
    @Autowired
    private LeaderboardService leaderboardService;

    @PostMapping()
    public Leaderboard addNewScore(@RequestParam String username,@RequestParam int score){
        return leaderboardService.addNewScore(username, score);

    }

    @GetMapping()
    public Object getTopScores(){
        return leaderboardService.getTopScores();
    }
}
