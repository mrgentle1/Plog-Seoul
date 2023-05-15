package com.backend.plogging.service;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.domain.Image;
import com.backend.plogging.domain.Path;
import com.backend.plogging.domain.PloggingRecord;
import com.backend.plogging.domain.User;
import com.backend.plogging.dto.request.plogging.ImageRequestDto;
import com.backend.plogging.dto.request.plogging.PathRequestDto;
import com.backend.plogging.dto.request.plogging.PloggingPostRequestDto;
import com.backend.plogging.dto.response.plogging.ImageResponseDto;
import com.backend.plogging.dto.response.plogging.PathResponseDto;
import com.backend.plogging.dto.response.plogging.RecordResponseDto;
import com.backend.plogging.repository.ImageRepository;
import com.backend.plogging.repository.PathRepository;
import com.backend.plogging.repository.PloggingRecordRepository;
import com.backend.plogging.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PloggingService {

    private final PloggingRecordRepository ploggingRecordRepository;
    private final UserRepository userRepository;
    private final PathRepository pathRepository;
    private final ImageRepository imageRepository;

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
            return new BaseResponseEntity<>(HttpStatus.OK, new RecordResponseDto(record));
        } catch (Exception e) {
            return new BaseResponseEntity<>(e);
        }
    }

    public BaseResponseEntity<Page<RecordResponseDto>> getRecordsByEmail(int pagingIndex, int pagingSize,
                                                                         String date, String email) {
        Pageable pageable = PageRequest.of(pagingIndex, pagingSize);
        Page<PloggingRecord> records;

        if (date != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
            YearMonth yearMonth = YearMonth.parse(date, formatter);
            int year = yearMonth.getYear();
            int month = yearMonth.getMonthValue();

            LocalDate startDate = LocalDate.of(year, month, 1); // Start date of the month
            LocalDate endDate = startDate.plusMonths(1).minusDays(1); // End date of the month

            LocalDateTime startDateTime = startDate.atStartOfDay(); // Convert to LocalDateTime (time set to 00:00:00)
            LocalDateTime endDateTime = endDate.atTime(23, 59, 59); // Convert to LocalDateTime (time set to 23:59:59)

            records = ploggingRecordRepository.findByUserEmailAndCreatedAtBetween(email, startDateTime, endDateTime, pageable);
        } else {
            records = ploggingRecordRepository.findAllByUserEmail(email, pageable);
        }

        return new BaseResponseEntity<>(HttpStatus.OK, records.map(RecordResponseDto::new));
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

    public BaseResponseEntity<?> updateRecord(Long recordId, PloggingPostRequestDto dto) {
        Optional<PloggingRecord> record = ploggingRecordRepository.findById(recordId);
        if (!record.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "해당 기록이 존재하지 않습니다.");
        } else {
            record.get().update(dto.getDistance(), dto.getEndLat(), dto.getEndLng(), dto.getRunningTime());

            Float weight;
            if (record.get().getUser().getGender().equals("male")) {
                weight = 74.1f;
            } else {
                weight = 57.8f;
            }
            record.get().setKcal((int) (record.get().getDistance() * weight * 0.6f));

            ploggingRecordRepository.save(record.get());
            return new BaseResponseEntity<>(HttpStatus.OK, new RecordResponseDto(record.get()));
        }
    }

    public BaseResponseEntity<?> uploadImage(Long recordId, ImageRequestDto dto) {
        Optional<PloggingRecord> record = ploggingRecordRepository.findById(recordId);

        if (!record.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            Image newImage = Image.builder()
                    .ploggingRecord(record.get())
                    .imgUrl(dto.getImageUrl())
                    .createdAt(LocalDateTime.now())
                    .imgLat(dto.getImgLat())
                    .imgLng(dto.getImgLng()).build();

            imageRepository.save(newImage);

            return new BaseResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new BaseResponseEntity<>(e);
        }
    }

    public BaseResponseEntity<?> getAllImages(Long recordId) {
        Optional<PloggingRecord> record = ploggingRecordRepository.findById(recordId);
        if (!record.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Image> imageList = imageRepository.findByPloggingRecord(record.get());
        return new BaseResponseEntity<>(HttpStatus.OK, imageList.stream().map(ImageResponseDto::new));
    }

    public BaseResponseEntity<?> deleteAllImages(Long recordId) {
        Optional<PloggingRecord> record = ploggingRecordRepository.findById(recordId);
        if (!record.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Image> imageList = imageRepository.findByPloggingRecord(record.get());
        for (Image image: imageList) {
            imageRepository.delete(image);
        }

        return new BaseResponseEntity<>(HttpStatus.OK);
    }

    public BaseResponseEntity<?> createPath(Long recordId, List<PathRequestDto> dtoList) {
        Optional<PloggingRecord> record = ploggingRecordRepository.findById(recordId);
        if (!record.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "해당 기록이 존재하지 않습니다.");
        } else {
            Long maxSequence = pathRepository.findMaxSequenceByPloggingRecord(record.get());
            Long newSequence = maxSequence == null ? 1L : maxSequence + 1;

            for (PathRequestDto dto : dtoList) {
                Path path = Path.builder()
                        .ploggingRecord(record.get())
                        .wayLat(dto.getLat())
                        .wayLng(dto.getLng())
                        .sequence(newSequence)
                        .build();

                pathRepository.save(path);
                newSequence++;
            }


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
