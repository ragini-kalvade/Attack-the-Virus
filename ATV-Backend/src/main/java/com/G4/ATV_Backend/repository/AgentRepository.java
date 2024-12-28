package com.G4.ATV_Backend.repository;

import com.G4.ATV_Backend.entities.Agent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgentRepository extends JpaRepository<Agent, Integer> {
    List<Agent> findByIdIn(List<Integer> ids);
}
