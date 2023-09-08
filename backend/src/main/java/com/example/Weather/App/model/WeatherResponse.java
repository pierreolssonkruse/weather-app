package com.example.Weather.App.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WeatherResponse {

    @JsonProperty("name")
    private String name;

    @JsonProperty("main")
    private Main main;

    @JsonProperty("wind")
    private Wind wind;

    @JsonProperty("sys")
    private Sys sys;

    @JsonProperty("weather")
    private List<Weather> weather;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Main getMain() {
        return main;
    }

    public void setMain(Main main) {
        this.main = main;
    }

    public Wind getWind() {
        return wind;
    }

    public void setWind(Wind wind) {
        this.wind = wind;
    }

    public Sys getSys() {
        return sys;
    }

    public void setSys(Sys sys) {
        this.sys = sys;
    }

    public List<Weather> getWeather() {
        return weather;
    }

    public void setWeather(List<Weather> weather) {
        this.weather = weather;
    }

    public static class Main {

        @JsonProperty("temp")
        private double temp;

        public double getTemp() {
            return temp;
        }

        public void setTemp(double temp) {
            this.temp = temp;
        }

        @JsonProperty("pressure")
        private int pressure;

        public int getPressure() {
            return pressure;
        }

        public void setPressure(int pressure) {
            this.pressure = pressure;
        }

        @JsonProperty("humidity")
        private int humidity;

        public int getHumidity() {
            return humidity;
        }

        public void setHumidity(int humidity) {
            this.humidity = humidity;
        }
    }

    public static class Wind {

        @JsonProperty("speed")
        private int speed;

        public int getSpeed() {
            return speed;
        }

        public void setSpeed(int speed) {
            this.speed = speed;
        }
    }

    public static class Sys {
        
        @JsonProperty("country")
        private String country;

        public String getCountry() {
            return country;
        }

        public void setCounty(String country) {
            this.country = country;
        }
    }

    public static class Weather {

        @JsonProperty("description")
        private String description;

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        @JsonProperty("icon")
        private String icon;

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }
    }
}
