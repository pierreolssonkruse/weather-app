package com.example.Weather.App.service;

import com.example.Weather.App.model.WeatherResponse;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import org.springframework.stereotype.Service;

@Service
public class WeatherService {
    private final String API_KEY = "32daf3975f77a7be36aaac1386d18046";
    private final String BASE_URL = "http://api.openweathermap.org/data/2.5/weather?q=";

    public Mono<WeatherResponse> getWeather(String location) {
        String url = BASE_URL + location + "&appid=" + API_KEY;
        return WebClient.create().get().uri(url).retrieve().bodyToMono(WeatherResponse.class);
    }
}
