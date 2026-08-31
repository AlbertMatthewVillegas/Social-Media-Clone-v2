package com.zerofuku.socialmediaclone.filter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import com.zerofuku.socialmediaclone.utils.SecurityUtils;

@Slf4j
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private static final int MAX_REQUESTS_PER_MINUTE = 100000;
    private final ConcurrentHashMap<String, AtomicInteger> requestCounter = new ConcurrentHashMap<>();

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return SecurityUtils.EXCLUDED_PATHS.stream().anyMatch(path::startsWith);
    }
    
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String clientIp = request.getRemoteAddr();
        log.info("Client IP: {}", clientIp);

        requestCounter.putIfAbsent(clientIp, new AtomicInteger(0));
        int currentCount = requestCounter.get(clientIp).incrementAndGet();
        log.info("Request count for IP {}: {}", clientIp, currentCount);

        if (currentCount > MAX_REQUESTS_PER_MINUTE) {
            response.setStatus(429); // Too Many Requests
            response.getWriter().write("Too many requests. Please try again later.");
            return;
        }

        filterChain.doFilter(request, response);
    }
}