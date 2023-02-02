import { Hero } from "./hero";

export interface Data {
    data: {
        total: number,
        results: Hero[];
    };
}