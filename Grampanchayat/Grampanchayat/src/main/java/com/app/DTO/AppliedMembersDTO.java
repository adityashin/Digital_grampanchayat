package com.app.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppliedMembersDTO {
	private Long id;
    private String memberName;
    private String gender;
    private int age;
    private String schemeName;
    private String applicationStatus;
}
