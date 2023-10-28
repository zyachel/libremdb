import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

const OptionalLink = ({
  href,
  children,
  ...rest
}: { href?: string | null; children: ReactNode } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>) => (
  <>
    {href ? (
      <Link href={href}>
        <a {...rest}>{children}</a>
      </Link>
    ) : (
      children
    )}
  </>
);

export default OptionalLink;
