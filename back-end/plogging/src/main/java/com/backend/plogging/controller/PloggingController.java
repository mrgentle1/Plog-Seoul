package com.backend.plogging.controller;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.dto.request.plogging.ImageRequestDto;
import com.backend.plogging.dto.request.plogging.PathRequestDto;
import com.backend.plogging.dto.request.plogging.PloggingPostRequestDto;
import com.backend.plogging.dto.response.plogging.RecordResponseDto;
import com.backend.plogging.service.PloggingService;
import com.backend.plogging.service.firebase.FirebaseService;
import com.google.firebase.auth.FirebaseAuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping(value = "/{recordId}/images", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public BaseResponseEntity<?> uploadImage(@PathVariable Long recordId,
                                             @RequestPart ImageRequestDto dto,
                                             @RequestPart MultipartFile image) throws IOException, FirebaseAuthException {
        BaseResponseEntity response = ploggingService.uploadImage(recordId, dto, image);
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
