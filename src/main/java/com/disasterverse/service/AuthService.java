package com.disasterverse.service;

import com.disasterverse.dto.request.LoginRequest;
import com.disasterverse.dto.request.SignupRequest;
import com.disasterverse.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse signup(SignupRequest request);
    AuthResponse login(LoginRequest request);
}