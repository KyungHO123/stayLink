package kr.kh.sns.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해 CORS 허용
                .allowedOrigins("http://localhost:3000") // React 앱 URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true); // 인증 정보 허용
    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // D:/study/stayLink/img/ 경로를 정적 리소스로 서빙
        registry.addResourceHandler("/img/**")
                .addResourceLocations("file:///D:/study/stayLink/img/");
    }

}
