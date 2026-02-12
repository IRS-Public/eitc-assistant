import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Link from '../Link';
import { createIRSLinkPath } from '../../helpers';
import { CONTAINER_LG } from '../../helpers/constants';
import { TOGGLE_SEARCH, TOGGLE_MENU } from '../../context/types'
import SearchField from '../SearchField';
import HeaderContext from '../../context/Header/HeaderContext';
import LanguageSwitcher from './LangSwitcher';

const HeaderNavItem = ({
  children,
  dataTestId,
  langSwitcherTestId,
  href,
  list,
  type,
  external,
  className,
  icon,
  target,
  irsSite,
  toggleText,
  languageButton,
  inIRSMenu,
  id,
  ...props
}) => {
  const {
    header,
    headerDispatch,
    width,
    toggleSearch,
    toggleMenu,
    lang,
    langCode,
  } = useContext(HeaderContext)
  const router = useRouter()

  const toggle = (value) => {
    headerDispatch({
      type: 'TOGGLE_LANG',
      payload: value,
    });
  };

  const navItemLang = {
    key: 'headerNavItems-3',
    dataTestId: 'languageSwitcher',
    type: 'languageSwitcher',
    text: '',
    list: [
      {
        key: 'headerNavItems-3-1',
        dataTestId: 'englishLink',
        text: 'English',
        langCode: 'en',
        href: '',
        external: true,
      },
      {
        key: 'headerNavItems-3-2',
        dataTestId: 'spanishLink',
        text: 'Español',
        langCode: 'es',
        href: '',
        external: true,
      },
      {
        key: 'headerNavItems-3-3',
        dataTestId: 'chinese1Link',
        text: '中文 (简体)',
        langCode: 'zh-hans',
        href: '',
        external: false,
      },
      {
        key: 'headerNavItems-3-4',
        dataTestId: 'chinese2Link',
        text: '中文 (繁體)',
        langCode: 'zh-hant',
        href: '',
        external: false,
      },
      {
        key: 'headerNavItems-3-5',
        dataTestId: 'koreanLink',
        text: '한국어',
        langCode: 'ko',
        href: '',
        external: false,
      },
      {
        key: 'headerNavItems-3-6',
        dataTestId: 'russianLink',
        text: 'Русский',
        langCode: 'ru',
        href: '',
        external: false,
      },
      {
        key: 'headerNavItems-3-7',
        dataTestId: 'vietnameseLink',
        text: 'Tiếng Việt',
        langCode: 'vi',
        href: '',
        external: false,
      },
      {
        key: 'headerNavItems-3-8',
        dataTestId: 'haitianLink',
        text: 'Kreyòl ayisyen',
        langCode: 'ht',
        href: '',
        external: false,
      },
    ],
  };

  const langText = {
    en: 'English',
    es: 'Español',
    'zh-hans': '中文 (简体)',
    'zh-hant': '中文 (繁體)',
    ko: '한국어',
    ru: 'Русский',
    vi: 'Tiếng Việt',
    ht: 'Kreyòl ayisyen',
  };

  const switchLanguage = (currentLang) => {
    let updatedList = null;
    const { headerNavItems } = header;

    navItemLang.list.forEach((item, index) => {
      if (item.langCode === currentLang) {
        updatedList = navItemLang.list.splice(index, 1);
      }
    });

    navItemLang.list.forEach((item, index) => {
      const updatedPathname = () => {
        const pathArray = router.pathname.split('/');
        let pathname = null;

        if (item.langCode === 'en') {
          pathArray.splice(-1, 1);
          pathname = `${pathArray.join('/')}`;
        } else {
          if (currentLang !== 'en') {
            pathArray.pop();
          }
          pathname = `${pathArray.join('/')}/${item.langCode}`;
        }

        return pathname;
      };

      navItemLang.list[index].href = `${updatedPathname()}`;
    });

    navItemLang.text = updatedList[0].text;

    headerNavItems[2] = navItemLang;

    const newParams = {
      ...header.params,
      location: {
        ...header.params.location,
        langCode: currentLang,
      },
    };

    headerDispatch({
      type: 'UPDATE_PARAMS',
      payload: newParams,
    });

    headerDispatch({
      type: 'UPDATE_HEADER_NAV_ITEMS',
      payload: headerNavItems,
    });
  };

  const formAction
    = langCode === 'en' || langCode === undefined
      ? `https://www.irs.gov${header.search.action}`
      : `https://www.irs.gov/${langCode}${header.search.action}`;

  const formPlaceholder
    = langCode === 'en' || langCode === undefined
      ? header.search.placeholder.en
      : header.search.placeholder[langCode];

  useEffect(() => {
    switchLanguage(langCode || 'en');
  }, [langCode, router]);

  const angleIcon = !header.langState ? (
    <FontAwesomeIcon
      id={`${languageButton}-down`}
      icon={faAngleDown}
      className="top-neg-1 ml-1 pointer-events-none"
      height="1em"
      width="1em"
      focusable="false"
    />
  ) : (
    <FontAwesomeIcon
      id={`${languageButton}-up`}
      icon={faAngleUp}
      className="top-neg-1 ml-1 pointer-events-none"
      height="1em"
      width="1em"
      focusable="false"
    />
  );

  if (type === 'link' && href.length) {
    return (
      <li className="headerNavItem border-r" {...props}>
        <Link
          className={clsx(
            'lg:px-5 leading-none table-cell lg:hover:underline lg:text-sm',
            inIRSMenu ? 'px-5 py-3' : 'px-3 py-1',
          )}
          data-testid={`${dataTestId}${langSwitcherTestId}`}
          id={id}
          external={external}
          icon={icon}
          href={createIRSLinkPath(href, langCode)}
          ariaLabel={lang(children)}
          onBlur={() => {
            if (
              document.body.className === 'openMenu'
              && id === 'taxProsLink'
            ) {
              document.getElementById('irsgovLink').focus();
            }
          }}
        >
          {lang(children)}
        </Link>
      </li>
    );
  }

  if (type === 'languageSwitcher' && list.length) {
    return (
      <li className="headerNavItem border-r">
        <button
          id={languageButton}
          className="flex px-5 lg:px-5 lg:py-1 w-full py-3 block leading-none lg:hover:underline lg:text-sm"
          data-testid={`langSwitcher${langSwitcherTestId}`}
          onClick={() => toggle(!header.langState)}
          aria-expanded={header.langState}
        >
          {lang(langText[langCode || 'en'])}
          {angleIcon}
        </button>
        {header.langState && (
          <LanguageSwitcher list={list} switchLanguage={switchLanguage} langSwitcherTestId={langSwitcherTestId} />
        )}
      </li>
    );
  }

  if (type === 'toggleButton' && target) {
    return (
      <>
        {target === TOGGLE_SEARCH && (
          <li id="toggleSearch" className="headerNavItem border-r">
            <a
              role="button"
              href={header.search.show ? '#header-search' : '#'}
              aria-expanded={header.search.show}
              className="toggleSearch uppercase flex px-3 py-1 lg:px-5 leading-none lg:hover:underline lg:text-sm"
              data-testid="searchLinkMobile"
              onClick={(e) => toggleSearch(e)}
            >
              {lang(children)}
            </a>
            <div
              className={clsx(
                'bg-blue-500 h-16 w-full',
                header.search.show && width < CONTAINER_LG
                  ? 'absolute left-0 right-0'
                  : 'block hidden',
              )}
              style={{ top: '55px' }}
            >
              <div className="container">
                <SearchField
                  className={clsx('mt-0 w-full')}
                  id="header-search"
                  dataTestId={`${dataTestId}Mobile`}
                  formID="headerSearchForm"
                  buttonId="headerSearchButton"
                  label={lang(header.search.label)}
                  btnLabel={lang(header.search.btnLabel)}
                  placeholder={formPlaceholder}
                  action={formAction}
                  external={header.search.external}
                  style={{ maxHeight: '24px', lineHeight: '22px' }}
                />
              </div>
            </div>
          </li>
        )}
        {target === TOGGLE_MENU && (
          <li className="headerNavItem border-r">
            <a
              href="#toggleMenu"
              role="button"
              aria-expanded={header.menuState}
              className={clsx(
                'toggleMenu uppercase flex px-3 py-1 lg:px-5 leading-none lg:hover:underline',
                children === 'Menu' ? 'spaced' : '',
              )}
              onClick={(e) => toggleMenu(e)}
              style={{ transition: 'none' }}
              data-testid="mobileMenu"
            >
              {lang(children)}
            </a>
          </li>
        )}
      </>
    );
  }

  return (
    <li className="navItem" {...props}>
      {props}
      {lang(children)}
    </li>
  );
};

HeaderNavItem.propTypes = {
  children: PropTypes.string,
  className: PropTypes.any,
  dataTestId: PropTypes.any,
  external: PropTypes.any,
  href: PropTypes.string,
  icon: PropTypes.any,
  irsSite: PropTypes.any,
  languageButton: PropTypes.any,
  list: PropTypes.array,
  target: PropTypes.any,
  toggleText: PropTypes.any,
  type: PropTypes.string,
  inIRSMenu: PropTypes.any,
};

export default HeaderNavItem
