import type { NextPage } from 'next'
import Head from 'next/head'
import Users from '../../components/Users'

const Index: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Users />
        </div>
    )
}

export default Index