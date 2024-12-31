import ResponseDto from "../ResponseDto";

export default interface CreateTeamResponse extends ResponseDto {
    data: {
        teamInfo: {
            regNum: number,
            teamName: string,
            description: string,
            createDate: string,
            sequence : string
        }
    }
}