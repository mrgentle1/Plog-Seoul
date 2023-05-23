package com.backend.plogging.controller;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.dto.request.plogging.ImageRequestDto;
import com.backend.plogging.dto.request.plogging.PathRequestDto;
import com.backend.plogging.dto.request.plogging.PloggingPostRequestDto;
import com.backend.plogging.dto.response.plogging.RecordResponseDto;
import com.backend.plogging.service.PloggingService;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/plogging")
public class PloggingController {

    private final PloggingService ploggingService;

    @PostMapping("")
    public BaseResponseEntity createRecord(@RequestBody PloggingPostRequestDto dto,
                                           Principal principal) {
        BaseResponseEntity response = ploggingService.createRecord(dto, principal.getName());
        return response;
    }

    @GetMapping("")
    public BaseResponseEntity<Page<RecordResponseDto>> getMyRecords(
            @RequestParam(value = "pagingIndex", defaultValue = "0") int pagingIndex,
            @RequestParam(value = "pagingSize", defaultValue = "50") int pagingSize,
            @ApiParam(value = "The date to filter records (format: YYYY-MM)"    )
            @RequestParam(required = false) String date, Principal principal) {
        BaseResponseEntity response = ploggingService.getRecordsByEmail(pagingIndex, pagingSize, date, principal.getName());
        return response;
    }

    @GetMapping("/ranking")
    public BaseResponseEntity<?> getRanking(Principal principal, @RequestParam PloggingService.SortBy sortBy) {
        BaseResponseEntity response = ploggingService.getWeeklyRankings(principal.getName(), sortBy);
        return response;
    }

    @GetMapping("/all")
    public BaseResponseEntity<Page<RecordResponseDto>> getAllRecords(
            @RequestParam(value = "pagingIndex", defaultValue = "0") int pagingIndex,
            @RequestParam(value = "pagingSize", defaultValue = "50") int pagingSize) {
        BaseResponseEntity response = ploggingService.getAllRecords(pagingIndex, pagingSize);
        return response;
    }

    @GetMapping("/{recordId}")
    public BaseResponseEntity<?> getRecord(@PathVariable Long recordId) {
        BaseResponseEntity response = ploggingService.getRecordById(recordId);
        return response;
    }

    @DeleteMapping("/{recordId}")
    public BaseResponseEntity<?> deleteRecord(@PathVariable Long recordId) {
        BaseResponseEntity response = ploggingService.deleteRecordById(recordId);
        return response;
    }

    @PatchMapping("/{recordId}")
    public BaseResponseEntity<?> updateRecord(@PathVariable Long recordId,
                                              @RequestBody PloggingPostRequestDto dto) {
        BaseResponseEntity response = ploggingService.updateRecord(recordId, dto);
        return response;
    }

    @PostMapping(value = "/{recordId}/images", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public BaseResponseEntity<?> uploadImage(@PathVariable Long recordId,
                                             @RequestBody ImageRequestDto dto) {
        BaseResponseEntity response = ploggingService.uploadImage(recordId, dto);
        return response;
    }

    @GetMapping("/{recordId}/images")
    public BaseResponseEntity<?> getAllImages(@PathVariable Long recordId) {
        BaseResponseEntity response = ploggingService.getAllImages(recordId);
        return response;
    }

    @DeleteMapping("/{recordId}/images")
    public BaseResponseEntity<?> deleteAllImages(@PathVariable Long recordId) {
        BaseResponseEntity response = ploggingService.deleteAllImages(recordId);
        return response;
    }

    @PostMapping("/{recordId}/paths")
    public BaseResponseEntity<?> createPath(@PathVariable Long recordId, @RequestBody List<PathRequestDto> dto) {
        BaseResponseEntity response = ploggingService.createPath(recordId, dto);
        return response;
    }

    @GetMapping("/{recordId}/paths")
    public BaseResponseEntity<?> getAllPaths(@PathVariable Long recordId,
                                             @RequestParam(value = "pagingIndex", defaultValue = "0") int pagingIndex,
                                             @RequestParam(value = "pagingSize", defaultValue = "50") int pagingSize) {
        BaseResponseEntity response = ploggingService.getAllPaths(recordId, pagingIndex, pagingSize);
        return response;
    }

    @DeleteMapping("/{recordId}/paths")
    public BaseResponseEntity<?> DeleteAllPaths(@PathVariable Long recordId) {
        BaseResponseEntity response = ploggingService.deleteAllPaths(recordId);
        return response;
    }

}
