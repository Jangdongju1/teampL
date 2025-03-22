package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.service.FileService;
import com.persnal.teampl.util.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Base64;

@Service
public class FileServiceImpl implements FileService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${spring.servlet.multipart.location}")
    String fileSavePath;
    String URL = "http://localhost:4000/file/uploads/";


    @Override
    public String upload(MultipartFile file, String email) {
        String imageUrl = "";
        try {
            if (file == null)
                logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), "file is null");


            if (file != null) {
                String[] idElements = email.split("@");
                String[] mailElements = idElements[1].split("\\.");


                String id = Base64.getEncoder().encodeToString(idElements[0].getBytes());
                String mail = Base64.getEncoder().encodeToString(mailElements[0].getBytes());


                String originalFilename = file.getOriginalFilename();
                String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                String filename = id + "_" + mail + extension;

                File des = new File(fileSavePath + filename);

                // 프로필 사진은 오로지 1개 이므로 이미 존재하는 경우 다른파일을들 제거함 .
                String[] extensions = {".jpg", ".jpeg", ".png"};

                for(String ext : extensions){
                    String existFile = id+"_"+mail+ext;
                    File existDes = new File(fileSavePath + existFile);

                    if(existDes.exists()){
                        existDes.delete();
                    }
                }

                // 파일세이브
                file.transferTo(des);


                imageUrl = URL + filename;
            }
        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }

        return imageUrl;
    }

    @Override
    public ResponseEntity<Resource> getImage(String fileName) {
        Resource resource = null;
        try {
            resource = new UrlResource("file:" + fileSavePath + fileName);

            if (!resource.exists()) return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(resource);
    }
}
