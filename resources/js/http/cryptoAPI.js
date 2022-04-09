import { CRYPTO_API_KEY } from "../utils/consts";
import { $cryptoHost } from "./index";

const convert = 'EUR';
const per_gage = 100;
const page = 1;
const platform_currency = 'BTC';

export const getCrypto = async (ids, interval) => {
    const response = await $cryptoHost.get('currencies/ticker', {CRYPTO_API_KEY, ids, interval, convert, platform_currency, per_gage, page})
    return response
}
