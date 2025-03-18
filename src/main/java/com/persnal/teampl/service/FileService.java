package com.persnal.teampl.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    String upload(MultipartFile file, String email);
    Resource getImage(String fileName);
}
