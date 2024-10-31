import ResponseDto from "./ResponseDto";
import {Project} from "../types";

export default interface GetPersonalPrjInfoResponse extends ResponseDto{
    data : {
        projectInfo : Project;
    }
}