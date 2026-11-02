Tracking install. Write this tracking block into site.config.ts as the `tracking` key, exactly as given, and change nothing else (AGENT.md, CI mode, Tracking installs):

```ts
tracking: {
  googleAdsId: 'AW-18523532236',
  conversions: { form: 'AW-18523532236/JqfSCKf5jawdEMzX2oBF' },
},
```

Then run the gate: check 22 must pass.