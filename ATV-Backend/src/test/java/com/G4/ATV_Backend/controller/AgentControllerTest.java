package com.G4.ATV_Backend.controller;

import com.G4.ATV_Backend.entities.Agent;
import com.G4.ATV_Backend.service.AgentService;
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
class AgentControllerTest {

    @Mock
    private AgentService agentService;

    @InjectMocks
    private AgentController agentController;

    @Test
    void testAddAgent() {
        Agent agent = new Agent();
        agent.setId(1);
        agent.setName("Test Agent");

        when(agentService.addAgent(any(Agent.class))).thenReturn(agent);

        ResponseEntity<Agent> response = agentController.addAgent(agent);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(agent, response.getBody());
        verify(agentService, times(1)).addAgent(any(Agent.class));
    }

    @Test
    void testUpdateAgentSuccess() {
        int agentId = 1;
        Agent agentDetails = new Agent();
        agentDetails.setName("Updated Agent");

        Agent updatedAgent = new Agent();
        updatedAgent.setId(agentId);
        updatedAgent.setName("Updated Agent");

        when(agentService.updateAgent(eq(agentId), any(Agent.class))).thenReturn(updatedAgent);

        ResponseEntity<Agent> response = agentController.updateAgent(agentId, agentDetails);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(updatedAgent, response.getBody());
        verify(agentService, times(1)).updateAgent(eq(agentId), any(Agent.class));
    }

    @Test
    void testUpdateAgentNotFound() {
        int agentId = 1;
        Agent agentDetails = new Agent();

        when(agentService.updateAgent(eq(agentId), any(Agent.class))).thenThrow(new RuntimeException("Agent not found"));

        ResponseEntity<Agent> response = agentController.updateAgent(agentId, agentDetails);

        assertNotNull(response);
        assertEquals(404, response.getStatusCodeValue());
        verify(agentService, times(1)).updateAgent(eq(agentId), any(Agent.class));
    }

    @Test
    void testGetAllAgents() {
        Agent agent1 = new Agent();
        agent1.setId(1);
        agent1.setName("Agent 1");

        Agent agent2 = new Agent();
        agent2.setId(2);
        agent2.setName("Agent 2");

        List<Agent> agents = Arrays.asList(agent1, agent2);

        when(agentService.getAllAgents()).thenReturn(agents);

        ResponseEntity<List<Agent>> response = agentController.getAllAgents();

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(agents, response.getBody());
        verify(agentService, times(1)).getAllAgents();
    }

    @Test
    void testGetAgentByIdSuccess() {
        int agentId = 1;
        Agent agent = new Agent();
        agent.setId(agentId);
        agent.setName("Test Agent");

        when(agentService.getAgentById(agentId)).thenReturn(Optional.of(agent));

        ResponseEntity<Agent> response = agentController.getAgentById(agentId);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(agent, response.getBody());
        verify(agentService, times(1)).getAgentById(agentId);
    }

    @Test
    void testGetAgentByIdNotFound() {
        int agentId = 1;

        when(agentService.getAgentById(agentId)).thenReturn(Optional.empty());

        ResponseEntity<Agent> response = agentController.getAgentById(agentId);

        assertNotNull(response);
        assertEquals(404, response.getStatusCodeValue());
        verify(agentService, times(1)).getAgentById(agentId);
    }

    @Test
    void testDeleteAgent() {
        int agentId = 1;

        doNothing().when(agentService).deleteAgent(agentId);

        ResponseEntity<Void> response = agentController.deleteAgent(agentId);

        assertNotNull(response);
        assertEquals(204, response.getStatusCodeValue());
        verify(agentService, times(1)).deleteAgent(agentId);
    }
}