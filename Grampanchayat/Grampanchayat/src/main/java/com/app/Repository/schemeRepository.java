package com.app.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Scheme;

public interface schemeRepository extends JpaRepository<Scheme, Long> {

}
