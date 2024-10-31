package com.wassu.wassu.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String email;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false, length = 10)
    private String gender;

    @Column(nullable = false)
    private Integer birthYear;

    @Column(nullable = false, length=20)
    private String nickname;

    @Column(length = 10)
    private String level;

    private Integer exp;

    @PrePersist
    public void prePersist() {
        if (this.level == null) {
            this.level = "초보";
        }
        if (this.exp == null) {
            this.exp = 0;
        }
    }

    @OneToMany(mappedBy="user")
    private List<ArticleEntity> articles;

    @OneToMany(mappedBy = "user")
    private List<ArticleLikedEntity> articleLikes;

    @OneToMany(mappedBy = "user")
    private List<ClearedMarbleEntity> clearedMarbles;

    @OneToMany(mappedBy = "user")
    private List<VisitedSpotEntity> visitedSpots;

    @OneToMany(mappedBy = "user")
    private List<ArticleReadEntity> articleReads;

    public UserEntity(String email, String password, String gender, Integer birthYear, String nickname) {}
}
