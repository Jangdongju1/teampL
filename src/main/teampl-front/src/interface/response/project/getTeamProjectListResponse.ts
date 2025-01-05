import ResponseDto from "../ResponseDto";
import {Project, TeamInfo} from "../../types";

export default interface GetTeamProjectListResponse extends ResponseDto {
    data: {
        info: TeamInfo
        list: Project[]
    }
}