package com.backend.plogging.repository;

import com.backend.plogging.domain.RouteData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RouteDataRepository extends JpaRepository<RouteData, Long> {
    Page<RouteData> findAll(Pageable pageable);
}
