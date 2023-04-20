import { writable } from "svelte/store";
import type { Mint } from "../model/Mint";

const mints = writable<Mint[]>([])

export {mints}