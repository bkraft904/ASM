# Minimum Viable BOM & Vendor Shortlist

A concrete first cut at what a buildable unit costs and who to actually contact for
quotes, following on from `hardware-sourcing.md`. Numbers are current market
ranges from ODM/supplier listings (see Sources), not vendor-confirmed quotes —
treat this as a shortlist to start conversations with, not a signed BOM.

## MVP bill of materials

| Component | Spec target | Approx. unit cost | Where it comes from |
|---|---|---|---|
| Frame + hinges | Custom molded, your industrial design | Tooling cost amortized (one-time, not per-unit) | ODM's mold shop, part of the reference-design deal |
| Waveguide combiner (one lens) | Monochrome, 25–40° FOV, 500–1500 nits | $6.70–$8.10 (module only) or bundled into a $18–$205 full kit | Waveguide module suppliers (Zhuhai Pindom-class) or bundled by the ODM |
| Camera module | ≥8MP, Sony/Samsung/Omnivision sensor | Bundled in reference kit | Camera-module suppliers (Supertek-class) or ODM-integrated |
| BLE radio | BLE 5.3/5.4, pre-certified module | Bundled in reference kit | ODM-integrated — insist pre-certified (see certification notes below) |
| Mic array | Dual mic + noise cancellation | Bundled in reference kit | ODM-integrated |
| Battery (x2, one per temple) | 150–250 mAh Li-Po per side, pre-certified pack | Bundled in reference kit | ODM-integrated — insist pre-certified (UN38.3 already covered) |
| Touch control | Capacitive pad, one temple | Bundled in reference kit | ODM-integrated |
| Charging case (optional) | Standard for this product class | Bundled or small adder | ODM-integrated |

Note: battery capacity is the tightest physical constraint — narrow custom LiPo
cells run as small as 19–47 mAh in the most space-limited temple designs, and
even generous designs top out around 150–250 mAh per side (Ray-Ban Meta Gen 2 ≈
154 mAh; Samsung's unreleased Galaxy Glasses reportedly ≈ 245 mAh). Realistic
runtime on a first unit is 4–6 hours of mixed use, not all-day.

## Vendor tiers (what's actually available to order)

| Tier | Price/unit | MOQ | What's included | Fit for us |
|---|---|---|---|---|
| **Entry white-label** | $18–$45 | 500 pcs | Camera + BLE audio glasses, minimal/no display, no AI SDK | Too stripped down — no HUD, which is the whole point |
| **Mid-tier reference design** | $199–$329 | 2,000 pcs | Waveguide display + camera + BLE, **full SDK and certification already done** | **Best fit for a first real product** — the certification bundling is exactly the cost lever `hardware-sourcing.md` flagged |
| **Custom co-dev** | $450–$1,100 | 5,000 pcs | Fully bespoke industrial design + optics, Shenzhen ODM engineering team | Right move once the product is validated and funded past MVP, not for a first run |

## Recommended shortlist to actually contact

1. **Mid-tier reference-design ODMs** — search Alibaba/electronics.alibaba.com and
   Accio for "AI glasses ODM" or "smart glasses reference design," filter to
   verified suppliers quoting in the $199–$329/2,000-unit band with SDK +
   certification included. This tier is the target — get 3 quotes here before
   deciding anything else.
2. **Goertek** — worth one inquiry even though their MOQs skew enterprise-scale;
   useful as a price/capability ceiling to calibrate the smaller quotes against.
3. **Camera-module specialists (Supertek-class)** — only needed as a fallback if
   a chosen reference-design vendor's stock camera spec is too weak and a
   component swap turns out to be negotiable.

## What to ask every vendor for, on the first call

- Is the BLE radio module **pre-certified** (FCC ID already issued)?
- Is the battery pack **pre-certified** (UN38.3 report already on file)?
- What's included in "SDK" — raw BLE GATT spec, or a native mobile SDK? (Determines
  whether `companion-app/` can be native or needs a GATT-level custom build.)
- Sample unit lead time and cost, separate from the MOQ production run.

## Sources
- [Top Alibaba AI Glasses Suppliers for OEM/ODM](https://electronics.alibaba.com/supplier/alibaba-ai-glasses)
- [OEM Smart Glasses Guide: How to Choose the Right Partner](https://electronics.alibaba.com/buyingguides/oem-smart-glasses-guide-how-to-choose-right)
- [Smart Glasses Product Configuration Guide 2026 — Alibaba Seller Blog](https://seller.alibaba.com/blogs/2026/southeast-asia/smart-glasses/product-configuration-guide-alibaba-b2b)
- [Smart Glasses Camera Module — Supertek](https://www.supertekmodule.com/smart-glasses-camera-module/)
- [Verified Supplier Bluetooth Glasses Camera — Alibaba](https://www.alibaba.com/showroom/bluetooth-glasses-camera.html)
- [Best Smart Glasses 2026: AI, Camera & Battery Guide — Grepow](https://www.grepow.com/blog/best-smart-glasses-2026-ai-camera-battery-guide.html)
- [Why Smart Glasses Need Ultra-Narrow High-Rate Battery — Grepow](https://www.grepow.com/blog/why-smart-glasses-need-ultra-narrow-high-rate-battery.html)
- [The Hardware Reality of AI Glasses: Beyond the Spec Sheet](https://www.tech-critter.com/the-hardware-reality-of-ai-glasses-beyond-the-spec-sheet/)
