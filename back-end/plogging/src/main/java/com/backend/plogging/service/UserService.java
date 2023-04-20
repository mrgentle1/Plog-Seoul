package com.backend.plogging.service;


import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.domain.User;
import com.backend.plogging.dto.request.user.KakaoUserDto;
import com.backend.plogging.dto.response.user.AuthenticationResponse;
import com.backend.plogging.dto.response.user.UserResponseDto;
import com.backend.plogging.repository.UserRepository;
import com.backend.plogging.util.JwtUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    public String getKakaoAccessToken(String code) {
        String accessToken = "";
        String refreshToken = "";
        String requestURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(requestURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            
            // Method를 POST로 설정
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            // POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=97f6cd86370313a5d237e69507c9b011");
            sb.append("&redirect_uri=http://localhost:8080/api/auth/kakao");
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            int responseCode = conn.getResponseCode();

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(result);

            accessToken = rootNode.get("access_token").asText();
            refreshToken = rootNode.get("refresh_token").asText();

            br.close();
            br.close();
            bw.close();


        } catch (IOException e) {
            e.printStackTrace();
        }

        return accessToken;
    }

    public Optional<User> getKakaoUser(String token) {
        String requestURL = "https://kapi.kakao.com/v2/user/me";

        // accessToken을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(requestURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(result);

            // 필요한 정보를 추출합니다.
            String email = jsonNode.get("kakao_account").get("email").asText();

            br.close();

            return userRepository.findByEmail(email);

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public BaseResponseEntity<?> createKakaoUser(String token) {
        String requestURL = "https://kapi.kakao.com/v2/user/me";

        // accessToken을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(requestURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(result);

            // 필요한 정보를 추출합니다.
            String email = jsonNode.get("kakao_account").get("email").asText();
            String name = jsonNode.get("kakao_account").get("profile").get("nickname").asText();
            String profileImage = jsonNode.get("kakao_account").get("profile").get("profile_image_url").asText();
            String gender = jsonNode.get("kakao_account").get("gender").asText();

            br.close();

            if (userRepository.findByEmail(email).isPresent()) {
                return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "이미 가입한 회원입니다");
            } else {
                KakaoUserDto userDto = new KakaoUserDto(email, name, profileImage, gender);
                userRepository.save(userDto.toEntity());
                return new BaseResponseEntity<>(HttpStatus.OK);
            }


//            System.out.println("email = " + email);
//            System.out.println("name = " + name);
//            System.out.println("profileImage = " + profileImage);
//            System.out.println("gender = " + gender);
//
//            System.out.println("response body : " + result);

        } catch (IOException e) {
            e.printStackTrace();
            return new BaseResponseEntity<>(e);
        }

    }

    public BaseResponseEntity<?> login(User user) {
        String email = user.getEmail();
        final UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        final String jwt = jwtUtils.generateToken(userDetails);
        return new BaseResponseEntity<>(HttpStatus.OK, new AuthenticationResponse(jwt, user));
    }

    public BaseResponseEntity<?> updateNickname(String nickname, String email) {
        User user = userRepository.findByEmail(email).get();
        user.setNickname(nickname);
        user.setIsFirst(false);
        userRepository.save(user);
        return new BaseResponseEntity<>(HttpStatus.OK, "닉네임 변경이 완료되었습니다.");
    }

    public BaseResponseEntity<?> getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.OK, new UserResponseDto(user.get()));
        } else {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
