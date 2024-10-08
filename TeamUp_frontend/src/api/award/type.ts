import {Award} from "@/interface/award.ts";

export type GetAllAwardsByIdReq = {
    userId: number,
    page: number,
    pageSize: number
}

export type GetAllAwardsByIdRes = {
    awardList: Award[],
    total: number
}

export type DelAwardByAwardIdReq = {
    awardId: number
}

export type AddAwardReq = {
    title: string,
    prize: string,
    date: string,
    proof: string
}