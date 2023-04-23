package com.backend.plogging.service;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.domain.Path;
import com.backend.plogging.domain.PloggingRecord;
import com.backend.plogging.domain.User;
import com.backend.plogging.dto.request.plogging.PathRequestDto;
import com.backend.plogging.dto.request.plogging.PloggingPostRequestDto;
import com.backend.plogging.dto.response.plogging.PathResponseDto;
import com.backend.plogging.dto.response.plogging.RecordResponseDto;
import com.backend.plogging.repository.PathRepository;
import com.backend.plogging.repository.PloggingRecordRepository;
import com.backend.plogging.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PloggingService {

    private final PloggingRecordRepository ploggingRecordRepository;
    private final UserRepository userRepository;
    private final PathRepository pathRepository;

    public BaseResponseEntity<?> createRecord(PloggingPostRequestDto dto, String email) {

        User user = userRepository.findByEmail(email).get();

        PloggingRecord record = PloggingRecord.builder()
                .user(user)
                .distance(dto.getDistance())
                .startLat(dto.getStartLat())
                .startLng(dto.getStartLng())
                .endLat(dto.getEndLat())
                .endLng(dto.getEndLng())
                .runningTime(dto.getRunningTime()).build();

        try {
            this.ploggingRecordRepository.save(record);
            return new BaseResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new BaseResponseEntity<>(e);
        }
    }

    public BaseResponseEntity<Page<RecordResponseDto>> getAllRecords(int pagingIndex, int pagingSize) {
        Pageable pageable = PageRequest.of(pagingIndex, pagingSize);
        Page<PloggingRecord> records = ploggingRecordRepository.findAll(pageable);
        return new BaseResponseEntity<>(HttpStatus.OK, records.map(RecordResponseDto::new));
    }

    public BaseResponseEntity<?> getRecordById(Long recordId) {
        Optional<PloggingRecord> record = ploggingRecordRepository.findById(recordId);
        if (record.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.OK, new RecordResponseDto(record.get()));
        } else {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "해당 기록이 존재하지 않습니다.");
        }
    }

    public BaseResponseEntity<?> deleteRecordById(Long recordId) {
        Optional<PloggingRecord> record = ploggingRecordRepository.findById(recordId);
        if (!record.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "해당 기록이 존재하지 않습니다.");
        } else {
            ploggingRecordRepository.delete(record.get());
            return new BaseResponseEntity<>(HttpStatus.OK, "기록이 삭제되었습니다.");
        }
    }

    public BaseResponseEntity<?> createPath(Long recordId, PathRequestDto dto) {
        Optional<PloggingRecord> record = ploggingRecordRepository.findById(recordId);
        if (!record.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "해당 기록이 존재하지 않습니다.");
        } else {
            Long maxSequence = pathRepository.findMaxSequenceByPloggingRecord(record.get());
            Long newSequence = maxSequence == null ? 1L : maxSequence + 1;

            Path path = Path.builder()
                    .ploggingRecord(record.get())
                    .wayLat(dto.getWayLat())
                    .wayLng(dto.getWayLng())
                    .sequence(newSequence)
                    .build();

            pathRepository.save(path);

            return new BaseResponseEntity<>(HttpStatus.OK);
        }
    }

    public BaseResponseEntity<Page<PathResponseDto>> getAllPaths(Long recordId, int pagingIndex, int pagingSize) {
        Pageable pageable = PageRequest.of(pagingIndex, pagingSize);
        Page<Path> paths = pathRepository.findByPloggingRecordRecordId(recordId, pageable);

        return new BaseResponseEntity<>(HttpStatus.OK, paths.map(PathResponseDto::new));
    }

    public BaseResponseEntity<?> deleteAllPaths(Long recordId) {
        List<Path> paths = pathRepository.findByPloggingRecordRecordId(recordId);
        for (Path path : paths) {
            pathRepository.delete(path);
        }
        return new BaseResponseEntity<>(HttpStatus.OK);
    }
}
