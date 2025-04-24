package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.DTO.AppliedMembersDTO;
import com.app.DTO.AppliedSchemeDTO;
import com.app.Entity.Application;
import com.app.Entity.Scheme;
import com.app.Entity.User;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

	  @Query("SELECT new com.app.DTO.AppliedSchemeDTO(s.id, s.name, a.appliedDate, a.applicationStatus) " +
	           "FROM Application a JOIN a.scheme s WHERE a.user.id = :customerId")
	    List<AppliedSchemeDTO> findUserAppliedSchemes(@Param("customerId") Long customerId);


	    boolean existsByuserAndScheme(User user, Scheme scheme);
	    
	    
	    @Query("SELECT new com.app.DTO.AppliedMembersDTO(a.id, u.name, u.gender, u.age, s.name, a.applicationStatus) " +
	            "FROM Application a " +
	            "JOIN a.user u " +
	            "JOIN a.scheme s " +
	            "ORDER BY a.appliedDate DESC")
	     List<AppliedMembersDTO> findAllAppliedMembers();
}
