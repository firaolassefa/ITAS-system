package com.itas.dto;

public class LoginResponse {
    private Object user;
    private String token;
    private String message;

    public LoginResponse() {}
    
    public LoginResponse(Object user, String token, String message) {
        this.user = user;
        this.token = token;
        this.message = message;
    }

    public Object getUser() { return user; }
    public void setUser(Object user) { this.user = user; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
