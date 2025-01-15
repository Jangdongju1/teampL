import ResponseDto from "../ResponseDto";
import {TeamInfo} from "../../types";

export default interface RegistrationMemberResponse extends ResponseDto{
    data :{
        info : TeamInfo;
    }
}