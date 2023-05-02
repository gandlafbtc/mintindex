import { writable } from "svelte/store";
import type { Mint } from "@prisma/client";

const mints = writable<Mint[]>([])

export {mints}