package com.G4.ATV_Backend.service;

import com.G4.ATV_Backend.dto.AgentDto;
import com.G4.ATV_Backend.entities.Agent;

import java.util.List;
import java.util.Optional;

public interface AgentService {
    void createAgent(AgentDto agentDto);

    Agent addAgent(Agent agent);

    List<Agent> getAllAgents();

    Optional<Agent> getAgentById(int id);

    Agent updateAgent(int id, Agent agentDetails);

    void deleteAgent(int id);
}
