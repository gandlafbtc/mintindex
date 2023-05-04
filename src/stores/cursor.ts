import { writable,get } from "svelte/store";
import { page } from '$app/stores';

const previous = writable(0)
const current = writable(0)

export {previous, current}