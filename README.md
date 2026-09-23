## pmgwork — Portfolio Site

このサイトは、制作物や実験的な取り組みをまとめたポートフォリオです。シンプルな情報設計と、気持ちの良いアニメーションで作品を心地よく閲覧できる体験を目指しています。

### できること / みどころ
- スクロールに連動する軽快なアニメーション
- ページ間のシームレスなトランジション
- スムーススクロールによる滑らかな操作感
- 作品一覧と詳細ページでの読みやすいレイアウト

### 使っているもの（ひとこと）
Astro + React をベースに、GSAP でアニメーションとスムーススクロール、Swup でページ遷移を実現。作品データは Hygraph（GraphCMS）で管理しています。

### ローカルで試す
- Node.js 24 と pnpm 12 を用意し、`pnpm install --frozen-lockfile`（`.prototools` を使う場合は pnpm 12 対応の proto 0.60.1 以降が必要です）
- `pnpm dev` → `http://localhost:4321`

作品ページの表示とビルドには、プロジェクト直下の `.env` に `PUBLIC_GRAPHCMS_ENDPOINT` が必要です。Hygraph の Content API URL を設定してください（`.env.example` の `<your-hygraph-endpoint>` は実際の URL に置き換えます）。設定後は開発サーバーを再起動してください。

### Cloudflare Workers へのデプロイ

このサイトは Astro で静的生成し、Workers Static Assets から配信します。作品データはビルド時に Hygraph から取得します。

1. Git 連携の場合、Cloudflare の Workers Builds のビルド変数に `PUBLIC_GRAPHCMS_ENDPOINT`、`NODE_VERSION=24`、`PNPM_VERSION=12.6.0` を設定します（ローカルでは `.env` に Hygraph のエンドポイントを設定）。Hygraph の URL は実行時の Worker 変数ではなく、Astro のビルド時に必要です。以前設定した `BUN_VERSION` は削除できます。
2. `pnpm install --frozen-lockfile` の後、`pnpm deploy` でビルド・デプロイします。初回は Cloudflare へのログインが必要です。
3. デプロイ後、Cloudflare ダッシュボードの Workers & Pages → `pmgwork-site` → Domains & Routes で `pmgwork.com` をカスタムドメインに追加します。DNS の切り替えは動作確認後に行ってください。

Git 連携でビルドする場合は、ビルドコマンドを `pnpm build`、デプロイコマンドを `pnpm exec wrangler deploy` に設定し、同じ環境変数をビルド環境に登録してください。Hygraph の作品を更新した場合は再ビルド・再デプロイが必要です。ローカルで Workers の配信を確認する場合は `pnpm build` の後に `pnpm preview:worker` を実行し、`http://localhost:8787` を開きます。

---

ご意見・改善提案などあれば、Issue/PR 歓迎です。
