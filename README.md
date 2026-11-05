# CUinc – LiftStation Turn Ons (trial)

Expo (React Native, SDK 58) app: splash, mock phone + PIN sign-in, Turn Ons routes, addresses, address detail and "Turned On" view. Runs on Android, iOS and web from one codebase.

## Run

Requires Node 22.13+, 24.3+ or 26+ (Expo SDK 58).

```bash
npm install
npx expo start          # press w for web, a for Android
npx expo export -p web  # static web build into dist/
```

## Mock backend

There is no server. `src/data/repository.ts` is the single data-access layer; it persists to the device (AsyncStorage) and fakes latency. Screens only use it, so a real API can replace it later without touching the UI.

Demo users (mock only):

| Name | Phone | PIN |
|---|---|---|
| Brian Abbott | (912)555-0100 | 123456 |
| Eddie Morris | (912)555-0142 | 654321 |

## Deploy (Cloudflare)

Build command `npx expo export -p web`, deploy command `npx wrangler deploy`. `wrangler.jsonc` serves `dist/` as static assets and sets `not_found_handling: "single-page-application"` so deep links such as `/addresses` fall back to `index.html`. (A `public/_redirects` with `/* /index.html 200` is rejected by Cloudflare as an infinite loop; do not add one.)

## Notes

- Montserrat is a stand-in for Avenir.
- Address card color = status (red pending, green turned on, blue follow-up) is our assumption, not confirmed by the designs.
- Dark mode, Spanish and tablet layouts are out of scope for the trial.
