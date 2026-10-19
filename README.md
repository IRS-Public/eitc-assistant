# Earned Income Tax Credit (EITC) Assistant

## Overview
### EITC Assistant
The EITC Assistant is an online tool provided by the Internal Revenue Service (IRS) to help taxpayers determine whether they are eligible for the [Earned Income Tax Credit (EITC)](https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc) and, if so, estimate the amount of the credit. By guiding users through the relevant questions and rules, it can reduce common errors, improve claim accuracy, and help taxpayers better understand the basis for their eligibility and credit calculation.

This codebase is actively maintained and reflects the version of the EITC Assistant that went live on April 29, 2026. Releases starting with v26.1.1 use the [Fact-Graph](https://github.com/IRS-Public/fact-graph) to model the Internal Revenue Code, following similar projects like the [Tax Withholding Estimator](https://github.com/IRS-Public/tax-withholding-estimator) and [Direct File](https://github.com/IRS-Public/direct-file). Prior versions of the application using an imperative, Javascript approach can be seen in the first few commits in this repository.    

### EITC
EITC is a refundable federal tax credit for workers and families with low to moderate income. If a taxpayer qualifies, the credit can reduce the taxes they owe and may increase their refund. Eligibility depends on many factors including earned income, adjusted gross income, filing status, investment income, Social Security number requirements, and whether the taxpayer has qualifying children. Taxpayers without qualifying children may also qualify if they meet the applicable rules.

EITC eligibility and credit calculations are complex. If a taxpayer improperly claims EITC, the IRS may delay the refund, [deny all or part of the credit](https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/what-to-do-if-we-deny-your-claim-for-a-credit), and/or [audit the return](https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/common-errors-for-the-earned-income-tax-credit-eitc). In more serious cases, the IRS may bar a taxpayer from claiming EITC for 2 years if the claim was due to intentional disregard of the rules, or for 10 years if the claim was due to fraud. After a prior disallowance, a taxpayer may also need to file [Form 8862](https://www.irs.gov/instructions/i8862) before claiming the credit again. 

For more information about EITC, see [Publication 596](https://www.irs.gov/publications/p596).

### Contributing
Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

This codebase is dedicated to the public domain under the [Creative Commons Zero v1.0 Universal](LICENSE.md) license (CC0 1.0).

## Legal Disclaimer: Public Repository Access

> This repository contains draft and under-development source code for the IRS EITC Assistant. It is made available to the public solely for transparency, collaboration, and research purposes. The source code and associated content are not official IRS tools, and must not be used by taxpayers to determine their eligibility for EITC and estimate their credit. 
>
> **No Endorsement or Warranty**
>
> IRS does not endorse, maintain, or guarantee the accuracy, completeness, or functionality of the code in this repository. The IRS assumes no responsibility or liability for any use of the code by external parties, including individuals, developers, or organizations. This includes—but is not limited to—any tax consequences, computation errors, data loss, or other outcomes resulting from the use or modification of this code.
>
> Use of the code in this repository is at your own risk. This repository is not intended for production use or public consumption as a finalized product.


## Setup
- If you are an IRS employee, follow the instructions in the [IRS Onboarding Docs](./docs/onboarding/onboarding-irs.md).
- If you are a developer, follow the instructions in the [IRS Onboarding Docs](./docs/onboarding/onboarding-irs.md).
- If you are not a developer, follow the instructions in the [Non-Dev Onboarding Docs](./docs/onboarding/onboarding-nondev.md).

### Quickstart

1. Install the version of [Scala](https://www.scala-lang.org/download) specified in [build.sbt](./build.sbt) (currently 3.7.2) and [sbt](https://www.scala-sbt.org/1.x/docs/Setup.html).
   You may choose to install these with [Coursier](https://get-coursier.io/), [sdkman](https://sdkman.io/), [asdf](https://asdf-vm.com/), [mise](https://mise.jdx.dev/), or some other method of your choosing.
2. Download the [Fact Graph](https://github.com/IRS-Public/fact-graph) and run `make publish` in that repository
3. Return to this repository and run `make`
4. (Optional) Ensure that you have local installations of `xmllint` (via `libxml2`) and `npx` (via `npm`) command line tools, then run  `make ci-setup` to install the tools required for running the validations; this is useful if you plan to submit a PR.

Additional developer notes and tips for installing LSP integrations and the like can be found in the [Dev Onboarding Docs](./docs/onboarding/onboarding-dev.md).

### Development

Basic development commands are declared via Makefile.

The following commands are particularly useful for most development flows:
* `make` - Build EITC Assistant and start a static file server; automatically rebuild on changes
* `make credit-assistant` - Build and output EITC Assistant/Credit Assistant to the `/out` directory
* `make clean` - Clean all the build artifacts
* `make format` - Format the Scala and XML code
* `make ci` - Run CI checks locally

To see a list of _all_ available commands, run `make help`.


## Authorities
Legal foundations for this work include:
* Source Code Harmonization And Reuse in Information Technology Act" of 2024, Public Law 118 - 187
* OMB Memorandum M-16-21, “Federal Source Code Policy: Achieving Efficiency,
  Transparency, and Innovation through Reusable and Open Source Software,” August 8,
  2016
* Federal Acquisition Regulation (FAR) Part 27 – Patents, Data, and Copyrights
* Digital Government Strategy: “Digital Government: Building a 21st Century Platform to
  Better Serve the American People,” May 23, 2012
* Federal Information Technology Acquisition Reform Act (FITARA), December 2014
  (National Defense Authorization Act for Fiscal Year 2015, Title VIII, Subtitle D)
* E-Government Act of 2002, Public Law 107-347
* Clinger-Cohen Act of 1996, Public Law 104-106
