package com.backend.plogging.controller;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.service.TrashCanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/trash-cans")
public class TrashCanController {

    private final TrashCanService trashCanService;

    @GetMapping("")
    public BaseResponseEntity<?> getAllTrashCans() {
        BaseResponseEntity response = trashCanService.getAllTrashCans();
        return response;
    }

    @GetMapping("/{trashCanId}")
    public BaseResponseEntity<?> getTrashCan(@PathVariable Long trashCanId) {
        BaseResponseEntity response = trashCanService.getTrashCanById(trashCanId);
        return response;
    }
}
