package com.backend.plogging.service;


import com.backend.plogging.base.BaseResponseEntity;
import com.backend.plogging.domain.Point;
import com.backend.plogging.domain.User;
import com.backend.plogging.dto.request.user.KakaoUserDto;
import com.backend.plogging.dto.response.user.AuthenticationResponse;
import com.backend.plogging.dto.response.user.PointResponseDto;
import com.backend.plogging.dto.response.user.UserResponseDto;
import com.backend.plogging.repository.PointRepository;
import com.backend.plogging.repository.UserRepository;
import com.backend.plogging.util.JwtUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PointRepository pointRepository;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    public String getKakaoAccessToken(String host, String code) {
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
            sb.append("&redirect_uri="+host+"/auth/kakao-callback");
            sb.append("&code=" + code);
            String requestBody = sb.toString();
            bw.write(requestBody);
            bw.flush();

            // Log the request URL and request body
//            System.out.println("Request URL: " + requestURL);
//            System.out.println("Request Body: " + requestBody);

            int responseCode = conn.getResponseCode();
//            System.out.println("responseCode = " + responseCode);

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

    public String getToken(User user) {
        String email = user.getEmail();
        final UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        final String jwt = jwtUtils.generateToken(userDetails);
        return jwt;
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

    public BaseResponseEntity<?> getUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.OK, new UserResponseDto(user.get()));
        } else {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "해당 유저가 존재하지 않습니다.");
        }
    }

    public BaseResponseEntity<?> deleteUserById(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (!user.isPresent()) {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "해당 유저가 존재하지 않습니다.");
        } else {
            userRepository.delete(user.get());
            return new BaseResponseEntity<>(HttpStatus.OK, "유저가 삭제되었습니다.");
        }
    }

    public BaseResponseEntity<Page<UserResponseDto>> getAllUsers(int pagingIndex, int pagingSize) {
        Pageable pageable = PageRequest.of(pagingIndex, pagingSize);
        Page<User> users = userRepository.findAll(pageable);
        return new BaseResponseEntity<>(HttpStatus.OK, users.map(UserResponseDto::new));
    }

    public BaseResponseEntity<?> getPoint(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            Map<String, Object> result = new LinkedHashMap<>();
            result.put("point", user.get().getPoint());
            result.put("level", user.get().getLevel());

            return new BaseResponseEntity<>(HttpStatus.OK, result);
        } else {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "해당 유저가 존재하지 않습니다.");
        }
    }

    public BaseResponseEntity<?> updatePoint(Long userId, int change, String title, String type) {
        Optional<User> user = userRepository.findById(userId);

        Integer currentPoint = user.get().getPoint();
        Integer newPoint = currentPoint;
        if (change > 0) newPoint += change;
        Integer totalPoint = user.get().getTotalPoint() + change;

        if (user.isPresent()) {
            // 1000점 단위로 레벨업
            while (newPoint >= 1000) {
                newPoint -= 1000;
                user.get().setLevel(user.get().getLevel() + 1);
            }

            // Point 내역 저장
            Point point = Point.builder()
                    .changePoint(change)
                    .title(title)
                    .type(type)
                    .user(user.get())
                    .build();


            user.get().setPoint(newPoint);
            user.get().setTotalPoint(totalPoint);
            userRepository.save(user.get());
            pointRepository.save(point);

            Map<String, Object> result = new LinkedHashMap<>();
            result.put("point", user.get().getPoint());
            result.put("totalPoint", totalPoint);
            result.put("level", user.get().getLevel());

            return new BaseResponseEntity<>(HttpStatus.OK, result);
        } else {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "해당 유저가 존재하지 않습니다.");
        }
    }

    public BaseResponseEntity<?> getPointHistory(Long userId, int pagingIndex, int pagingSize) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            Pageable pageable = PageRequest.of(pagingIndex, pagingSize);
            Page<Point> points = pointRepository.findAllByUser(user.get(), pageable);
            return new BaseResponseEntity<>(HttpStatus.OK, points.map(PointResponseDto::new));
        } else {
            return new BaseResponseEntity<>(HttpStatus.BAD_REQUEST, "해당 유저가 존재하지 않습니다.");
        }
    }
}
