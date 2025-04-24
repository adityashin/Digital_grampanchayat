package com.app.Service;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.AppliedSchemeDTO;
import com.app.Entity.Scheme;
import com.app.Entity.User;
import com.app.Repository.UserRepository;
import com.app.Repository.ApplicationRepository;
import com.app.Repository.schemeRepository;

@Service
@Transactional
public class ApplicationServiceImpl implements ApplicationService 
{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private schemeRepository schemeRepository;
	
	@Autowired
	private ApplicationRepository applicationRepository;
	
	public String applyForScheme(Long userId, Long schemeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Scheme scheme = schemeRepository.findById(schemeId)
                .orElseThrow(() -> new RuntimeException("Scheme not found"));
        
        if (!"ACTIVE".equalsIgnoreCase(scheme.getSchemeStatus())) {
            return "Application failed: The scheme is inactive.";
        }

        // Check if user has already applied for this scheme
        if (applicationRepository.existsByuserAndScheme(user, scheme)) {
            return "User has already applied for this scheme.";
        }

       com.app.Entity.Application application = new com.app.Entity.Application();
       application.setUser(user);
       application.setScheme(scheme);
       application.setAppliedDate(LocalDateTime.now());
       application.setApplicationStatus("PENDING");

        applicationRepository.save(application);
        return "Application submitted successfully.";
    }
	
	  @Override
	    public List<AppliedSchemeDTO> getUserAppliedSchemes(Long customerId) {
	        return applicationRepository.findUserAppliedSchemes(customerId);
	    }
}
