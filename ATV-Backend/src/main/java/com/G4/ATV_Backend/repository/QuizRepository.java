package com.G4.ATV_Backend.repository;

import com.G4.ATV_Backend.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Question, Integer> {
}
