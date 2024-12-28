package com.G4.ATV_Backend.controller;

import com.G4.ATV_Backend.entities.Agent;
import com.G4.ATV_Backend.entities.Question;
import com.G4.ATV_Backend.repository.AgentRepository;
import com.G4.ATV_Backend.service.QuizService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class QuizControllerTest {

    @Mock
    private QuizService quizService;

    @Mock
    private AgentRepository agentRepository;

    @InjectMocks
    private QuizController quizController;

    @Test
    void testCreateQuestion() {
        Question question = new Question();
        question.setId(1);
        question.setQuestion("Sample question?");
        question.setOptions("1,2,3");

        when(quizService.createQuestion(any(Question.class))).thenReturn(question);

        Question response = quizController.createQuestion(question);

        assertNotNull(response);
        assertEquals(question, response);
        verify(quizService, times(1)).createQuestion(any(Question.class));
    }

    @Test
    void testGetQuestionByIdSuccess() {
        int questionId = 1;
        Question question = new Question();
        question.setId(questionId);
        question.setQuestion("Sample question?");

        when(quizService.getQuestionById(questionId)).thenReturn(Optional.of(question));

        ResponseEntity<Question> response = quizController.getQuestionById(questionId);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(question, response.getBody());
        verify(quizService, times(1)).getQuestionById(questionId);
    }

    @Test
    void testGetQuestionByIdNotFound() {
//        int questionId = 1;
//
//        when(quizService.getQuestionById(questionId)).thenReturn(Optional.empty());
//
//        ResponseEntity<Question> response = quizController.getQuestionById(questionId);
//
//        assertNotNull(response);
//        assertEquals(404, response.getStatusCodeValue());
//        verify(quizService, times(1)).getQuestionById(questionId);
    }

    @Test
    void testGetAllQuestions() {
        Question question1 = new Question();
        question1.setId(1);
        question1.setQuestion("Sample question 1?");
        question1.setOptions("1,2,3");

        Question question2 = new Question();
        question2.setId(2);
        question2.setQuestion("Sample question 2?");
        question2.setOptions("4,5,6");

        List<Question> questions = Arrays.asList(question1, question2);

        when(quizService.getAllQuestions()).thenReturn(questions);

        List<Question> response = quizController.getAllQuestions();

        assertNotNull(response);
        assertEquals(2, response.size());
        assertEquals(questions, response);
        verify(quizService, times(1)).getAllQuestions();
    }

    @Test
    void testGetOptionsById() {
        int questionId = 1;
        Question question = new Question();
        question.setId(questionId);
        question.setOptions("1,2,3");

        List<Agent> agents = Arrays.asList(new Agent(), new Agent());

        when(quizService.getQuestionById(questionId)).thenReturn(Optional.of(question));
        when(agentRepository.findByIdIn(anyList())).thenReturn(agents);

        List<Agent> response = quizController.getOptionsById(questionId);

        assertNotNull(response);
        assertEquals(2, response.size());
        verify(quizService, times(1)).getQuestionById(questionId);
        verify(agentRepository, times(1)).findByIdIn(anyList());
    }

    @Test
    void testUpdateQuestionSuccess() {
        int questionId = 1;
        Question questionDetails = new Question();
        questionDetails.setQuestion("Updated question?");

        Question updatedQuestion = new Question();
        updatedQuestion.setId(questionId);
        updatedQuestion.setQuestion("Updated question?");

        when(quizService.updateQuestion(eq(questionId), any(Question.class))).thenReturn(updatedQuestion);

        ResponseEntity<Question> response = quizController.updateQuestion(questionId, questionDetails);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(updatedQuestion, response.getBody());
        verify(quizService, times(1)).updateQuestion(eq(questionId), any(Question.class));
    }

    @Test
    void testUpdateQuestionNotFound() {
        int questionId = 1;
        Question questionDetails = new Question();

        when(quizService.updateQuestion(eq(questionId), any(Question.class))).thenThrow(new RuntimeException("Question not found"));

        ResponseEntity<Question> response = quizController.updateQuestion(questionId, questionDetails);

        assertNotNull(response);
        assertEquals(404, response.getStatusCodeValue());
        verify(quizService, times(1)).updateQuestion(eq(questionId), any(Question.class));
    }

    @Test
    void testDeleteQuestionSuccess() {
        int questionId = 1;

        doNothing().when(quizService).deleteQuestion(questionId);

        ResponseEntity<Void> response = quizController.deleteQuestion(questionId);

        assertNotNull(response);
        assertEquals(204, response.getStatusCodeValue());
        verify(quizService, times(1)).deleteQuestion(questionId);
    }

    @Test
    void testDeleteQuestionNotFound() {
        int questionId = 1;

        doThrow(new RuntimeException("Question not found")).when(quizService).deleteQuestion(questionId);

        ResponseEntity<Void> response = quizController.deleteQuestion(questionId);

        assertNotNull(response);
        assertEquals(404, response.getStatusCodeValue());
        verify(quizService, times(1)).deleteQuestion(questionId);
    }
}