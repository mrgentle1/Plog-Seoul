package com.backend.plogging.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class Badge extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long badgeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "name")
    private String name;  // Badge name

    @Column(name = "description")
    private String description;  // Badge description

    @Column(name = "badge_number")
    private Integer badge_number;  // 뱃지 고유번호

    @Column(name = "is_achieved")
    private Boolean isAchieved;  // Badge achieved

}
