package com.persnal.teampl.service.serviceImpl;

import com.persnal.teampl.common.global.GlobalVariable;
import com.persnal.teampl.service.IssueSequenceService;
import com.persnal.teampl.util.Utils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;

@Service
@RequiredArgsConstructor
public class IssueSequenceImpl implements IssueSequenceService {
    // 칸반보드 카드의 일련번호를 부여하는 클래스

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final String sequencePrefix = "KAN_";
    private final DecimalFormat decimalFormat;


    @Override
    public String initSequenceValue() {
        String iniSequence = "";
        try {
            int initVal = 1;
            iniSequence = sequencePrefix + decimalFormat.format(initVal);
        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return iniSequence;
    }

    @Override
    public String addSequenceNumber(String sequence) {
        int number = 0;
        try {
            number = getSequenceNUmber(sequence);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return sequencePrefix + decimalFormat.format(number + 1);
    }

    private int getSequenceNUmber(String sequence) {
        int sequenceNumber = 0;
        try {
            sequenceNumber = Integer.parseInt(sequence.split("_")[1]);

        } catch (Exception e) {
            logger.error(GlobalVariable.LOG_PATTERN, this.getClass().getName(), Utils.getStackTrace(e));
        }
        return sequenceNumber;
    }
}
