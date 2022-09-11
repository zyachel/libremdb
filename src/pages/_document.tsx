import Document, { Html, Head, Main, NextScript } from 'next/document';

// for preventing Flash of inAccurate coloR Theme(fart)
// chris coyier came up with that acronym(https://css-tricks.com/flash-of-inaccurate-color-theme-fart/)
const setInitialTheme = `
document.documentElement.dataset.js = true;
document.documentElement.dataset.theme  = (() => {
  const userPrefersTheme = window.localStorage.getItem('theme') || null;
  const browserPrefersDarkTheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  if (userPrefersTheme) return userPrefersTheme;
  else if (browserPrefersDarkTheme) return 'dark';
  else return 'light';
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
