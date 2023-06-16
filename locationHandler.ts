import { load } from "https://deno.land/std/dotenv/mod.ts";
import { type ATM } from "./atm.ts";

const env = await load();

export async function handleATMRequest(location: string): Promise<ATM[]> {
  const URL = `${env["LOCATION_SERVICE_URL"]}?apiKey=${
    env["LOCATION_SERVICE_API_KEY"]
  }&q=cajero automatico&at=${location}`;
  const ATMs = await fetch(URL);
  const jsonATMs = await ATMs.json();
  const atmsToReturn: ATM[] = [];
  for (const atm of jsonATMs.items) {
    const { title, address, distance } = atm;
    atmsToReturn.push({
      name: title,
      address: address.label,
      distance: distance,
    });
  }
  return atmsToReturn;
}
