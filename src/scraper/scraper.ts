import ProxyService from '../proxy/proxy.service';
import fetch from 'node-fetch';
import { Episode, AnimeWebPage, WebsiteMeta } from '../types/global';

export default abstract class Scraper {
    protected enabled = false;

    public websiteMeta: WebsiteMeta = undefined;

    constructor(private readonly proxyService: ProxyService) {}

    abstract name(): string;

    abstract url(): string;

    locale() {
        return "en_US";
    }

    abstract match(title): AnimeWebPage | Promise<AnimeWebPage>;

    abstract fetch(path: string, number: number, endNumber: number | undefined): Episode | Promise<Episode> | Promise<Episode[]> | Episode[];

    async getRawSource(sourceUrl: string | URL, referer = undefined): Promise<string> {
        return undefined;
    }

    async get(url, headers = {}, proxy = false) {
        let agent = undefined;

        if (proxy) {
            agent = await this.proxyService.getProxyAgent();
        }

        return fetch(url, {
            ...(proxy && {
                agent: agent
            }),
            headers: headers
        });
    }

    async post(url, headers = {}, body: any = undefined, proxy = false) {
        let agent = undefined;

        if (proxy) {
            agent = await this.proxyService.getProxyAgent();
        }

        return fetch(url, {
            ...(proxy && {
                agent: agent
            }),
            method: "POST",
            headers: headers,
            body: body
        });
    }

}