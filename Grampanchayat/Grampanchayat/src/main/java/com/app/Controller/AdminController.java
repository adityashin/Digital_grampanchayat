package com.app.Controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.DTO.AppliedMembersDTO;
import com.app.Entity.Role;
import com.app.Entity.Scheme;
import com.app.Entity.User;
import com.app.Service.SchemeService;
import com.app.Service.Userservice;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:3000")
public class AdminController {
	
	@Autowired
	private Userservice userservice;
	
	@Autowired
	private SchemeService schemeService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@GetMapping("/getAllMembers")
    public List<User> getAllMembers() {
        try {
            return userservice.findByRole(Role.ROLE_MEMBERS);
        } catch (Exception e) {
            e.printStackTrace();
            return List.of(); // Returning empty list in case of error
        }
    }
	
	@PostMapping("/createScheme")
    public ResponseEntity<Scheme> createScheme(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("schemeStatus") String schemeStatus,
            @RequestParam(value = "schemeImage", required = false) MultipartFile schemeImage) throws IOException {
        Scheme savedScheme = schemeService.createScheme(name, description, schemeStatus, schemeImage);
		return new ResponseEntity<>(savedScheme, HttpStatus.CREATED);
    }
	
	 @GetMapping("/getAllSchemes")
	    public ResponseEntity<List<Scheme>> getAllSchemes() {
	        try {
	            List<Scheme> schemes = schemeService.getAllSchemes();
	            return new ResponseEntity<>(schemes, HttpStatus.OK);
	        } catch (Exception e) {
	            e.printStackTrace();
	            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	        }
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
	 
	 
	  @PatchMapping("/deactivateScheme/{id}")
	    public ResponseEntity<String> deactivateScheme(@PathVariable Long id) {
	        schemeService.deactivateScheme(id);
	        return ResponseEntity.ok("Scheme set to INACTIVE successfully");
	    }
	  
	  @GetMapping("/getAppliedApplications")
	    public ResponseEntity<List<AppliedMembersDTO>> getAppliedApplications() {
	        List<AppliedMembersDTO> appliedMembers = userservice
	        		.getAllAppliedMembers();
	        return ResponseEntity.ok(appliedMembers);
	    }
	  
	  @PutMapping("/updateApplicationStatus/{id}")
	    public ResponseEntity<String> updateApplicationStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
	        String newStatus = request.get("status");

	        if (newStatus == null || newStatus.isEmpty()) {
	            return ResponseEntity.badRequest().body("Status cannot be empty.");
	        }

	        userservice.updateApplicationStatus(id, newStatus);
	        return ResponseEntity.ok("Application status updated successfully.");
	    }
	

}
