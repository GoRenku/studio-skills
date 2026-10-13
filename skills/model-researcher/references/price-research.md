# Price research

Renku estimates the cost of each reviewed request from prices cached with the
provider metadata. Fal.ai, Pika and WaveSpeed publish prices or quotes through
their APIs. Replicate, ElevenLabs and World Labs do not, so their prices come
from an entry you research once and record with an expiry. This guide is that
research. Never write a price into a Skill, model guide or review document.

## When to run it

Run it only when all of these hold:

- Ask Before Generating is on and the estimate for the request you are about
  to review (`renku generation estimate`, or the `estimate` that
  `renku generation prepare` and `preview show` attach) is `missingPrice` or
  `expired`;
- the route is billed by the provider (`billing: "providerCharge"`), not a
  Codex built-in route;
- the provider has no API price for it. A `missingPrice` from an API-priced
  provider is a failed lookup: report its note instead of researching; and
- you have not already researched this route in its current expiry period.
  `renku generation price show --provider <id> --model <apiId> --json`
  returns `recorded` with `expired: false` when a fresh entry exists.

Do not run it when Ask Before Generating is off, for `unpriced` routes whose
pricing the price vocabulary cannot express, or to second-guess a `quoted` or
`computed` estimate. The review stays usable while research runs; a missing
price never blocks generation.

## Research the provider's public pricing page

1. Read the provider's public pricing page for the exact route with web fetch.
   Use a browser only when the page needs one to render its prices. Do not sign
   in, open account billing pages or use the user's API key.
2. Find the price that applies to the exact model and operation, including
   the settings that change it (duration, resolution, character count, image
   count). Note any promotion and its end date.
3. Express it in the price vocabulary. Each component has a `unit` (`request`,
   `image`, `megapixel`, `second`, `character` or `credit`), a `unitPriceUsd`
   and a `quantity`: `{ "kind": "constant", "value": n }`,
   `{ "kind": "field", "pointer": "/duration", "default": n }` (a native
   request field, with its schema default),
   `{ "kind": "characters", "pointer": "/text" }` or, for a per-megapixel
   image price, `{ "kind": "imageMegapixels", "countPointer": "/num_images" }`
   (Renku guesses the image size from width and height or a size label such as
   `2k`, and assumes 1 megapixel when the request names no size). Use `tiers`
   (`{ "when": { "/resolution": "<value>" }, "unitPriceUsd": <usd> }`) when a
   native setting changes the unit price. Take pointers from the route's live
   schema.
4. If the price needs anything the vocabulary cannot express, such as a token
   formula or account-dependent plan pricing, do not record it. Tell the user
   the route stays unpriced and why.

## Record and refresh

Write the entry under `tmp/scratch/` and record it:

```json
{
  "currency": "USD",
  "components": [
    { "unit": "<unit>", "unitPriceUsd": <usd>, "quantity": { "kind": "field", "pointer": "/<native-field>" } }
  ],
  "source": { "kind": "recorded", "url": "<pricing page>", "observedAt": "<ISO time you read it>" },
  "expiresAt": "<ISO time>",
  "notes": ["<what the price covers, and any promotion>"]
}
```

```bash
renku generation price record --provider <id> --model <apiId> --file tmp/scratch/price.json --json
```

Set `expiresAt` to the earlier of the promotion end and 14 days after
`observedAt`; Renku caps it at 14 days. Fix any reported diagnostics and
record again.

Then continue the review with a fresh estimate: open the combined panel, whose
server computes it again, or rerun `renku generation preview show` for the same
file in the Studio Preview path. Report in one sentence which page you read and
that the estimate comes from your recorded price.
