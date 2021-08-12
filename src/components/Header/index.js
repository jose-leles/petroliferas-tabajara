import React from 'react';
import Head from 'next/head'
import styles from './header.module.css';

const Header = (props) => {
  return <>
    <Head>
        <link rel="stylesheet" href="main.css" />
        <title>{props.title || "Tabajara Companies"}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className={styles.header}>
        <img src={"/logo.png"}/>
    </div>
  </>;
}

export default Header;