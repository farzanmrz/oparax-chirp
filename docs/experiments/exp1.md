# exp1 (Monday, Aug 31 - Sunday, Sep 6)

*One plain paragraph: what this experiment is. What it decides belongs in Learn.*

Oparax evolved into a monitoring, drafting, and posting product, incorrectly so, because Reshad used none of it on his own and the only half he touched was monitoring. We strip it down to the bare minimum of the monitoring side: a custom feed per person, and a bot that DMs them on X when something on their beat lands. Each person gets a maximum of 7 days after activating alerts; the findings may push the decision past the stop date, but the plan is to decide within those 7 days.

## 1. Pre-Learn

### 1.1 Evidence inventory

*Inventory real evidence. Write down what customers have actually done. This is where the Mom Test earns its place, because it defines what counts as evidence*

- **Reporters:** Mostly all said they only use WhatsApp or have personal relationships. That cohort of reporters is a failing end
- **Content creators for the AI beat:** Most interested in self-promotion and payment. Weak interest, Liam/Nihan engaged but no action.
- **Empty compliments:** Liam/Nihan complimented direction looks good, part of my pitch leaking in and part maybe bias from demo
- **Reshad:** Only acted when prompted, never revisited the feed, posted, or logged in on his own. Did use the monitoring output when prompted for a roundup. Asked for a related-news recommendation feature.
- **Manual monitoring is the current behavior:** Liam and Nihan both watch their beat by hand, X-first (official AI accounts, product/company pages), plus Product Hunt, GitHub, TechCrunch, newsletters.
- **Judgment over collection:** every substantive ask pointed at deciding what's worth posting, not gathering. Nihan named learning his worth-posting judgment as the most important improvement, Liam's strongest match was filtering out unrelated stories, Reshad wanted recommendations.
- **Declined commitments:** Nihan was asked to set up his own free desk (Aug 21), no reply and no desk as of Sep 3. Liam drew the commercial line himself, not looking to subscribe or purchase, demo-and-feedback only, and has no desk (caveat: we promised him a follow-up within a week and never sent it, so his silence is partly ours).
- **Speed:** Liam described spotting things early as a big part of his workflow; Nihan was relatively quick from discovering his best thread's topic to posting it. Thin, only 2 people.

### 1.2 The belief

*One sentence about the group and their problem, written alone, after the inventory. No features, no metrics.*

Content creators covering a narrow beat monitor their X accounts and websites manually, which depends on their personal attention (sleep, piled-up notifications), so coverage has gaps and stories get missed or caught late.

### 1.3 What must be true

*List everything that must be true for that belief to hold. You'll get many candidates.*

1. **The cost is real:** missing a story, or catching it late, actually costs them something with their audience.
2. **The burden is felt:** they experience the manual watching as friction, not just as their routine.
3. **Speed matters:** being early is part of the job, not a nice-to-have.
4. **Sources are public:** what they track is reachable without private contacts (X accounts, websites, feeds).
5. **Machine judgment is tolerable:** they would let a filter decide what surfaces, accepting an occasional miss.
6. **One place beats many:** a converged stream is preferable to checking each source themselves.
7. **Delivery must not depend on their attention:** if the problem is attention gaps, a surface they must remember to visit cannot relieve it.

### 1.4 Keep the riskiest

*Cross out everything that is not both evidence-free and fatal if wrong. Merge candidates that die together. One or two survive.*

- **Cut, recruiting rule (4):** public sources is guaranteed by who we pick, so the run can never disprove it. It becomes a Cohort selection bar.
- **Cut, not fatal (3):** if speed turns out not to matter but the rest holds, a slower-but-complete product still works. Parked, evidence was thin anyway (1.1 Speed bullet).
- **Cut, derivation not bet (7):** follows directly from 1.2, so the run cannot disprove it on its own. It becomes the MVP floor in Build: alerts arrive unprompted. The channel (X bot DM) is a Build choice on channel fit, not a belief; Reshad never asked for push, he returned only when a human nudged him.
- **Merged (1+2):** the cost being real and the burden being felt die together: if gaps cost nothing, nobody feels friction. One assumption.
- **Merged (5+6):** trusting the filter and preferring one place die together: both say "they'll rely on our stream instead of checking themselves." One assumption.

Survivors:

