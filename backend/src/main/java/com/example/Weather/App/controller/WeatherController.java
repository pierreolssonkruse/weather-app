package com.example.Weather.App.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import com.example.Weather.App.model.WeatherResponse;
import com.example.Weather.App.service.WeatherService;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {
    @Autowired
    private WeatherService weatherService;

    @GetMapping("/{location}")
    public Mono<WeatherResponse> getWeather(@PathVariable String location) {
        return weatherService.getWeather(location);
    }
}
