package com.backend.plogging.repository;

import com.backend.plogging.domain.TrashCan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrashCanRepository extends JpaRepository<TrashCan, Long> {
}
