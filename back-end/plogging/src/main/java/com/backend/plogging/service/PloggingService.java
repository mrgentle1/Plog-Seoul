package com.backend.plogging.service;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.domain.PloggingRecord;
import com.backend.plogging.domain.User;
import com.backend.plogging.dto.request.plogging.PloggingPostRequestDto;
import com.backend.plogging.dto.response.plogging.RecordResponseDto;
import com.backend.plogging.repository.PloggingRecordRepository;
import com.backend.plogging.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PloggingService {

    private final PloggingRecordRepository ploggingRecordRepository;
    private final UserRepository userRepository;

    public BaseResponseEntity<?> create(PloggingPostRequestDto dto) {

        PloggingRecord record = PloggingRecord.builder()
                .user(userRepository.findById(1l).get())
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

    public BaseResponseEntity<List<RecordResponseDto>> getList() {
        List<RecordResponseDto> records = this.ploggingRecordRepository.findAll().stream()
                .map(RecordResponseDto::new)
                .collect(Collectors.toList());
        return new BaseResponseEntity<>(HttpStatus.OK, records);
    }
}
