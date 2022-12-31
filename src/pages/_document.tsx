import Document, { Html, Head, Main, NextScript } from 'next/document';

// for preventing Flash of inAccurate coloR Theme(fart)
// chris coyier came up with that acronym(https://css-tricks.com/flash-of-inaccurate-color-theme-fart/)
const setInitialTheme = `
(() => {
  document.documentElement.dataset.js = true;
  let theme = 'light';
  let themeColor = '#ffe5ef';
  const userPrefersTheme = window.localStorage.getItem('theme') || null;
  const browserPrefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (userPrefersTheme) theme = userPrefersTheme;
  else if (browserPrefersDarkTheme) theme = 'dark';
  if(theme === 'dark') themeColor = '#141c2e';
  document.documentElement.dataset.theme  = theme;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
})();
`;

const ModifiedDocument = class extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
};

export default ModifiedDocument;
