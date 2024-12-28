package com.G4.ATV_Backend.service.impl;

import com.G4.ATV_Backend.dto.AgentDto;
import com.G4.ATV_Backend.entities.Agent;
import com.G4.ATV_Backend.repository.AgentRepository;
import com.G4.ATV_Backend.service.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgentServiceImpl implements AgentService {

    @Autowired
    private AgentRepository agentRepository;

    // Add a new agent
    @Override
    public Agent addAgent(Agent agent) {
        return agentRepository.save(agent);
    }

    // Get all agents
    @Override
    public List<Agent> getAllAgents() {
        return agentRepository.findAll();
    }

    // Get one agent by ID
    @Override
    public Optional<Agent> getAgentById(int id) {
        return agentRepository.findById(id);
    }

    // Update an agent
    @Override
    public Agent updateAgent(int id, Agent agentDetails) {
        return agentRepository.findById(id).map(agent -> {
            agent.setName(agentDetails.getName());
            agent.setType(agentDetails.getType());
            agent.setSubType(agentDetails.getSubType());
            return agentRepository.save(agent);
        }).orElseThrow(() -> new RuntimeException("Agent not found with id " + id));
    }

    // Delete an agent
    @Override
    public void deleteAgent(int id) {
        agentRepository.deleteById(id);
    }

    @Override
    public void createAgent(AgentDto agentDto) {
        return;
    }
}