1. **The problem is real:** manual monitoring gaps genuinely cost these creators, enough that they want relief. Evidence: none, nobody ever complained about the watching.
2. **Filtered delivery is trusted:** they will rely on a machine-filtered stream instead of checking sources themselves, tolerating an occasional miss. Evidence: none, and Nihan's judgment comments cut both ways.

### 1.5 Fear test

*For each survivor: if the run proves it false, what changes? If nothing changes, it is not a leap.*

1. **The problem is real, proven false:** the monitoring pivot dies. There is no pain to relieve for this segment and Oparax has no reason to exist in this shape. Everything changes. Leap.
2. **Filtered delivery is trusted, proven false:** the problem may exist but alerts as a product die, and delivery has to be rethought from zero. The build direction changes entirely. Leap.

Both pass. Both move into Learn as the leap-of-faith assumptions.

## 2. Learn

### 2.1 Leap of Faith

*The beliefs the whole pivot rests on, carried over from 1.5. Each is one sentence, written at the level this one run can decide, and each is about their behavior, never about what we can build.*

1. **The problem is real:** AI-beat content creators lose enough to manual monitoring gaps that they want relief.
2. **Filtered delivery is trusted:** they will rely on a machine-filtered stream arriving unprompted instead of checking sources themselves, tolerating an occasional miss.

### 2.2 Hypotheses

*Each leap rewritten as a bet that can visibly lose: who (a countable group) does what (an observable action, on their own, that costs them something) by when, and a Disproved line naming the exact result with an explicit denominator. The cold segment decides every bet. Liam and Nihan are read separately and cannot carry one. Reshad is the negative baseline: his action counts for nothing, his inaction counts against. The three bets form a ladder of commitment: touched it, came back to it, paid for it.*

**H1, touched it (tests leap 1):** at least 1 of the ~10 cold creators acts on an alert on their own (clicks through to the story) within their 7 days.

**Disproved:** 0 of the ~10 cold creators click any alert in their 7 days.

**H2, came back to it (tests leap 2):** at least 1 cold creator who authorized keeps alerts on for the full 7 days and acts on alerts on 2 or more separate days.

**Disproved:** every cold creator who authorized either sends "stop" or acts on at most 1 day.

**H3, paid for it (tests leap 1 at the strongest commitment currency):** at least 1 person, cold or warm, pays to keep alerts when their 7 days end.

**Disproved:** nobody pays. Reshad paying satisfies nothing; Reshad not paying is added negative signal.

**Attribution:** a disproved bet kills "AI-beat content creators want this" first, and "aggregators broadly want this" only after another segment fails the same way.

**Unreadable, not disproved:** if the run never reached the people (near-zero outreach replies, desks that failed to build, no alert opened by anyone), the verdict is launch failure. Fix the launch, re-send to the already-named people, and read nothing about the leaps.

## 3. Measure

### 3.1 Metrics

*Only the data that decides the hypotheses, plus the splits that tell a failed launch apart from a disproved bet. Anything that decides nothing is cut.*

- **Outreach funnel (instrumentation, not a bet):** DMs and emails sent, replies, feed page visits per named person. Near-zero replies means fix the outreach and re-send to the same names, not read a verdict.
- **Activation (H1 denominator):** authorize presses and consent DMs received, per person, with the date the 7-day clock started.
- **Alert delivery vs action (H1, H2):** alerts sent per person, and alert clicks counted on our own domain (`/l/<token>` redirect) before the person lands on the story, with the day of each click. Opened-but-not-clicked is split from never-opened wherever X lets us see it, so channel failure never reads as problem disproof.
- **Stops (H2):** "stop" replies, with the day.
- **Payment (H3):** payment-ask DMs sent at trial end, payments completed.
- **Feed page revisits:** recorded but not a signal for any bet, because reading happens in DMs and a person who never revisits the page may be fully served.
- **Launch-failure guards:** onboarding started, completed, failed, rate-limited; failure events from webhook, alert sending, DM intake, and onboarding; per-person AI cost so a runaway desk is caught, not discovered at the invoice.
- **Identity hygiene:** feed visitors are never merged into pilot identities, so a curious stranger cannot count as a cohort member's action.

### 3.2 Cohort

*Who is in, decided before day zero and frozen at first contact. Everyone reached on day zero is in, no matter what they do after. Authorizing, acting, and paying are signals measured on the cohort, never conditions for belonging to it.*

