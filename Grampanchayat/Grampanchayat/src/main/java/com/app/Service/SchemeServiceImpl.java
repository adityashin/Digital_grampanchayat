package com.app.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.Entity.Scheme;
import com.app.Repository.schemeRepository;

@Service
@Transactional
public class SchemeServiceImpl implements SchemeService {

	@Autowired
	private schemeRepository schemeRepository;

	public Scheme createScheme(String name, String description, String schemeStatus, MultipartFile schemeImage)
			throws IOException {
		Scheme scheme = new Scheme();
		scheme.setName(name);
		scheme.setDescription(description);
		scheme.setSchemeStatus(schemeStatus);
		scheme.setCreatedDate(LocalDateTime.now());
		if (schemeImage != null && !schemeImage.isEmpty()) {
			scheme.setSchemeImage(schemeImage.getBytes());
		}
		return schemeRepository.save(scheme);

	}

	public List<Scheme> getAllSchemes() {
		return schemeRepository.findAll();
	}
	
	
	@Override
	 public void deactivateScheme(Long schemeId) {
	        Scheme scheme = schemeRepository.findById(schemeId)
	                .orElseThrow(() -> new RuntimeException("Scheme not found"));

	        scheme.setSchemeStatus("INACTIVE");
	        schemeRepository.save(scheme);
	    }

}
