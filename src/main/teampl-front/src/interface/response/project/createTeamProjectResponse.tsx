import ResponseDto from "../ResponseDto";
import {Project} from "../../types";

export default interface CreateTeamProjectResponse extends ResponseDto{
    data : {
        created : Project;
    }
}