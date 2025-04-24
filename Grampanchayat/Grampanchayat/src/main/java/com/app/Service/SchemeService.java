package com.app.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.Entity.Scheme;

public interface SchemeService {

	Scheme createScheme(String name, String description, String schemeStatus, MultipartFile schemeImage) throws IOException;

	List<Scheme> getAllSchemes();

	void deactivateScheme(Long schemeId);

	

}
