package com.G4.ATV_Backend.service.impl;

import com.G4.ATV_Backend.dto.AgentDto;
import com.G4.ATV_Backend.entities.Agent;
import com.G4.ATV_Backend.enums.AgentSubType;
import com.G4.ATV_Backend.enums.AgentType;
import com.G4.ATV_Backend.repository.AgentRepository;
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

class AgentServiceImplTest {

    @Mock
    private AgentRepository agentRepository;

    @InjectMocks
    private AgentServiceImpl agentService;

    private Agent agent;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        agent = new Agent();
        agent.setId(1);
        agent.setName("Agent Virus");
        agent.setType(AgentType.INFECTIOUS_AGENT);
        agent.setSubType(AgentSubType.BACTERIA);
        agent.setImgUrl("http://example.com/img.jpg");
    }

    @Test
    void testAddAgent() {
        when(agentRepository.save(agent)).thenReturn(agent);

        Agent savedAgent = agentService.addAgent(agent);

        assertNotNull(savedAgent);
        assertEquals(agent.getName(), savedAgent.getName());
        verify(agentRepository, times(1)).save(agent);
    }

    @Test
    void testGetAllAgents() {
        Agent agent2 = new Agent();
        agent2.setId(2);
        agent2.setName("Agent Doe");
        agent2.setType(AgentType.IMMUNO_AGENT);
        agent2.setSubType(AgentSubType.ANTIBODY);
        agent2.setImgUrl("http://example.com/img2.jpg");

        when(agentRepository.findAll()).thenReturn(Arrays.asList(agent, agent2));

        List<Agent> agents = agentService.getAllAgents();

        assertEquals(2, agents.size());
        verify(agentRepository, times(1)).findAll();
    }

    @Test
    void testGetAgentById() {
        when(agentRepository.findById(1)).thenReturn(Optional.of(agent));

        Optional<Agent> foundAgent = agentService.getAgentById(1);

        assertTrue(foundAgent.isPresent());
        assertEquals(agent.getName(), foundAgent.get().getName());
        verify(agentRepository, times(1)).findById(1);
    }

    @Test
    void testGetAgentByIdNotFound() {
        when(agentRepository.findById(1)).thenReturn(Optional.empty());

        Optional<Agent> foundAgent = agentService.getAgentById(1);

        assertFalse(foundAgent.isPresent());
        verify(agentRepository, times(1)).findById(1);
    }

    @Test
    void testUpdateAgent() {
        Agent updatedDetails = new Agent();
        updatedDetails.setName("Agent Updated");
        updatedDetails.setType(AgentType.INFECTIOUS_AGENT);
        updatedDetails.setSubType(AgentSubType.BACTERIA);

        when(agentRepository.findById(1)).thenReturn(Optional.of(agent));
        when(agentRepository.save(any(Agent.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Agent updatedAgent = agentService.updateAgent(1, updatedDetails);

        assertNotNull(updatedAgent);
        assertEquals(updatedDetails.getName(), updatedAgent.getName());
        verify(agentRepository, times(1)).findById(1);
        verify(agentRepository, times(1)).save(any(Agent.class));
    }

    @Test
    void testUpdateAgentNotFound() {
        Agent updatedDetails = new Agent();
        updatedDetails.setName("Agent Updated");

        when(agentRepository.findById(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            agentService.updateAgent(1, updatedDetails);
        });

        assertEquals("Agent not found with id 1", exception.getMessage());
        verify(agentRepository, times(1)).findById(1);
        verify(agentRepository, never()).save(any(Agent.class));
    }

    @Test
    void testDeleteAgent() {
        doNothing().when(agentRepository).deleteById(1);

        agentService.deleteAgent(1);

        verify(agentRepository, times(1)).deleteById(1);
    }

    @Test
    void testCreateAgent() {
        AgentDto agentDto = new AgentDto();
        agentService.createAgent(agentDto);

        // No operation in createAgent, so no verification needed
        // This ensures no exceptions occur
        assertTrue(true);
    }
}
