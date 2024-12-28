package com.G4.ATV_Backend.service.impl;

import com.G4.ATV_Backend.entities.Agent;
import com.G4.ATV_Backend.entities.Question;
import com.G4.ATV_Backend.repository.AgentRepository;
import com.G4.ATV_Backend.repository.QuizRepository;
import com.G4.ATV_Backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private AgentRepository agentRepository;

    @Override
    public List<Question> getAllQuestions() {
        return quizRepository.findAll();
    }

    @Override
    public Optional<Question> getQuestionById(int id) {
        Question byId = quizRepository.findById(id).get();
        byId.setAgent(agentRepository.findById(byId.getAgentId()).get());
        return Optional.of(byId);
    }


    @Override
    public Question createQuestion(Question question) {
        return quizRepository.save(question);
    }

    @Override
    public Question updateQuestion(int id, Question quizDetails) {
        Question quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));
        quiz.setQuestion(quizDetails.getQuestion());
        quiz.setCorrectAnswer(quizDetails.getCorrectAnswer());
        quiz.setInfo(quizDetails.getInfo());
        return quizRepository.save(quiz);
    }

    @Override
    public void deleteQuestion(int id) {
        Question quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));
        quizRepository.delete(quiz);
    }

    @java.lang.Override
    public List<Agent> getAllAgentsById(List<Integer> agentIds) {
        return agentRepository.findAllById(agentIds);
    }

}
