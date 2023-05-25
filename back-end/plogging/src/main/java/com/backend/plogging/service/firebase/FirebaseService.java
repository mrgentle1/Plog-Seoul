package com.backend.plogging.service.firebase;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.dto.response.road.CourseImgPageResponseDto;
import com.backend.plogging.dto.response.road.CourseImgResponseDto;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.cloud.StorageClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FirebaseService {

    @Value("${app.firebase-bucket}")
    private String firebaseBucket;

    public String uploadFiles(MultipartFile file) throws IOException, FirebaseAuthException {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);
        InputStream content = new ByteArrayInputStream(file.getBytes());

        // 업로드 할 파일 이름 생성
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        Blob blob = bucket.create(fileName, file.getBytes(), file.getContentType());

        // Firebase Storage에 업로드 된 이미지 URL return
        return blob.getMediaLink();
    }

    /**
     * 코스 이미지 리스트 반환
     * @return  List<CourseImgResponseDto>
     */
    public BaseResponseEntity<CourseImgPageResponseDto> getCourseImages(String category) {
        List<String> directories = new ArrayList<>(Arrays.asList("course/doolrae", "course/doseong"));
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket);

        List<CourseImgResponseDto> imgList = new ArrayList<>();
        CourseImgPageResponseDto response = new CourseImgPageResponseDto();

        if (category != null){
            directories.clear();
            directories.add("course/" + category);
        }
        for (String dir : directories) {
            for (Blob blob : bucket.list(Storage.BlobListOption.prefix(dir)).iterateAll()) {

                if (blob.getName().equals(dir + "/")) continue;

                CourseImgResponseDto courseImgResponseDto = new CourseImgResponseDto();
                courseImgResponseDto.setDirectory(dir);
                courseImgResponseDto.setImgName(blob.getName());
                courseImgResponseDto.setImgUrl(blob.getMediaLink());

                imgList.add(courseImgResponseDto);
            }
        }

        response.setTotalElements(imgList.size());
        response.setCourseImages(imgList);

        return new BaseResponseEntity<>(HttpStatus.OK, response);
    }

}
