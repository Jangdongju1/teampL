import ResponseDto from "../ResponseDto";
import {SearchUser} from "../../types";

export default interface GetSearchUserResponse extends ResponseDto{
    data : {
        list : SearchUser[]
    }
}