// eslint-disable-next-line
import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

const styles = {};

function Home() {
    const context = useDocusaurusContext();
    const {siteConfig = {}} = context;
    return (
        <Layout description="reSKRipt">
            <div className="container" style={{position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -100%)', width: 800}}>
                <div style={{display: 'flex'}}>
                    <div style={{width: 200}}>
                        <img src={useBaseUrl('images/logo.svg')} width={200} height={200} />
                    </div>
                    <div style={{flex: 1}}>
                        <h1 className="hero__title">
                            {siteConfig.title}
                        </h1>
                        <p className="hero__subtitle">{siteConfig.tagline}</p>
                        <div className={styles.buttons}>
                            <Link
                                className="hero__button button button--outline button--primary button--lg"
                                to={useBaseUrl('docs/getting-started')}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
