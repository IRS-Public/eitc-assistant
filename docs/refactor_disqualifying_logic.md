Here are practical ways to make these rules and paths easier to own, without rewriting the whole product in one shot.

1. Name intermediate derived facts (composition)
`/isDisqualifiedMarriedNotFilingJointly` is implemented as `<Any>` of smaller derived facts in `filingStatus.xml` (prefix `/isDisqualified…`). Shared predicate `/isFilingStatusMFSOrHOH` in `predicates.xml` consolidates the former duplicate MFS vs HOH “spouse did not live” branches.

| Path | Role |
|------|------|
| `/isDisqualifiedFlowSeparationTestNotMarriedLivedNotSeparated` | Separation-test flow, not married, lived, not separated |
| `/isDisqualifiedHohMarriedLivedTogetherNotSeparatedNoQcs` | Initial HOH+married, lived, not separated, no EITC QCs |
| `/isDisqualifiedMfsLivedNotSeparatedNoQcs` | MFS, lived, not separated, no EITC QCs |
| `/isDisqualifiedMfsSameResidenceNotSeparated` | MFS, same residence, lived, not separated |
| `/isDisqualifiedInitialMfsLivedNotSeparated` | Initial MFS, lived, not separated |
| `/isDisqualifiedHohMarriedLivedTogetherNotSeparated` | HOH married, lived, not separated |
| `/isDisqualifiedMarriedNotMfjSameResidenceSeparatedNoQcs` | Married not MFJ, same residence, separated, no QCs |
| `/isDisqualifiedWidowedNotJointlySameResidenceSeparatedNoQcs` | Widow path: not jointly, same residence, separated, no QCs |
| `/isDisqualifiedWidowedNotJointlyDifferentResidenceNoQcs` | Widow path: not jointly, different residence, no QCs |
| `/isDisqualifiedMfsDifferentResidenceNoQcs` | MFS, different principal residence (complete), no QCs |
| `/isDisqualifiedMfsOrHohSpouseDidNotLiveNoQcs` | MFS or HOH, spouse did not live (complete), no QCs |
| `/isDisqualifiedHohMarriedSeparatedNoQcs` | HOH married, lived, separated, no QCs |
| `/isDisqualifiedInitialAndFilingMfsSeparatedNoQcs` | Initial + derived MFS, lived, separated, no QCs |

Keep the decision table (`docs/eitc_marriage_ko_decision_table.csv`) aligned with which sub-fact owns each row.

2. Keep a single “decision table” outside the XML
Maintain a short markdown or spreadsheet that columns: path (knows FS?, MFS/HOH, spouse lived, same residence, separation, QCs) → should disqualify? → which sub-fact. The XML should trace 1:1 to that table. When product/legal disagrees, you edit the table first, then the facts.

3. Separate “rule truth” from “flow visibility”
Your pain (e.g. Scenario 11) mixes eligibility with which questions appear. Split the work:

Rules: derived facts that depend only on completed answers.
Flow: flowShouldSee* predicates that control order and skipping; ideally driven by “what is still unknown?” not by ad-hoc copies of the same conditions.
That makes “moot question” fixes flow changes, not changes inside the disqualification <Any>.

4. Scenario tests as the contract
You already have concrete scenarios (1–12). Encode them as automated scenarios (the project’s existing Scenario / spreadsheet / test harness) so any change to isDisqualifiedMarriedNotFilingJointly must pass those rows. The table becomes executable and stops regressions.

5. Reduce duplication with shared building blocks
Facts like “MFS for EITC separation test” or “married and not filing joint” appear in multiple branches. Extract:

Predicates reused across flowShouldSee* and disqualified facts (single definition of “treat as MFS for this purpose” if not already /treatAsMFS).
That avoids the second branch drifting from the first.

6. Document incompleteness explicitly
If a rule depends on /writableSeparationAgreement but the question is not always shown, add a derived fact like /separationAgreementApplicableAndFalse or use IsComplete in the rule so “unknown” does not silently count as false. That belongs in design, not scattered across branches.

7. Optional longer-term: table- or case-driven generation
If the <Any> list keeps growing, some teams move eligibility to a structured table (CSV/YAML) and generate XML or a small evaluator—but that is only worth it once the named sub-facts approach still feels heavy.

Pragmatic order: (1) named sub-facts + (2) decision table + (4) scenario tests gives most of the manageability; (3) fixes UX “moot questions”; (5)–(6) harden against drift and subtle bugs.


Gaps that usually need new <All> blocks
Need	Rows	Why existing branches miss them
A
1 (and 8 if same res = no)
MFS + lived + Not same principal residence + not separated + no QCs: 607–614 requires same = true; 597–606 has no “different residence” term.
B
2, 9
MFS + Not spouse lived + no QCs: every current branch that uses MFS either assumes spouse lived true or is a different story.
C
3, 10
HOH + Not spouse lived + no QCs: 622–628 requires spouse lived true. Derive-HOH (3) may not set /isHOHMarried; pick-HOH (10) does—might be one branch (isFilingStatusHOH + …) or two if you must distinguish writable isHOHMarried.
D
7
Pick MFS + lived + separation yes + no QCs: 629–640 wants /isMarried; on knows FS = yes that may be incomplete/false, so you may need a branch using isInitialFilingStatusMFS or isFilingStatusMFS plus separation + no QCs.
E
12
Pick HOH + lived + separation yes + no QCs: might be covered by 629–640 if /isMarried + same residence + separation all hold; if same residence isn’t asked or /isMarried fails on that path, you need an HOH-specific <All>.
Count
Minimum (aggressive merge): about 3 new <All> blocks — e.g. A, B (covers 2+9), C (covers 3+10 if one HOH predicate works for both), then fold 7 into an extended D or widen 6’s pattern only if predicates align.
Typical (safer): about 4–5 new <All> blocks — separate A, B, C (or split HOH derive vs pick), D for pick-MFS + separation + no QCs, and optionally E for 12 if 629–640 doesn’t fire.
Maximum (one branch per row, no sharing): up to ~6 for rows 1,2,3,7,9,10,12 minus overlaps (still not 10 rows because 5/6/8 overlap existing logic).
So: plan on roughly 4–5 new branches; 3 if you merge aggressively and verify predicate coverage; 6 if pick vs derive and HOH paths need separate clauses.