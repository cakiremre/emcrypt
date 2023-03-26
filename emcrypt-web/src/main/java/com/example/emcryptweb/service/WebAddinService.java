package com.example.emcryptweb.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class WebAddinService {


    public ResponseEntity manifest(String serverName, String tenant) {

        serverName = cleanServerName(serverName);

        String addinHost = "https://" + tenant + "." + serverName;
        String addinPath = addinHost + "/webaddin/resources/";

        try {
            String out = Files.readString(Paths.get(ClassLoader.getSystemClassLoader().getResource("webaddin/manifest.xml").toURI()));
            out = out.replace("{{origin}}", addinHost);
            out = out.replace("{{webaddin-path}}", addinPath);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=manifest.xml");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(out.length())
                    .contentType(MediaType.TEXT_XML)
                    .body(out);
        } catch (IOException | URISyntaxException e) {
            throw new RuntimeException(e);
        }

    }

    private String cleanServerName(String serverName) {
        if(serverName.contains(",")){ // that means multiple hosts including localhost
            List<String> hosts = Arrays.asList(serverName.split(","));
            return hosts.stream()
                    .filter(q -> !q.contains("localhost"))
                    .findFirst()
                    .orElse(null);
        }else{
            return serverName;
        }
    }
}
