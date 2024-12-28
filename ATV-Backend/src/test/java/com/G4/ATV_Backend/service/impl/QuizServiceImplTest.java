package com.G4.ATV_Backend.service.impl;

import com.G4.ATV_Backend.entities.Agent;
import com.G4.ATV_Backend.entities.Question;
import com.G4.ATV_Backend.repository.AgentRepository;
import com.G4.ATV_Backend.repository.QuizRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class QuizServiceImplTest {

    @Mock
    private QuizRepository quizRepository;

    @Mock
    private AgentRepository agentRepository;

    @InjectMocks
    private QuizServiceImpl quizService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllQuestions() {
        // Arrange
        Question question1 = new Question();
        question1.setId(1);
        question1.setQuestion("What is the capital of France?");
        Question question2 = new Question();
        question2.setId(2);
        question2.setQuestion("What is 2+2?");
        List<Question> mockQuestions = Arrays.asList(question1, question2);

        when(quizRepository.findAll()).thenReturn(mockQuestions);

        // Act
        List<Question> result = quizService.getAllQuestions();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(quizRepository, times(1)).findAll();
    }

    @Test
    void testGetQuestionById() {
        // Arrange
        Question mockQuestion = new Question();
        mockQuestion.setId(1);
        mockQuestion.setQuestion("What is the capital of France?");
        mockQuestion.setAgentId(100);

        Agent mockAgent = new Agent();
        mockAgent.setId(100);
        mockAgent.setName("Agent A");

        when(quizRepository.findById(1)).thenReturn(Optional.of(mockQuestion));
        when(agentRepository.findById(100)).thenReturn(Optional.of(mockAgent));

        // Act
        Optional<Question> result = quizService.getQuestionById(1);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("What is the capital of France?", result.get().getQuestion());
        assertEquals(100, result.get().getAgentId());
        assertNotNull(result.get().getAgent());
        assertEquals("Agent A", result.get().getAgent().getName());
        verify(quizRepository, times(1)).findById(1);
        verify(agentRepository, times(1)).findById(100);
    }

    @Test
    void testCreateQuestion() {
        // Arrange
        Question newQuestion = new Question();
        newQuestion.setQuestion("What is the capital of France?");
        when(quizRepository.save(newQuestion)).thenReturn(newQuestion);

        // Act
        Question result = quizService.createQuestion(newQuestion);

        // Assert
        assertNotNull(result);
        assertEquals("What is the capital of France?", result.getQuestion());
        verify(quizRepository, times(1)).save(newQuestion);
    }

    @Test
    void testUpdateQuestion() {
        // Arrange
        int id = 1;
        Question existingQuestion = new Question();
        existingQuestion.setId(id);
        existingQuestion.setQuestion("Old Question");

        Question updatedDetails = new Question();
        updatedDetails.setQuestion("New Question");
        updatedDetails.setCorrectAnswer(42);
        updatedDetails.setInfo("Updated info");

        when(quizRepository.findById(id)).thenReturn(Optional.of(existingQuestion));
        when(quizRepository.save(existingQuestion)).thenReturn(existingQuestion);

        // Act
        Question result = quizService.updateQuestion(id, updatedDetails);

        // Assert
        assertNotNull(result);
        assertEquals("New Question", result.getQuestion());
        assertEquals(42, result.getCorrectAnswer());
        assertEquals("Updated info", result.getInfo());
        verify(quizRepository, times(1)).findById(id);
        verify(quizRepository, times(1)).save(existingQuestion);
    }

    @Test
    void testDeleteQuestion() {
        // Arrange
        int id = 1;
        Question existingQuestion = new Question();
        existingQuestion.setId(id);

        when(quizRepository.findById(id)).thenReturn(Optional.of(existingQuestion));
        doNothing().when(quizRepository).delete(existingQuestion);

        // Act
        quizService.deleteQuestion(id);

        // Assert
        verify(quizRepository, times(1)).findById(id);
        verify(quizRepository, times(1)).delete(existingQuestion);
    }

    @Test
    void testGetAllAgentsById() {
        // Arrange
        Agent agent1 = new Agent();
        agent1.setId(1);
        agent1.setName("Agent A");
        Agent agent2 = new Agent();
        agent2.setId(2);
        agent2.setName("Agent B");
        List<Agent> mockAgents = Arrays.asList(agent1, agent2);

        when(agentRepository.findAllById(Arrays.asList(1, 2))).thenReturn(mockAgents);

        // Act
        List<Agent> result = quizService.getAllAgentsById(Arrays.asList(1, 2));

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Agent A", result.get(0).getName());
        assertEquals("Agent B", result.get(1).getName());
        verify(agentRepository, times(1)).findAllById(Arrays.asList(1, 2));
    }
}
