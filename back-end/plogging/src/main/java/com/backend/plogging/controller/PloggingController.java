package com.backend.plogging.controller;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.domain.PloggingRecord;
import com.backend.plogging.dto.request.plogging.PloggingPostRequestDto;
import com.backend.plogging.dto.response.plogging.RecordResponseDto;
import com.backend.plogging.service.PloggingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/plogging")
public class PloggingController {

    private final PloggingService ploggingService;

    @PostMapping("")
    public BaseResponseEntity createRecord(@RequestBody PloggingPostRequestDto dto) {
        BaseResponseEntity response = ploggingService.create(dto);
        return response;
    }

    @GetMapping("")
    public BaseResponseEntity<List<RecordResponseDto>> getRecords() {
        BaseResponseEntity<List<RecordResponseDto>> response = ploggingService.getList();
        return response;
    }


}
