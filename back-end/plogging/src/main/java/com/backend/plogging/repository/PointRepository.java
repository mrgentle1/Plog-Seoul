package com.backend.plogging.repository;

import com.backend.plogging.domain.Point;
import com.backend.plogging.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Point, Long> {
    Page<Point> findAllByUser(User user, Pageable pageable);
}
