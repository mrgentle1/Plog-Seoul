package com.backend.plogging.domain;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "gender")
    private String gender;

    @Column(name = "point")
    private Integer point;  // 현재 포인트 (1000포인트 당 1레벨 업)

    @Column(name = "total_point")
    private Integer totalPoint;  // 보유하고 있는 전체 포인트

    @Column(name = "level")
    private Integer level;

    @Column(name = "role")
    private String role;

    @Column(name = "is_first")
    private Boolean isFirst;

    // walking records for this user
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<PloggingRecord> ploggingRecords;

    // reviews for this user
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Review> reviews;

    // badges for this user
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Badge> badges;

    // point for this user
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private List<Point> points;

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

}
