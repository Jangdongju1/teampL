import ResponseDto from "../ResponseDto";
import {Project} from "../../types";

export default interface GetProjectListResponse extends ResponseDto{
    data : {
        list : Project[];
    }
}