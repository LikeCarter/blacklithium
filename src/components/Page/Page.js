import React, { useRef, useEffect } from "react";
import styles from "./Page.module.scss";
import Helmet from 'react-helmet';

type Props = {
  title?: string,
  children: React.Node,
};

const Page = ({ title, children }: Props) => {
  const pageRef = useRef();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  });

  return (
    <div ref={pageRef} className={styles["page"]}>
      <Helmet>
        <script src="https://app.vouchpanel.com/js/embed.js" defer></script>
      </Helmet>

      <div className={styles["page__inner"]}>
        {title && <h1 className={styles["page__title"]}>{title}</h1>}
        <div className={styles["page__body"]}>{children}</div>
      </div>
    </div>
  );
};

export default Page;
