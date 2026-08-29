# Worker (maintainer)

The Cloudflare Worker holds the Huawei **Client Secret** and performs OAuth
code exchange and token refresh. End users of the plugin never configure the
Worker.

## Routes

| Route        | Method | Purpose                                                                                 |
| ------------ | ------ | --------------------------------------------------------------------------------------- |
| `/health`    | GET    | Uptime check (`ok`)                                                                     |
| `/callback`  | GET    | Huawei OAuth redirect; exchanges code; redirects to `obsidian://huawei-sync/auth?...` |
| `/callback`  | HEAD   | Redirect URI verification probe (returns 200)                                           |
| `/refresh`   | POST   | JSON `{ "refresh_token": "..." }` → `{ access_token, refresh_token, expires_in }`       |
| `/client-id` | GET    | Public Huawei Client ID (optional; plugin may hardcode Client ID)                       |

## Required secrets

Set in Cloudflare (never commit values):

| Name                   | Description                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `HUAWEI_CLIENT_ID`     | AppGallery Connect OAuth 2.0 Client ID                                                                        |
| `HUAWEI_CLIENT_SECRET` | AppGallery Connect Client Secret                                                                              |
| `HUAWEI_REDIRECT_URI`  | Must match the Huawei Account Kit callback exactly, e.g. `https://huawei-sync-auth.<account>.workers.dev/callback` |

## Local development

```bash
cd worker
cp .dev.vars.example .dev.vars   # fill in credentials
npm install
npm run dev                      # http://localhost:8787
```

For local OAuth testing, register `http://localhost:8787/callback` as the
Account Kit callback if Huawei allows `http` on localhost, or use the
deployed Worker URL. Huawei normally requires `https://` for the registered
callback.

## Deploy

```bash
cd worker
wrangler login
wrangler secret put HUAWEI_CLIENT_ID
wrangler secret put HUAWEI_CLIENT_SECRET
wrangler secret put HUAWEI_REDIRECT_URI
npm run deploy
```

After deploy:

1. Note the Worker base URL (e.g.
   `https://huawei-sync-auth.<account>.workers.dev`).
2. In AppGallery Connect (Account Kit / Huawei ID), set the application
   **callback** to `{WORKER_BASE_URL}/callback`.
3. Set `HUAWEI_REDIRECT_URI` to that same URL.
4. In Phase 2, ensure the plugin `WORKER_BASE_URL` matches the deployed URL
   before cutting a plugin release.

Structured logs use JSON (`event`, `huaweiError`, etc.) and never include
tokens or authorization codes. Optional: Cloudflare Workers Observability →
Grafana Cloud OTLP for logs/traces.
