package com.G4.ATV_Backend.controller;

import com.G4.ATV_Backend.dto.AgentDto;
import com.G4.ATV_Backend.entities.Agent;
import com.G4.ATV_Backend.service.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/agent")
public class AgentController {

    @Autowired
    private AgentService agentService;

    @PostMapping
    public ResponseEntity<Agent> addAgent(@RequestBody Agent agent) {
        Agent newAgent = agentService.addAgent(agent);
        return ResponseEntity.ok(newAgent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agent> updateAgent(@PathVariable int id, @RequestBody Agent agentDetails) {
        try {
            Agent updatedAgent = agentService.updateAgent(id, agentDetails);
            return ResponseEntity.ok(updatedAgent);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Agent>> getAllAgents() {
        List<Agent> agents = agentService.getAllAgents();
        return ResponseEntity.ok(agents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agent> getAgentById(@PathVariable int id) {
        Optional<Agent> agent = agentService.getAgentById(id);
        return agent.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgent(@PathVariable int id) {
        agentService.deleteAgent(id);
        return ResponseEntity.noContent().build();
    }
}