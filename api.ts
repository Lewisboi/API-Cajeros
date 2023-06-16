import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { handleATMRequest } from "./locationHandler.ts";
import { type ATM } from "./atm.ts";

let responseIndex = 0;
let cajeros: ATM[] = [];

const router = new Router();
router.get("/best/:coordinates", async (ctx) => {
  cajeros = await handleATMRequest(ctx.params.coordinates);
  ctx.response.body = cajeros[0];
}).get("/next", (ctx) => {
  if (responseIndex < cajeros.length - 1) {
    responseIndex++;
    ctx.response.body = cajeros[responseIndex];
  } else {
    ctx.response.body = { error: "No further ATMs" };
  }
}).get("/previous", (ctx) => {
  if (responseIndex > 0) {
    responseIndex--;
    ctx.response.body = cajeros[responseIndex];
  } else {
    ctx.response.body = { error: "No previous ATMs" };
  }
}).get("/privacy-policy", (ctx) => {
  const policy = Deno.readTextFileSync("./privacyPolicy.html");
  ctx.response.body = policy;
});

const cors = await oakCors({
  origin: "*",
  optionsSuccessStatus: 200,
});

const app = new Application();
app.use(cors);
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on port 8000");
await app.listen({ port: 8000 });