- **Commonality:** they post on X about a niche beat (AI news, FC Barcelona, startup funding, and so on), 5k to 500k followers, and get their material from public sources they watch by hand: X accounts and websites. Hashtags, lists, and other X tangents are deliberately out of scope to keep the focus small.
- **Segment:** AI-beat content creators on X, an explicit subset. This is a bet, not a finding: the engagement that pointed here was self-promotion and compliments, which prove nothing, so the run supplies the evidence.
- **Selection bar:** every cold candidate must show at least one past-behavior signal of already curating, reposting, or assembling news in their space on their own. Having engaged with or complimented Oparax qualifies nobody.
- **Negative baseline, Reshad:** family, biased in our favor, and still not using the product unprompted. He is in the run for his inaction only: his non-payment counts against, his payment counts for nothing.
- **Warm, Liam and Nihan:** AI-beat creators with past demo contact and no action of any kind since. Read separately from the cold segment; their acting could be a favor and their silence could be a busy week, so they can neither satisfy nor kill a bet. Reached on the surface the relationship already lives on (X DM, plus email).
- **Cold, about 10:** strangers matching the segment and the selection bar, reached by X DM or email. Every name is written here before day zero, so "frozen at first contact" cannot drift into "whoever I ended up DMing."

Cold names: (fill before day zero)

## 4. Build

*The smallest thing that produces the Measure data. Every item earns its place by naming the metric it feeds; anything that feeds none is cut or parked. The MVP floor is derived from the belief, not preferred.*

- **MVP floor, alerts arrive unprompted:** derived from 1.2 and 1.4 (7). A feed the person must visit would reproduce the attention problem and make a null result unreadable.
- **Channel, X bot DM:** alerts go out as plain-news DMs from the Oparax bot account, the native surface for the cold segment. A channel-fit choice, measured by opens and clicks, not a belief.
- **Alert judgment and suppression:** an alert is sent only after a DM-worthiness judgment, and a 30-minute suppression window stops duplicate echoes of one story re-alerting. This is the only filtering in the run; it is what H2 tests.
- **Alert links count clicks:** every alert link points at our own domain (`/l/<token>`) and redirects to the story. Feeds the H1 and H2 click metric.
- **Public feed page and Authorize:** each pilot person gets `oparax.ai/feed/<handle>`: their story feed and one Authorize module. Pressing Authorize opens the person's DM thread with the bot with the consent message prefilled, on desktop, the X app, and X mobile web alike; sending it starts alerts and the 7-day clock, and a "stop" reply ends them any time. Feeds activation and stops. Searching, filtration controls, and clustering are stripped: no metric needs them and nobody asked for them.
- **Desk building:** the real onboarding pipeline builds each desk from the person's X handle, never hand-configured, so a result cannot be faked by a desk we tuned. The agent reads the profile, follows, posts, and linked websites, sets up the X accounts, websites, and RSS feeds that cover the same ground, and drops sources that only duplicate what is already covered. The owner walks each cold desk after it builds and fixes nothing by hand. Open: whether the ~10 pilot desks consume the landing page's monthly cap of 10 new desks, or sit outside it.
- **Push ingest:** X posts arrive by push through X Activity API webhooks, around 1,500 watched accounts at $0.005 per delivered post. Feeds the cost guard.
- **Trial and payment ask:** 7 days after activation, a payment-ask DM goes out. Stripe pages ship in a follow-up once the owner completes the terms-acceptance step; the trial gating and the ask are live. Feeds H3.
- **Removed:** drafting, voice, posting, searching, filtration UI, clustering.
- **Run guards:** cold names written into 3.2 before day zero; no desk is ever hand-touched; any outreach re-send goes only to already-named people.
- **Parking lot (asked or proposed, not in this run):** automatic source suggestions (Reshad's clarified "recommended"), user-adjustable filtration that learns (Nihan), thread-style drafting and GitHub (Liam), Slack alerts (founder-proposed, unvalidated).

## 5. Results

*Raw numbers only, one line per metric in 3.1, filled after the run. No reading of them here.*

Filled after the run.

## 6. Verdict

*One line per hypothesis: validated, disproved, or unreadable (launch failure), with the number that decided it. Then one paragraph on what changes: persevere, pivot on segment, pivot on delivery, or kill. The attribution rule in 2.2 governs how far a negative result reaches.*

Filled after the run.
