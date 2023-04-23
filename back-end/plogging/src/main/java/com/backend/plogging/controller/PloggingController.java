package com.backend.plogging.controller;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.dto.request.plogging.PathRequestDto;
import com.backend.plogging.dto.request.plogging.PloggingPostRequestDto;
import com.backend.plogging.dto.response.plogging.RecordResponseDto;
import com.backend.plogging.service.PloggingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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

    @PostMapping("/{recordId}/paths")
    public BaseResponseEntity<?> createPath(@PathVariable Long recordId, @RequestBody PathRequestDto dto) {
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
