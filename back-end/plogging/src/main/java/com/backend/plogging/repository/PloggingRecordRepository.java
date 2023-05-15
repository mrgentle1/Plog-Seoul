package com.backend.plogging.repository;

import com.backend.plogging.domain.PloggingRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface PloggingRecordRepository extends JpaRepository<PloggingRecord, Long> {
    Page<PloggingRecord> findAll(Pageable pageable);

    Page<PloggingRecord> findAllByUserEmail(String email, Pageable pageable);
    Page<PloggingRecord> findByUserEmailAndCreatedAtBetween(String email, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
}
