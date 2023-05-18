package com.backend.plogging.controller;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.service.firebase.FirebaseService;
import com.google.firebase.auth.FirebaseAuthException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final FirebaseService firebaseService;

    @PostMapping("")
    public BaseResponseEntity<?> uploadImage(@RequestPart MultipartFile image) throws IOException, FirebaseAuthException {
        String imageUrl = firebaseService.uploadFiles(image);
        return new BaseResponseEntity<>(HttpStatus.OK, imageUrl);
    }
}
