import { setupWorker } from "msw/browser";
import { sampleHandler } from "./handlers/sampleHandler";

const handlers = [...sampleHandler];

export const worker = setupWorker(...handlers);
