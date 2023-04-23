package com.backend.plogging.repository;

import com.backend.plogging.domain.Path;
import com.backend.plogging.domain.PloggingRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PathRepository extends JpaRepository<Path, Long> {

    @Query("SELECT MAX(p.sequence) FROM Path p WHERE p.ploggingRecord = :ploggingRecord")
    Long findMaxSequenceByPloggingRecord(@Param("ploggingRecord") PloggingRecord ploggingRecord);

    List<Path> findByPloggingRecordRecordId(Long recordId);

    Page<Path> findByPloggingRecordRecordId(Long recordId, Pageable pageable);

}
