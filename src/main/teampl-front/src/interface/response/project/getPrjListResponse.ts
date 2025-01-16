import ResponseDto from "../ResponseDto";
import {Project} from "../../types";

export default interface GetPrjListResponse extends ResponseDto{
    data : {
        list : Project[];
    }
}




