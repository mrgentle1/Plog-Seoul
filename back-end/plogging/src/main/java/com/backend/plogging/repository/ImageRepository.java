package com.backend.plogging.repository;

import com.backend.plogging.domain.Image;
import com.backend.plogging.domain.PloggingRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByPloggingRecord(PloggingRecord record);
}
