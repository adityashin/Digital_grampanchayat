package com.app.DTO;

import java.time.LocalDateTime;

public class AppliedSchemeDTO {
    private Long schemeId;
    private String schemeName;
    private LocalDateTime appliedDate;
    private String applicationStatus;

    public AppliedSchemeDTO(Long schemeId, String schemeName, LocalDateTime appliedDate, String applicationStatus) {
        this.schemeId = schemeId;
        this.schemeName = schemeName;
        this.appliedDate = appliedDate;
        this.applicationStatus = applicationStatus;
    }

    public Long getSchemeId() {
        return schemeId;
    }

    public void setSchemeId(Long schemeId) {
        this.schemeId = schemeId;
    }

    public String getSchemeName() {
        return schemeName;
    }

    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }

    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDateTime appliedDate) {
        this.appliedDate = appliedDate;
    }

    public String getApplicationStatus() {
        return applicationStatus;
    }

    public void setApplicationStatus(String applicationStatus) {
        this.applicationStatus = applicationStatus;
    }
}
