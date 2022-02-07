import PageHeader from "./PageHeader"
import Head from "next/head"

const PageLayout = (page: { children: JSX.Element }): JSX.Element => {
    return (
        <div className="page-layout">
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;500;600;700&display=swap" rel="stylesheet" />

            </Head>
            <PageHeader />
            {page.children}
        </div>
    )
}

export default PageLayout