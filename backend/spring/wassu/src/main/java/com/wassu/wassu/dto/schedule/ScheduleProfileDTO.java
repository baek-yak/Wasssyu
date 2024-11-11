package com.wassu.wassu.dto.schedule;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleProfileDTO {

    private Long scheduleId;
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private String thumbnail;
    private int spotCount;

}
