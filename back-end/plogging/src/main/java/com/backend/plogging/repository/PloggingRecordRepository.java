package com.backend.plogging.repository;

import com.backend.plogging.domain.PloggingRecord;
import com.backend.plogging.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PloggingRecordRepository extends JpaRepository<PloggingRecord, Long> {
    Page<PloggingRecord> findAll(Pageable pageable);
}
