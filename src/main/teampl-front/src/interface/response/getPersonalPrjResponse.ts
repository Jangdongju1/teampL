import ResponseDto from "./ResponseDto";
import {Project} from "../types";

export default interface GetPersonalPrjResponse extends ResponseDto{
    data : {
        list : Project[];
    }
}




