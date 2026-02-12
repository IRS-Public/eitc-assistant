import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { animateScroll } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptop, faFileSignature, faUserFriends, faFileExport, faPrint } from '@fortawesome/free-solid-svg-icons'
import { isArray } from 'lodash'
import SiteContext from '../../context/Site/SiteContext'
import { gaPageView, gaEvent, formatMoney } from '../../helpers'
import routes from '../../templates/helpers/routes'
import credit from '../../calculations/eitc/credit'
import summary from '../../calculations/results/summary'
import Alert from '../../components/Alert'
import Button from '../../components/Button'
import Heading from '../../components/Heading'
import HtmlBuilder from '../../components/HtmlBuilder'
import Link from '../../components/Link'
import NavButtons from '../../components/NavButtons/NavButtons'
import { PaperHTML, AmendedHTML } from './Structure/AlertsHtml'
import calcAgiForEitc from '../../calculations/agi/calcAgiForEitc'
import fsCalc from '../filingStatus/Form/helpers/fsCalc'
import StartOver from './helpers/StartOver'
import disqualifiers from '../agi/Validation/disqualifiers'

const Results = () => {
  const router = useRouter()

  const { site, lang, langCode } = useContext(SiteContext)
  const { year } = site.forms.generalInfo.values
  const { numOfDependents } = site.forms.qualifyingChildren.values
  const [final, setFinal] = useState(0)
  const { agi, earned, deductions } = calcAgiForEitc(site.forms.agi.values)
  const finalAgi = agi || ''
  const fsValues = site.forms.filingStatus.values
  const filingStatus = fsCalc(fsValues) || ''
  const dq = disqualifiers(site.forms.agi.values, numOfDependents, filingStatus, year)

  const resultsText = () => {
    const items = summary(site, site.forms, lang, numOfDependents)

    return items.map((item, index) => (
      <div
        key={index}
        className={clsx(
          'flex flex-col lg:flex-row w-full border-b border-gray-500 py-2 fade-in',
        )}
      >
        <div
          className={clsx(
            'w-1/2 font-bold',
            item.indent ? 'ml-8' : 'ml-4',
          )}
          data-testid={`${item.label}Label`}
        >
          {item.label !== '' && lang(`results.label.${item.label}`)}
        </div>

        <div
          className={clsx(
            'w-full',
            item.indent ? 'lg:-ml-4 ml-8 ie-col' : 'lg:ml-0 ml-4'
          )}
          data-testid={`${item.dataTestId}-resultTable`}
        >
          {item.value && typeof item.value === 'string' && lang(item.value)}
          {item.value && typeof item.value === 'object' && lang(item.value[0], { ':num': lang(item.value[1]) })}
        </div>

        <div className="">
          <button
            onClick={() => router.push(routes(langCode, 'eitc')[item.edit], undefined, { shallow: true })}
            className={clsx(
              'text-blue-500 underline mt-0 lg:mt-3 startOverBtn',
              item.indent ? 'ml-8 lg:ml-0' : 'ml-4 lg:ml-0'
            )}
            type="button"
            aria-label={`Edit ${lang(item.ariaLabel)}`}
            data-testid={isArray(item.value) ? `${item.value[0].split('.')[2]}-edit` : `${item.label}-edit`}
          >
            {lang('results.a.edit')}
          </button>
        </div>
      </div>
    ))
  }

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 })

    langCode === 'en'
      ? gaPageView('/app/eitc/results/', 'EITC - Results | Internal Revenue Service')
      : gaPageView(`/app/eitc/results/${langCode}/`, 'EITC - Results | Internal Revenue Service')
  }, [])

  useEffect(() => {
    const finalEarned = earned || ''
    const finalDeductions = deductions || ''
    const finalValue = finalEarned - finalDeductions < 0 ? 0 : finalEarned - finalDeductions


    if (filingStatus && finalValue) {
      const creditAGI = credit(year, numOfDependents === '' ? 0 : numOfDependents, filingStatus, finalAgi)
      const creditEI = credit(year, numOfDependents === '' ? 0 : numOfDependents, filingStatus, finalValue)
      setFinal(creditAGI < creditEI ? creditAGI : creditEI)
    }
  }, [site.forms.filingStatus, site.forms.generalInfo, finalAgi, site.forms.children])

  return (
    <div className={clsx('w-full mt-2 fade-in')}>
      <Heading
        className="mt-4 mb-2 text-2xl font-bold"
        level="2"
        data-testid="resultsTitle"
      >
        {lang('results.h2.heading')}
      </Heading>

      {(!site.forms.generalInfo.completed
        || !site.forms.filingStatus.completed
        || !site.forms.agi.completed
        || !site.forms.qualifyingChildren.completed) && (
          <Alert
            id="resultsSkipAheadWarning"
            title={lang('global.heading.attention')}
            type="warning"
            gaLabel={lang('Results Skip Ahead Warning')}
          >
            <p>{lang('results.p.previousMessage')}</p>
          </Alert>
        )}

      {site.forms.generalInfo.completed
        && site.forms.filingStatus.completed
        && site.forms.agi.completed
        && site.forms.qualifyingChildren.completed && (
          <>
            {dq.earned === true || dq.agi === true ?
              <Alert
                id="resultsNotQualifyingWarning"
                title={lang('results.heading.eitcNoQualify')}
                type="warning"
                gaLabel="Results You Do Not Qualify For EITC"
              >
                <p>{lang('results.p.eitcNoQualify1')}</p>
                <HtmlBuilder elements={
                  [
                    {
                      key: 'p1',
                      type: 'Paragraph',
                      text: 'results.p.eitcNoQualify2',
                      className: 'mt-2',
                      dataTestID: 'resultsNotQualifyingParagraph2',
                      replacements: [
                        {
                          type: 'bold',
                          key: ':note',
                          text: 'results.p.eitcNoQualify2Replacement1'
                        },
                        {
                          type: 'link',
                          key: ':link',
                          href: 'https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/earned-income-and-earned-income-tax-credit-eitc-tables',
                          external: true,
                          text: 'results.p.eitcNoQualify2Replacement2'
                        }
                      ]
                    },
                  ]
                }
                />
              </Alert>
              :
              <>
                <div className="mt-5">
                  <p className="text-lg mb-4" data-testid="resultsIntro-p1">
                    {lang('results.p.introTop')} <span className="font-bold" data-testid="total">{formatMoney(final)}*</span>
                  </p>

                  <p data-testid="resultsIntro-p2">{lang('results.p.introTop2', { ':year': year })}</p>
                </div>

                <Heading
                  className="mt-4 mb-2 text-2xl font-bold"
                  level="2"
                  data-testid="resultsNextSteps-heading"
                >
                  {lang('results.h2.nextSteps')}
                </Heading>

                <p className="mb-4" data-testid="resultsNextSteps-subtitle">
                  {lang('results.p.secondIntro', { ':amount': formatMoney(final), ':year1': year, ':year2': parseInt(year) + 1 })}
                </p>

                <div className="grid grid-cols-4 gap-4 auto-rows-auto" id="resultsCardFlexContainer">
                  <div id="onlineCard" className="col-span-4 md:col-span-2 lg:col-span-1 border-gray-600 border py-6 w-full mr-5 flex flex-col mb-4 lg:mb-0">
                    <div className="flex flex-grow">
                      <div className="mx-6">
                        <Heading className="mb-4 text-lg font-bold" level="3" data-testid="onlineHeading">
                          <FontAwesomeIcon
                            className={clsx(
                              'text-black mr-1',
                            )}
                            icon={faLaptop}
                            style={{ fontSize: '1.2rem', width: '1em',
                        height: '1em' }}
                          />
                          {lang('results.h3.online')}
                        </Heading>
                        <p className="mb-8" data-testid="onlineContent">{lang('results.p.online')}</p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Link
                        className="button rounded md:w-full mx-6"
                        href={langCode && langCode !== 'en'
                          ? `https://www.irs.gov/${langCode}/filing/free-file-do-your-federal-taxes-for-free`
                          : 'https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free'
                        }
                        external
                        onClick={() => gaEvent('EITC', 'How to File - EITC', 'Click', 'File Online Now')}
                        ariaLabel={lang('results.button.fileNow')}
                        data-testid="onlineButton"
                      >
                        {lang('results.button.fileNow')}
                      </Link>
                    </div>
                  </div>

                  <div id="inPersonCard" className="col-span-4 md:col-span-2  lg:col-span-1 border-gray-600 border py-6 w-full lg:mr-5 flex flex-col mb-4 lg:mb-0">
                    <div className="flex flex-grow">
                      <div className="mx-6">
                        <Heading className="mb-4 text-lg font-bold" level="3" data-testid="inPersonHeading">
                          <FontAwesomeIcon
                            className={clsx(
                              'text-black mr-1',
                            )}
                            icon={faUserFriends}
                            style={{ fontSize: '1.2rem', width: '1em',
                        height: '1em' }}
                          />
                          {lang('results.h3.person')}
                        </Heading>
                        <p className="mb-8" data-testid="inPersonContent">{lang('results.p.person')}</p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Link
                        className="button rounded md:w-full mx-6"
                        href={langCode && langCode !== 'en'
                          ? `https://www.irs.gov/${langCode}/individuals/free-tax-return-preparation-for-you-by-volunteers`
                          : 'https://www.irs.gov/individuals/free-tax-return-preparation-for-you-by-volunteers'
                        }
                        external
                        onClick={() => gaEvent('EITC', 'How to File - EITC', 'Click', 'Free In-Person Help')}
                        ariaLabel={lang('results.button.person')}
                        data-testid="inPersonButton"
                      >
                        {lang('results.button.person')}
                      </Link>
                    </div>
                  </div>

                  <div id="paperFormsCard" className="col-span-4 md:col-span-2 lg:col-span-1 border-gray-600 border py-6 w-full mr-5 flex flex-col mb-4 lg:mb-0">
                    <div className="flex flex-grow">
                      <div className="mx-6">
                        <Heading className="mb-4 text-lg font-bold" level="3" data-testid="paperFormsHeading">
                          <FontAwesomeIcon
                            className={clsx(
                              'text-black mr-1',
                            )}
                            icon={faFileSignature}
                            style={{ fontSize: '1.2rem', width: '1em',
                        height: '1em' }}
                          />
                          {lang('results.h3.paper')}
                        </Heading>
                        <PaperHTML num={numOfDependents} year={year} lang />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Link
                        className="button rounded md:w-full mx-6"
                        href={langCode && langCode !== 'en'
                          ? `https://www.irs.gov/${langCode}/forms-instructions`
                          : 'https://www.irs.gov/forms-instructions'
                        }
                        external
                        onClick={() => gaEvent('EITC', 'How to File - EITC', 'Click', 'More Paper Forms')}
                        ariaLabel={lang('results.button.paper')}
                        data-testid="paperFormsButton"
                      >
                        {lang('results.button.paper')}
                      </Link>
                    </div>
                  </div>

                  <div id="amendedReturnCard" className="col-span-4 md:col-span-2 lg:col-span-1 border-gray-600 border py-6 w-full mr-0 flex flex-col mb-4 lg:mb-0">
                    <div className="flex flex-grow">
                      <div className="mx-6">
                        <Heading className="mb-4 text-lg font-bold" level="3" data-testid="amendedReturnsHeading">
                          <FontAwesomeIcon
                            className={clsx(
                              'text-black mr-1',
                            )}
                            icon={faFileExport}
                            style={{ fontSize: '1.2rem', width: '1em',
                        height: '1em' }}
                          />
                          {lang('results.h3.amended')}
                        </Heading>
                        <AmendedHTML />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Link
                        className="button rounded md:w-full mx-6"
                        href={langCode && langCode !== 'en'
                          ? `https://www.irs.gov/${langCode}/taxtopics/tc308`
                          : 'https://www.irs.gov/taxtopics/tc308'
                        }
                        external
                        onClick={() => gaEvent('EITC', 'How to File - EITC', 'Click', 'File an Amended Return')}
                        ariaLabel={lang('results.button.amended')}
                        data-testid="amendedReturnButton"
                      >
                        {lang('results.button.amended')}
                      </Link>
                    </div>
                  </div>
                </div>

                <HtmlBuilder elements={
                  [
                    {
                      key: 'resultsImportantNote',
                      type: 'Paragraph',
                      text: 'results.p.importantNote',
                      className: 'my-4 fade-in',
                      dataTestID: 'importantNote',
                      replacements: [
                        {
                          type: 'bold',
                          key: ':bold',
                          text: 'results.span.importantNote',
                          dataTestID: 'importantNoteBold',
                        }
                      ]
                    },
                  ]
                }
                />
              </>
            }

            <Heading className="mt-6 mb-2 text-2xl font-bold" level="2" data-testid="summaryHeading">{lang('results.h2.summary')}</Heading>

            <p className="mb-4" data-testid="resultsTableSubtitle">{lang('results.p.summary')}</p>

            <div className="w-full flex flex-col justify-center items-center mt-4">
              {resultsText()}
            </div>
            <div>
            <br/> {lang('results.note1')}
            <a 
            href={langCode && langCode !== 'en'
                  ? `https://www.irs.gov/${langCode}/help/irs2goapp`
                  : 'https://www.irs.gov/help/irs2goapp'} 
                  style={{color: '#2B547E'}}>
            <u>{lang('results.note2')}</u>
            </a>  
            {lang('results.note3')}
            </div>
            <NavButtons
              backOnclick={() => router.push(routes(langCode, 'eitc').qualifyingChildren, undefined, { shallow: true })}
              backText={lang('global.button.back')}
              backOnly
              backClassName="backBtn"
            >
              <Button
                type="button"
                onClick={() => {
                  window.print()
                }}
                data-testid="printButton"
                className="mr-0 sm:mr-3 mb-5 sm:mb-0 printBtn"
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faPrint}
                  style={{
                    width: '1em',
                    height: '1em'
                  }}
                />
                {lang('results.button.print')}
              </Button>
              <div>
                <StartOver />
              </div>
            </NavButtons>
          </>
        )
      }
    </div >
  )
}

export default Results
