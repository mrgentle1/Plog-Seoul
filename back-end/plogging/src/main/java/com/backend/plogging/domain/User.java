package com.backend.plogging.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "name")
    private String name;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "gender")
    private String gender;

    @Column(name = "point")
    private Integer point;

    @Column(name = "level")
    private Integer level;

    @Column(name = "role")
    private String role;


    // walking records for this user
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<PloggingRecord> ploggingRecords;

    // reviews for this user
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Review> reviews;

}
