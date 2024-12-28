package com.G4.ATV_Backend.controller;

import com.G4.ATV_Backend.entities.Agent;
import com.G4.ATV_Backend.entities.Question;
import com.G4.ATV_Backend.repository.AgentRepository;
import com.G4.ATV_Backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;
    @Autowired
    private AgentRepository agentRepository;

    // Create a new quiz
    @PostMapping
    public Question createQuestion(@RequestBody Question question) {
        return quizService.createQuestion(question);
    }

    @GetMapping("/{id}/question")
    public ResponseEntity<Question> getQuestionById(@PathVariable int id) {
        Question quiz = quizService.getQuestionById(id).get();
        return quiz != null ? ResponseEntity.ok(quiz) : ResponseEntity.notFound().build();
    }

    // Get all quizzes
    @GetMapping
    public List<Question> getAllQuestions() {
        return quizService.getAllQuestions();
    }

    // Get quiz by ID


    @GetMapping("/{id}/options")
    public List<Agent> getOptionsById(@PathVariable int id) {
        Question quiz = quizService.getQuestionById(id).get();
        List<Agent> quizOptions = new ArrayList<>();
        String[] split = quiz.getOptions().split(",");
        List<Integer> optionsList = Arrays.stream(split)
                .map(Integer::parseInt) // Convert each element to Integer
                .collect(Collectors.toList());
        return agentRepository.findByIdIn(optionsList);

    }


    // Update a quiz by ID
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable int id, @RequestBody Question questionDetails) {
        try {
            Question updatedQuestion = quizService.updateQuestion(id, questionDetails);
            return ResponseEntity.ok(updatedQuestion);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a quiz by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable int id) {
        try {
            quizService.deleteQuestion(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
