package com.app.Service;

import java.util.List;

import com.app.DTO.AppliedMembersDTO;
import com.app.Entity.Role;
import com.app.Entity.User;

public interface Userservice {

	List<User> findByRole(Role roleMembers);

	User registerUser(User user);
	
	List<AppliedMembersDTO> getAllAppliedMembers();
	
	void updateApplicationStatus(Long id, String newStatus);
	
	User updateUser(Long id, User userDetails);
	
	User getUserById(Long id);

}
