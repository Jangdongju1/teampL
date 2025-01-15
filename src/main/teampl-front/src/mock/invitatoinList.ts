interface Invitation{
    email: string,
    profileImg: string | null,
    teamName : string,
    invitationDate : string,
}

const invitationMock : Invitation[] = [
    {
        email :"jdj881204@naver.com",
        profileImg : null,
        teamName : "새로 생성한 팀 12",
        invitationDate : "2024-12-04"
    },
    {
        email :"jdj881204@naver.com",
        profileImg : null,
        teamName : "새로 생성한 팀 12",
        invitationDate : "2024-12-04"
    }

]

export default invitationMock;