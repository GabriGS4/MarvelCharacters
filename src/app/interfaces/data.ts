import { Hero } from "./hero";

export interface Data {
    data: {
        offset: number;
        limit: number;
        total: number;
        count: number;
        results: Hero[];
    };
}