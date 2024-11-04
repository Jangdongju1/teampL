export default interface SignInResponse {
    data: {
        token: string,
        expireTimeSec: number
    }
}