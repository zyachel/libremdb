import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = {
  full?: true;
  children: ReactNode;
  className: string;
  originalPath?: string;
};

const Layout = ({ full, children, className, originalPath }: Props) => {
  return (
    <>
      <Header full={full} originalPath={originalPath} />
      <main id='main' className={`main ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
