package com.app.Service;

import java.util.List;

import com.app.DTO.AppliedSchemeDTO;

public interface ApplicationService {

	String applyForScheme(Long userId, Long schemeId);

	List<AppliedSchemeDTO> getUserAppliedSchemes(Long customerId);

}
