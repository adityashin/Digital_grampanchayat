package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.AppliedSchemeDTO;
import com.app.DTO.SchemeApplicationRequest;
import com.app.Entity.User;
import com.app.Exception.ResourceNotFoundException;
import com.app.Service.ApplicationService;
import com.app.Service.Userservice;


@RestController
@RequestMapping("/member")
@CrossOrigin("http://localhost:3000")
public class MemberController
{
	@Autowired
	private ApplicationService applicationService;
	
	@Autowired
	private Userservice userservice;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/applyForScheme")
    public ResponseEntity<String> applyForScheme(@RequestBody SchemeApplicationRequest request) {
        String response = applicationService.applyForScheme(request.getUserId(), request.getSchemeId());
        return ResponseEntity.ok(response);
    }
	
	  @GetMapping("/getUserAppliedSchemes/{customerId}")
	    public ResponseEntity<List<AppliedSchemeDTO>> getUserAppliedSchemes(@PathVariable Long customerId) {
	        List<AppliedSchemeDTO> appliedSchemes = applicationService.getUserAppliedSchemes(customerId);
	        return ResponseEntity.ok(appliedSchemes);
	    }
	  
	  @PostMapping("/register")
	    public ResponseEntity<User> registerUser(@RequestBody User user) {
	        try {
	        	user.setPassword(passwordEncoder.encode(user.getPassword()));
	            User savedUser = userservice.registerUser(user);
	            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
	        } catch (RuntimeException e) {
	            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	        }
	    }
	  
	 
	    @PutMapping("/updateUser/{id}")
	    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
	        try {
	        	userDetails.setPassword(passwordEncoder.encode(userDetails.getPassword()));
	            User updatedUser = userservice.updateUser(id, userDetails);
	            return ResponseEntity.ok(updatedUser);
	        } catch (ResourceNotFoundException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user");
	        }
	    }
	    
	
	    @GetMapping("/getUserById/{id}")
	    public ResponseEntity<?> getUserById(@PathVariable Long id) {
	        try {
	            User user = userservice.getUserById(id);
	            return ResponseEntity.ok(user);
	        } catch (ResourceNotFoundException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
	        }
	    }
	  
	  
}
