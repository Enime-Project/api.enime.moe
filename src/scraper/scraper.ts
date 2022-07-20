import ProxyService from '../proxy/proxy.service';
import fetch from 'node-fetch';
import { Episode, MatchEpisode, WebsiteMeta } from '../../types/global';

export default abstract class Scraper {
    public websiteMeta: WebsiteMeta = undefined;

    constructor(private readonly proxyService: ProxyService) {}

    abstract name(): string;

    abstract url(): string;

    locale() {
        return "en_US";
    }

    abstract match(title): MatchEpisode[] | Promise<MatchEpisode[]>;

    abstract fetch(path: string): Episode | Promise<Episode>;

    async get(url, headers = {}, proxy = false) {
        let agent = undefined;

        if (proxy) {
            agent = this.proxyService.getProxyAgent();
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
            agent = this.proxyService.getProxyAgent();
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