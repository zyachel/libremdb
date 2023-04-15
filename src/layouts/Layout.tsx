import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

type Props = {
  full?: true;
  children: ReactNode;
  className: string;
};

const Layout = ({ full, children, className }: Props) => {
  return (
    <>
      <Header full={full} />
      <main id='main' className={`main ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
