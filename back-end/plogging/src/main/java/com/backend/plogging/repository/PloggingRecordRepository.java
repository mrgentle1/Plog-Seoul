package com.backend.plogging.repository;

import com.backend.plogging.domain.PloggingRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PloggingRecordRepository extends JpaRepository<PloggingRecord, Long> {
    Page<PloggingRecord> findAll(Pageable pageable);

    Page<PloggingRecord> findAllByUserEmail(String email, Pageable pageable);
    Page<PloggingRecord> findByUserEmailAndCreatedAtBetween(String email, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

    @Query("SELECT p.user, SUM(p.distance) as totalDistance " +
            "FROM PloggingRecord p " +
            "WHERE p.createdAt >= :startOfWeek AND p.createdAt <= :endOfWeek " +
            "GROUP BY p.user " +
            "ORDER BY totalDistance DESC")
    List<Object[]> findWeeklyDistanceByUser(@Param("startOfWeek") LocalDateTime startOfWeek, @Param("endOfWeek") LocalDateTime endOfWeek);

}
