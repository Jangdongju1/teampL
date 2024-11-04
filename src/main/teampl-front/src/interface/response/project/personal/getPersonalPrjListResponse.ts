import ResponseDto from "../../ResponseDto";
import {Project} from "../../../types";

export default interface GetPersonalPrjListResponse extends ResponseDto{
    data : {
        list : Project[];
    }
}




