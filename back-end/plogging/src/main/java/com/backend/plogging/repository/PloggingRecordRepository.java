package com.backend.plogging.repository;

import com.backend.plogging.domain.PloggingRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PloggingRecordRepository extends JpaRepository<PloggingRecord, Long> {
}
