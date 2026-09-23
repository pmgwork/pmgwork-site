import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.PUBLIC_GRAPHCMS_ENDPOINT?.trim();

if (!endpoint) {
    throw new Error('PUBLIC_GRAPHCMS_ENDPOINT が未設定です。プロジェクトの .env に Hygraph の Content API URL を設定してください。');
}

let url: URL;
try {
    url = new URL(endpoint);
} catch {
    throw new Error('PUBLIC_GRAPHCMS_ENDPOINT が不正な URL です。Hygraph の Content API URL（https://...）を設定してください。');
}

if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('PUBLIC_GRAPHCMS_ENDPOINT には http または https の URL を設定してください。');
}

export const graphcmsClient = new GraphQLClient(url.toString());
