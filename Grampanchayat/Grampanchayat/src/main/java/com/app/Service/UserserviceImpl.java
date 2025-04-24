package com.app.Service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.AppliedMembersDTO;
import com.app.Entity.Application;
import com.app.Entity.Role;
import com.app.Entity.User;
import com.app.Exception.ResourceNotFoundException;
import com.app.Repository.ApplicationRepository;
import com.app.Repository.UserRepository;

@Service
@Transactional
public class UserserviceImpl implements Userservice {

	
	//private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Autowired
	private UserRepository UserRepository;
	
	@Autowired
	private ApplicationRepository applicationRepository;
	
	
	@Override
	public List<User> findByRole(Role roleMembers) {
		return UserRepository.findByRole(Role.ROLE_MEMBERS);
	}
	
	public User registerUser(User user) {
        // Check if user with the same email already exists
        Optional<User> existingUser = UserRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User with email " + user.getEmail() + " already exists!");
        }

        user.setRole(Role.ROLE_MEMBERS);
        return UserRepository.save(user);
    }

	@Override
	public List<AppliedMembersDTO> getAllAppliedMembers() {
		 return applicationRepository.findAllAppliedMembers();
	}
	
	@Override
	public void updateApplicationStatus(Long id, String newStatus) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Application not found with ID: " + id));

        application.setApplicationStatus(newStatus);
        applicationRepository.save(application);
    }
	
	

    public User updateUser(Long id, User userDetails) {
        User user = UserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        
        user.setId(id);
        user.setPassword(userDetails.getPassword());
        user.setRole(Role.ROLE_MEMBERS);
        user.setName(userDetails.getName());
        user.setGender(userDetails.getGender());
        user.setAge(userDetails.getAge());
        user.setEmail(userDetails.getEmail());
        user.setMobile(userDetails.getMobile());
        return UserRepository.save(user);
    }
    
    // Get customer by ID
    public User getUserById(Long id) {
        return UserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }
	
	

}
