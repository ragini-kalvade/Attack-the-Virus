package com.G4.ATV_Backend.controller;

import com.G4.ATV_Backend.entities.Agent;
import com.G4.ATV_Backend.entities.MyUser;
import com.G4.ATV_Backend.entities.Question;
import com.G4.ATV_Backend.service.AgentService;
import com.G4.ATV_Backend.service.QuizService;
import com.G4.ATV_Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class GameController {
    @Autowired
    private UserService userService;
    @Autowired
    private QuizService quizService;
    @Autowired
    private AgentService agentService;

    @GetMapping("/play")
    public Question playGame(@RequestParam String username) {
        MyUser player = userService.getUserByUsername(username);
        Integer currentLevel = player.getLevel();
        Optional<Question> questionById = quizService.getQuestionById(currentLevel);
        if (questionById.isPresent()) {
            Question question = questionById.get();
            Agent agent = agentService.getAgentById(question.getAgentId()).get();
            question.setAgent(agent);
            return question;
        }else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Some Error occured");
        }
    }

    @GetMapping("/getOptions/{level}")
    public List<Agent> getOptions(@PathVariable Integer level) {
        Question questionById = quizService.getQuestionById(level).get();
        List<Integer> agentIds = Arrays.stream(questionById.getOptions().split(",")).map(Integer::parseInt).toList();
        return quizService.getAllAgentsById(agentIds);
    }

    @PostMapping("/submitAnswer/{questionId}")
    public boolean submitAnswer(@PathVariable Integer questionId, @RequestParam Integer answerId,@RequestParam String username) {
        int correctAnswer = quizService.getQuestionById(questionId).get().getCorrectAnswer();
        if(correctAnswer == answerId) {
            MyUser userByUsername = userService.getUserByUsername(username);
            userByUsername.setLevel(userByUsername.getLevel() + 1);
            userService.updateUser(userByUsername.getId(), userByUsername);
            return true;
        }
        return false;
    }




}
