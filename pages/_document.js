import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>

          <link href="/fonts/source-sans-pro/source-sans-pro.css" rel="stylesheet" />
        </Head>
        <body>
          <noscript>
            <div className="noscript-section">
              <p>To use this app, JavaScript needs to be enabled. To enable JavaScript on your browser, please check out the appropriate link provided below:</p>
              <ul>
                <li>
                  <a
                    href="https://support.google.com/adsense/answer/12654?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enable JavaScript in Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/en-US/kb/javascript-settings-for-interactive-web-pages"
                    target="_blank" rel="noopener noreferrer"
                  >
                    Enable JavaScript in Mozilla Firefox
                  </a>, also 
                  <a
                    href="https://m.wikihow.com/Enable-JavaScript-in-Mozilla-Firefox"
                    target="_blank"
                    rel="noopener"
                  >
                    {' '} wikiHow
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/security-ibrw1074/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enable JavaScript in Apple Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.whatismybrowser.com/guides/how-to-enable-javascript/edge"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enable JavaScript in Microsoft Edge
                  </a>
                </li>
              </ul>
            </div>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
