package com.backend.plogging.service;

import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.domain.TrashCan;
import com.backend.plogging.repository.TrashCanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TrashCanService {

    private final TrashCanRepository trashCanRepository;

    public BaseResponseEntity<?> getAllTrashCans() {
        List<TrashCan> all = trashCanRepository.findAll();
        return new BaseResponseEntity<>(HttpStatus.OK, all);
    }

    public BaseResponseEntity<?> getTrashCanById(Long trashCanId) {
        Optional<TrashCan> trashCan = trashCanRepository.findById(trashCanId);
        if (trashCan.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.OK, trashCan.get());
        } else {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "잘못된 요청입니다.");
        }
    }

}
