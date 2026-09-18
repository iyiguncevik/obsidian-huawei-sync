# Privacy Policy — Huawei Health Sync

**Developer:** Iyigün Cevik  
**Contact:** iyigun@cevik.io  
**App:** Huawei Health Sync (Obsidian community plugin)  
**Last updated:** 18 September 2026

This policy describes how Huawei Health Sync (“the plugin”) handles personal data. The plugin runs inside [Obsidian](https://obsidian.md) on the user’s device (desktop or mobile).

## What the plugin does

After you sign in with your Huawei ID and grant permission, the plugin reads **your own** fitness data from **HUAWEI Health Service Kit** (for example daily steps and sleep duration) and writes it into the **frontmatter of Daily Notes in your local Obsidian vault**.

## Data we process

| Data                                                        | Source                               | Where it is stored                                         |
| ----------------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------- |
| Huawei ID OAuth access token and refresh token              | Huawei Account after you click Allow | Plugin data on your device (Obsidian vault plugin storage) |
| Health metrics you enable (e.g. step count, sleep duration) | HUAWEI Health Service Kit REST APIs  | Daily Note files in **your vault only**                    |
| Sync settings (interval, enabled fields, last sync time)    | You                                  | Plugin data on your device                                 |

We do **not** collect analytics, advertising IDs, or contact lists. We do **not** create a user account on our servers for your health data.

## How data is used

- **Purpose:** show your daily activity and sleep next to your personal journal in Obsidian.
- **Legal basis:** your consent when you connect a Huawei ID and grant Health Service Kit scopes.
- **Not medical:** the plugin is not a medical device and is not used for diagnosis or treatment.

## Network services

1. **Huawei** (`oauth-login.cloud.huawei.com`, `health-api.cloud.huawei.com`) — login, consent, and health reads. This is required for the plugin to work.
2. **Author-hosted Cloudflare Worker** (OAuth only) — exchanges the authorization code and refreshes tokens. It holds the Huawei Client Secret so it is not shipped inside the plugin. The Worker does **not** store health measurements and does **not** keep a user database. Tokens pass through only for the handshake, then live on your device.

Health payloads go **Huawei → your device**. They are not sent to other third parties.

The plugin may cause Huawei’s services (HUAWEI ID / Health Service Kit) to run as part of authorization. Huawei’s processing is described in Huawei’s own privacy notices.

## Retention and deletion

- Vault notes and plugin settings stay until **you** delete them or uninstall the plugin.
- Use **Disconnect** in plugin settings to drop stored tokens. Revoke access at any time in your Huawei ID / Health account permissions.
- Refresh tokens expire (about 180 days); you can connect again if you wish.

## Your rights

You can access and delete data in your vault, disconnect the plugin, and withdraw Huawei authorization. For questions, email iyigun@cevik.io.

## Children

The plugin is not directed at children.

## Changes

This page will be updated if the data flow changes. The date at the top is the latest version.
