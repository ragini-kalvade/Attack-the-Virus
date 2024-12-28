package com.G4.ATV_Backend.service;

import com.G4.ATV_Backend.entities.Agent;
import com.G4.ATV_Backend.entities.Question;

import java.util.List;
import java.util.Optional;

public interface QuizService {
    List<Question> getAllQuestions();

    Optional<Question> getQuestionById(int id);

    Question createQuestion(Question question);

    Question updateQuestion(int id, Question questionDetails);

    void deleteQuestion(int id);

    List<Agent> getAllAgentsById(List<Integer> agentIds);
}
