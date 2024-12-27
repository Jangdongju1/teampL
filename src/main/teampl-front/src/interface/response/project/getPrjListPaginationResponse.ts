import ResponseDto from "../ResponseDto";
import {Project} from "../../types";

export default interface GetPrjListPaginationResponse extends ResponseDto{
    data : {
        list : Project[]
    }
}




