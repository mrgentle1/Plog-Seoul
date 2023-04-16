package com.backend.plogging.repository;

import com.backend.plogging.domain.Path;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PathRepository extends JpaRepository<Path, Long> {
}
