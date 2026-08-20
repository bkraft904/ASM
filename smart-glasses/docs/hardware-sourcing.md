# Hardware Sourcing — AI Smart Glasses

Research notes on how a small team (not a hardware-funded startup) actually gets
from "idea" to "glasses you can sell," based on how existing players did it.

## The two paths

### 1. ODM / reference-design route (realistic for us)
Buy a working glasses platform from a manufacturer that already solved the hard
optics/RF/battery problems, then differentiate on firmware, companion app, and
the AI pipeline. This is how most non-Meta/Google smart glasses brands ship.

- **Goertek** — world's largest XR ODM. Assembles Meta's Ray-Ban glasses, Quest
  headsets, and Xiaomi AI Glasses. Vertically integrated: waveguides, micro-LEDs,
  acoustics all in-house. Enterprise-scale MOQs — realistic for a funded Series A+
  effort, not a first prototype run.
- Smaller China-based AI-glasses ODMs (e.g. **4P-Touch**, **Microwear**, and the
  long tail of Shenzhen frame/module houses found via Alibaba/Accio/GlobalOEMs)
  do full-service AI glasses ODM: frame design, mold development, sampling,
  production, with camera + mic + BLE + power already integrated. These are
  sized for smaller brands and startups, not just majors.
- **Even Realities** (Shenzhen, ex-Apple team, now $1B valuation) manufactures
  across several Chinese factories — they didn't build their own fab, they
  built a strong industrial-design/optometry team and sourced manufacturing.
  That's the template worth copying at small scale.

### 2. Fully custom hardware route (hardware startup, not a coding project)
Designing your own waveguide/optical combiner from scratch requires optics
engineering, a hardware team, custom PCB/frame tooling, and $1M+ multi-year
capital even for lean teams. Not something to start with.

## Waveguide / display module sourcing (if going semi-custom)

- Entry-level AR waveguide *modules* (not full glasses): **$6.70–$8.10/unit**
  from suppliers like Zhuhai Pindom, at scalable MOQ.
- Broader OEM smart-glasses *reference kits* (frame + display + camera + BLE):
  **$18–$205/unit** depending on spec, MOQs as low as ~100 units; some module
  suppliers support MOQ of 1–2 units for prototyping.
- Diffractive (SRG) waveguides: thinnest, most scalable for mass production.
  Reflective (geometric) waveguides: better clarity/brightness, bulkier.
- Typical spec ranges to expect: 25–50° FOV, 500–3000 nits, HD–4K, >1000:1
  contrast, 15–25mm eye relief.

## Certification (US market)

- **FCC**: SDoC-only products start ~$600; anything with real wireless
  radios (BLE, WiFi — i.e. any smart glasses) is realistically **$1,500–$8,000**
  and ~4 weeks, *if* you use a pre-certified radio module and pre-certified
  battery pack rather than a custom RF design. Custom radio design pushes this
  toward the $15k+ end — another reason to buy a certified reference module
  instead of rolling your own RF.
- **UN38.3** (lithium battery transport/safety): **$2,000–$10,000**, 4–6 weeks,
  depending on battery type/capacity and lab. Using a pre-certified battery
  pack from the ODM (common) can eliminate this cost entirely.
- **CE** (if selling in EU) is a separate, parallel process — budget similarly.

## Bottom line / recommended path

1. Prototype the software (AI pipeline + companion app) against a dev-kit-class
   device or even a phone rig — validate the product before spending on hardware.
2. Once the product is proven, go to 2–3 ODM vendors (start with Alibaba/Accio
   listings under "AI glasses ODM," cross-check against Microwear/4P-Touch-style
   full-service shops) for reference-design quotes at ~100-unit MOQ.
3. Insist on a **pre-certified BLE/WiFi radio module and pre-certified battery
   pack** in the reference design — this is the single biggest lever on
   certification cost and timeline.
4. Budget roughly **$5k–$15k** in certification (FCC + UN38.3) for a first US
   production run on top of per-unit hardware cost, assuming pre-certified
   radio/battery.
5. Treat the ODM relationship the way Even Realities did: you bring industrial
   design + software + AI, they bring manufacturing — don't try to become an
   optics company.

## Sources
- [ODM Smart Glasses Solutions 2026](https://www.accio.com/plp/odm-smart-glasses-solutions)
- [AI Glasses OEM/ODM Partner Guide 2026](https://microwear.info/blog/2026-03-19-ai-glasses-oem-odm-partner-guide)
- [Top 9 AI Smart Glasses Manufacturers in 2026](https://www.beautasteyewear.com/blog/sunglasses-blog/top-9-ai-glasses-manufacturers/)
- [Waveguide display module suppliers](https://www.accio.com/plp/waveguide-display-module)
- [OEM Smart Glasses Guide: How to Choose the Right Partner](https://electronics.alibaba.com/buyingguides/oem-smart-glasses-guide-how-to-choose-right)
- [Even Realities hits $1B valuation — TechCrunch](https://techcrunch.com/2026/07/06/smart-glasses-maker-even-realities-hits-1b-valuation-with-150m-funding-led-by-meituan-tencent/)
- [Apple veteran's Chinese smart-glasses firm becomes unicorn — CNBC](https://www.cnbc.com/2026/07/06/apple-veteran-takes-on-meta-with-1-billion-smart-glasses-maker.html)
- [Google's AI smart glasses spark contract battle — Digitimes](https://www.digitimes.com/news/a20250822PD216/google-ai-smart-glasses-pegatron-goertek-quanta.html)
- [Loving and Hating Apple: OEM Manufacturing of AI Glasses (Goertek)](https://eu.36kr.com/en/p/3749677834584835)
- [FCC Certification Cost Breakdown 2026 — Jettest](https://www.jettest.net/blog/explained-what-is-fcc-certification-cost-breakdown-2026)
- [How much does FCC certification cost — JJRLAB](https://www.jjrlab.com/news/how-much-does-fcc-certification-for-electronic-products-cost.html)
- [Battery Certification 2026: Types, Costs and Timelines](https://www.ufinebattery.com/blog/essential-guide-to-battery-certification-types-costs-timeframes-and-standards/)
- [What is a UN38.3 test report? How much does it cost — JJR](https://www.jjrlab.com/news/what-is-a-un383-test-report-how-much-does-it-cost.html)
