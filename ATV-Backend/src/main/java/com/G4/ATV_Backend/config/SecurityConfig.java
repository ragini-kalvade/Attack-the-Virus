//package com.G4.ATV_Backend.config;
//
//import com.G4.ATV_Backend.service.impl.UserServiceImpl;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Autowired
//    private UserServiceImpl userServiceImpl;
//
//    @Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        return http.authorizeHttpRequests(auth -> {
//                    auth.requestMatchers("/health", "/register/**").permitAll();
//                    auth.requestMatchers("/admin/**").hasRole("ADMIN");
//                    auth.requestMatchers("/user/**").hasRole("USER");
//                    auth.anyRequest().authenticated();
//                })
////                .oauth2Login(Customizer.withDefaults())
//                .formLogin(AbstractAuthenticationFilterConfigurer::permitAll)
//                .csrf(AbstractHttpConfigurer::disable)
//                .build();
//    }
//
////    @Bean
////    public UserDetailsService userDetailsService() {
////        UserDetails normalUser = User.builder()
////                .username("AP")
////                .password("$2a$12$G4sTfQx9oaghzMSLiVNukeZSEVcHE3ek5tOCbu7Shs1/nplCdZhPy")
////                .roles("USER")
////                .build();
////
////        UserDetails adminUser = User.builder()
////                .username("ADMIN")
////                .password("$2a$12$TLKuXJYS3EW5XNIMmlmMKONIFSwx99B2lnS55OFQd4az681NLPfUO")
////                .roles("ADMIN","USER")
////                .build();
////
////        return new InMemoryUserDetailsManager(normalUser, adminUser);
////    }
//
//    @Bean
//    public UserDetailsService userDetailsService(UserDetailsService userDetailsService) {
////        UserDetails adminUser = User.builder()
////                .username("ADMIN")
////                .password("$2a$12$TLKuXJYS3EW5XNIMmlmMKONIFSwx99B2lnS55OFQd4az681NLPfUO")
////                .roles("ADMIN","USER")
////                .build();
//        return userDetailsService;
//    }
//
//    @Bean
//    public AuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//        authProvider.setUserDetailsService(userServiceImpl);
//        authProvider.setPasswordEncoder(passwordEncoder());
//        return authProvider;
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//}
