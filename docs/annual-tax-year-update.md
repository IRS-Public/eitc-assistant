# Annual Tax Year Updates

This document explains how to add a new tax year to the EITC Assistant and how to retire an old one. It covers the yearly constants files, the tax year selector, the flow text that names specific years, and the translated locale files. It also explains how the EITC Assistant relates to the Tax Withholding Estimator (TWE) and how to use TWE as a source for new values.

In this document, `YYYY` stands for the tax year that you are adding, and `PPPP` stands for the most recent tax year that the EITC Assistant already supports. For example, if you are adding 2027, then `YYYY` is 2027 and `PPPP` is 2026.

## How the EITC Assistant relates to TWE

The EITC Assistant and TWE are both IRS applications built on the [Fact Graph](https://github.com/IRS-Public/fact-graph). Both applications describe tax law in fact dictionary XML files that use the same schema. Many of the tax constants that the EITC Assistant needs also exist in TWE, and most of them have the same fact names in both applications.

The two applications handle tax years in different ways.

- TWE helps people estimate their withholding for the calendar year in progress. For that reason, TWE supports one tax year at a time. TWE keeps each yearly value inside the topical file that uses it, such as `eitc.xml` or `adjustments.xml`, and it marks the value with a `<TaxYear>` element. When TWE moves to a new tax year, its maintainers overwrite those values in place.
- The EITC Assistant helps people check their eligibility for a return that they file after the tax year ends. It lets them choose from the last 3 tax years, because claiming EITC through an amended return goes back that far. For that reason, the EITC Assistant keeps one `constantsYYYY.xml` file for each tax year, and `constants.xml` selects the values for the year that the user chose.

Because TWE serves the year in progress, TWE adopts a tax year's values a year before the EITC Assistant needs them. This timing makes TWE the most convenient place to find the values for a new `constantsYYYY.xml` file. At the time of this writing, both applications contain the 2026 values, and the 2026 values in TWE match the values in `constants2026.xml`.

The IRS publications are the authoritative source for every value. Before you copy a value from TWE, check two things.

1. Confirm that the `<TaxYear>` element on the TWE fact matches the year that you are adding.
2. Confirm the value against the IRS publication that sets it. The section titled "Sources for the yearly values" lists those publications.

If you need a value from a year that TWE has already moved past, look in the TWE git history. TWE overwrites its values in place, so the history holds every earlier value. The following command shows each change to the TWE EITC facts, including the `<TaxYear>` tags:

```sh
git -C path/to/tax-withholding-estimator log -p -- src/main/resources/twe/facts/eitc.xml
```

## Where the yearly values live

### Fact files in the EITC Assistant

All fact files are in `src/main/resources/credit-assistant/facts/`. The application loads every `.xml` file in that directory, so you do not need to register a new `constantsYYYY.xml` file anywhere.

The file `constantsYYYY.xml` holds the values for a single tax year. Every fact path in the file ends with the year, such as `/eitcInvestmentIncomeLimit2026`, and every fact carries a `<TaxYear>` element.

The file `constants.xml` holds the tax year selector and the facts that the rest of the application reads. It contains the following facts:

- `/taxYearOptions` lists the years that a user can select.
- `/chosenTaxYear` stores the year that the user selected.
- `/taxYear` converts the selection into an integer.
- `/isTaxYearYYYY` is a true or false predicate. The file has one predicate for each supported year.
- Each year-switched fact, such as `/eitcInvestmentIncomeLimit`, contains a `Switch` with one `Case` for each supported year. Each case points to the matching fact in a `constantsYYYY.xml` file.

The rest of the fact dictionary and the flow read the unsuffixed facts in `constants.xml`. They do not read a `constantsYYYY.xml` fact directly.

Some facts in `constants.xml` use one fixed value for every year. These facts are `/maxNumberOfEitcQcs`, `/seIncomeThreshold`, `/socialSecuritySelfEmploymentTaxPortion`, `/medicareSelfEmploymentTaxPortion`, `/selfEmploymentTaxDeductionMultiplier`, `/percentageOfSEIncomeSubjectToTax`, and `/maxStudentLoanDeduction`. Each `constantsYYYY.xml` file contains yearly copies of the last six facts, but no other fact reads those copies. If one of these values changes for a new year, convert the fact in `constants.xml` into a year switch that follows the same pattern as the other year-switched facts.

### Fact mapping between the EITC Assistant and TWE

The following table lists each value in `constantsYYYY.xml` and the TWE fact that holds the same value. The EITC Assistant names appear without the year suffix. The TWE file names are relative to `src/main/resources/twe/facts/` in the TWE repository.

| EITC Assistant fact | TWE file and fact | Notes |
|---|---|---|
| `/eitcMfjLimitWithZeroChildren`, `/eitcMfjLimitWithOneChild`, `/eitcMfjLimitWithTwoChildren`, `/eitcMfjLimitWithThreeOrMoreChildren` | `eitc.xml`, with the same names | The names match. |
| `/eitcSelfLimitWithZeroChildren`, `/eitcSelfLimitWithOneChild`, `/eitcSelfLimitWithTwoChildren`, `/eitcSelfLimitWithThreeOrMoreChildren` | `eitc.xml`, with the same names | The names match. |
| `/phaseInEndsFor0QualifyingChildren`, `/phaseInEndsFor1QualifyingChild`, `/phaseInEndsFor2OrMoreQualifyingChildren` | `eitc.xml`, with the same names | The names match. |
| `/phaseInRatesFor0Qc`, `/phaseInRatesFor1Qc`, `/phaseInRatesFor2Qc`, `/phaseInRatesFor3OrMoreQc` | `eitc.xml`, with the same names | The names match. |
| `/eitcPhaseOutRate0QC`, `/eitcPhaseOutRate1QC`, `/eitcPhaseOutRate2OrMoreQC` | `eitc.xml`, `/eitcPhaseOutRate` | TWE stores all three rates as cases in one fact. Copy the rate for zero, one, and two or more qualifying children into the matching EITC Assistant fact. |
| `/eitcPhaseOutThreshold0QCNonMFJ`, `/eitcPhaseOutThreshold1OrMoreQCNonMFJ`, `/eitcPhaseOutThreshold0QCMFJ`, `/eitcPhaseOutThreshold1OrMoreQCMFJ` | `eitc.xml`, `/eitcPhaseOutThreshold` | TWE stores all four thresholds inside one fact. The first outer case covers filers who do not file jointly, and the second outer case covers married filing jointly. Within each outer case, the first inner case applies to zero qualifying children and the second inner case applies to one or more. |
| `/eitcPhaseOutThreshold` | None | This fact selects one of the four threshold facts in the previous row. It holds no value of its own, so it only needs the new year suffix. |
| `/eitcInvestmentIncomeLimit` | `eitc.xml`, with the same name | The names match. |
| `/eitcGrossIncomeLimitForQualifyingRelative` | `ctcOdc.xml`, `/odcDependentGrossIncomeThreshold` | The value equals the exemption amount under IRC §151(d). Check the TWE `<TaxYear>` tag with care, because this TWE fact has lagged behind the rest of TWE. |
| `/maxStudentLoanDeduction`, `/maxIncomeForStudentLoanInterestDeduction`, `/studentLoanPhaseOutStart` | `studentLoanInterestDeduction.xml`, with the same names | The names match. The last two facts have one value for married filing jointly and another value for all other filers. |
| `/maxEducatorExpensesMFJ` | `educatorExpenseAdjustment.xml`, `/maxEducatorExpensesMFJ` | The names match. |
| `/maxEducatorExpensesNonMFJ` | `educatorExpenseAdjustment.xml`, `/maxEducatorExpensesNotMFJ` | The names differ. TWE uses "Not" where the EITC Assistant uses "Non". |
| `/deductionForTraditionalIRAContributionMax` | `adjustments.xml`, with the same name | The names match. The value covers two filers, as the fact description explains. |
| `/hsaTotalDeductibleAmountMax` | `adjustments.xml`, with the same name | The names match. |
| `/maxIncomeSubjectToSocialSecurityTax` | `taxCalculations.xml`, with the same name | The names match. |
| `/seIncomeThreshold`, `/socialSecuritySelfEmploymentTaxPortion`, `/medicareSelfEmploymentTaxPortion`, `/selfEmploymentTaxDeductionMultiplier`, `/percentageOfSEIncomeSubjectToTax` | `selfEmployment.xml`, with the same names | The names match. No other fact in the EITC Assistant reads the yearly copies of these facts. |

### Sources for the yearly values

Use the following sources to confirm each value.

- The IRS publishes most inflation-adjusted amounts in an annual Revenue Procedure. The IRS usually releases it in October or November of the year before the tax year. This Revenue Procedure covers the EITC amounts and thresholds, the EITC investment income limit, the student loan interest phase-out amounts, and the exemption amount under IRC §151(d).
- The IRS announces the traditional IRA contribution limits in an annual notice about retirement plan limits.
- The IRS publishes the health savings account and high deductible health plan amounts in a separate Revenue Procedure. The IRS usually releases it in the spring of the year before the tax year.
- The Social Security Administration publishes the maximum earnings subject to Social Security tax on its [contribution and benefit base page](https://www.ssa.gov/oact/cola/cbb.html).
- IRC §32(b) sets the EITC phase-in rates and phase-out rates. These rates change only when Congress changes the law.

For any other value, use the source that the fact description cites. If the description cites no source, use the IRS instructions for the form that uses the value.

## Adding a new tax year

Complete the following steps in order. Each command runs from the root of the EITC Assistant repository unless the step says otherwise.

### Step 1: Create the yearly constants file

Copy the most recent yearly file, and change the year suffix on every fact path and every `<TaxYear>` element. Run the following command from `src/main/resources/credit-assistant/facts/`:

```sh
sed -E 's/([A-Za-z])PPPP"/\1YYYY"/g; s#<TaxYear>PPPP</TaxYear>#<TaxYear>YYYY</TaxYear>#g' constantsPPPP.xml > constantsYYYY.xml
```

The command does not change description text. After you run it, search the new file for the previous year and update any description that names that year.

### Step 2: Update the values

Update every value in `constantsYYYY.xml`. Use the mapping table to find each value in TWE, confirm the TWE `<TaxYear>` tag, and confirm the value against its IRS source. Any value that you do not change will keep the previous year's amount, and no test can detect that mistake. For this reason, review every fact in the file.

### Step 3: Connect the new year in `constants.xml`

1. Add `<String>YYYY</String>` to the top of `/taxYearOptions`.
2. Add a case to `/taxYear` that maps the `YYYY` option to `<Int>YYYY</Int>`.
3. Add an `/isTaxYearYYYY` predicate. You can copy the `/isTaxYearPPPP` fact and change the year.
4. Add a case for `/isTaxYearYYYY` to every year-switched fact. Each new case points to the fact with the `YYYY` suffix. The command `grep -n "isTaxYearPPPP" src/main/resources/credit-assistant/facts/constants.xml` lists every switch that needs a new case.
5. If one of the fixed facts changes value for the new year, convert that fact into a year switch.

### Step 4: Move the widowed spouse predicates forward

The file `predicates.xml` contains three facts that compare `/chosenTaxYear` to a specific year. The fact `/isWidowedAndCurrentTaxYear` uses the newest offered year. The fact `/isWidowedAndLastTaxYear` uses the year before it. The fact `/isWidowedAndTwoTaxYearsAgo` uses the year two years before it. Move each comparison forward by one year.

These predicates assume that the selector offers exactly three consecutive years. If the selector will offer a different number of years, the flow will need a different number of predicates and spouse death questions.

### Step 5: Update the flow pages

The flow pages are in `src/main/resources/credit-assistant/flow/`.

1. In `about-you.xml`, add `YYYY` to the options for `/chosenTaxYear`. Then add a line for `YYYY` to the list in the `modal-tax-year` dialog.
2. In `filing-status.xml`, move every year in the three `/yearOfSpouseDeath...IsChosen` questions forward by one year. These option labels contain literal years, so the build cannot update them for you.
3. Search the flow for other literal years with `grep -rn "20[0-9][0-9]" src/main/resources/credit-assistant/flow/`. Some body text names a year directly. At the time of this writing, `agi.xml` and `qualifying-children.xml` each contained the year 2025 in body text. Decide whether each of these years should change, or replace the year with `<fg-show path="/taxYear"/>`. Do not change the years inside IRS publication links, because those years are part of the link anchors.

### Step 6: Regenerate and update the locale files

Run `make credit-assistant`. The build rewrites `src/main/resources/credit-assistant/locales/flow_en.yaml` from the flow XML. Do not edit that file by hand. Use `git diff` to compare the new file with the previous version.

Some locale keys are fact paths or option values, and those keys do not change. Other keys, such as `li-28dd34`, are the first six characters of an MD5 hash of the English text. When the English text changes, its key changes too. Every changed key in the `flow_en.yaml` diff must also change in the seven translated files: `flow_es.yaml`, `flow_ht.yaml`, `flow_ko.yaml`, `flow_ru.yaml`, `flow_vi.yaml`, `flow_zh-hans.yaml`, and `flow_zh-hant.yaml`.

Make the following changes in each translated file.

1. Under `/chosenTaxYear`, add the `'YYYY'` option.
2. Under `modal-tax-year`, add the new list item. Copy its key from `flow_en.yaml`. For example, the English text "2026, select 2026" has the key `li-97ee5c`. Write the translated text in the same pattern as the existing lines in that file.
3. Under the three `/yearOfSpouseDeath...IsChosen` keys, move each year forward by one. Some translations already show the current year with `<fg-show path="/taxYear"/>`, and those labels need no change.
4. If you renamed a fact that appears inside flow text, rename the key of that text in each translated file. Then update the fact path inside the translated text.

### Step 7: Verify the change

1. Run `make validate-xml` to check every fact file against the schema.
2. Run `make test` to run the test suite and the Scala formatting check. `TaxYearConstantsSpec` confirms that every offered year resolves through `/taxYear`, that every offered year has an `/isTaxYearYYYY` predicate, and that every year-switched fact has exactly one case for each offered year. `YamlValidatorSpec` confirms that every translated locale file has the same keys as `flow_en.yaml`.
3. Run `make ci` to run the full set of local checks.
4. Run `make dev`, select the new year, and confirm that the application shows the new values. The "Who can I claim as a dependent?" dialog on the filing status page shows `/eitcGrossIncomeLimitForQualifyingRelative`, so it offers a quick way to check one new value.

## Retiring a tax year

When users should no longer be able to select a year, remove the year from the selector and from every switch, and keep its constants file in the repository.

1. Remove the year from `/taxYearOptions`, and remove its case from `/taxYear`.
2. Remove the `/isTaxYearYYYY` predicate for the retired year.
3. Remove the case for the retired year from every year-switched fact in `constants.xml`. `TaxYearConstantsSpec` fails if a case remains for a year that the selector does not offer.
4. Remove the year from the options in `about-you.xml` and from the `modal-tax-year` list. Then rebuild, and remove the matching keys from every translated locale file.
5. Keep the `constantsYYYY.xml` file. The fact dictionary still loads the file, but no other fact reads it.

Retire the oldest year in the same change that adds a new year. This practice keeps three consecutive years in the selector, which the widowed spouse questions require.

## Record of the 2026 update

In October 2026, the EITC Assistant made 2026 selectable and retired 2023. The change included the following work.

- The selector now offers 2026, 2025, and 2024. The file `constants2023.xml` remains in the repository, but no fact reads it.
- Every year switch in `constants.xml` now has cases for 2024, 2025, and 2026. The 2023 cases and the `/isTaxYear2023` predicate were removed.
- The file `constants.xml` had defined `/maxIncomeForStudentLoanInterestDeduction` twice with identical content. The duplicate was removed.
- The fact `/eitcChildGrossIncomeLimit` was renamed to `/eitcGrossIncomeLimitForQualifyingRelative`, and each yearly fact was renamed to match. The 2026 value of $5,300 was added to `constants2026.xml`, and the switch gained a 2026 case.
- The widowed spouse predicates, the spouse death question labels, and the tax year dialog moved forward by one year in the flow and in all eight locale files.
- The spec `TaxYearConstantsSpec` was added to detect a missing or extra year case.
