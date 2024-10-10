import {Match} from "@/interface/match.ts";

export type AddMatchItemReq = {
    title: string,
    link: string,
    month: number,
    description: string,
    tags: string[]
}

export type DelMatchItemReq = {
    matchId: number
}

export type GetAllMatchReq = {
    page: number,
    pageSize: number
}

export type GetAllMatchRes = {
    matches: Match[],
    tagList: (string[])[]
    total: number
}

export type GetRecentMatchRes = {
    matches: Match[],
    tagList: (string[])[]
}