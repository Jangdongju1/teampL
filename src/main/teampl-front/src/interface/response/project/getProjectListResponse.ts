import ResponseDto from "../ResponseDto";
import {ProjectListEle} from "../../types";

export default interface GetProjectListResponse extends ResponseDto{
    data : {
        list : ProjectListEle[];
    }
}