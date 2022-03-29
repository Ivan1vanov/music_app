import React from 'react'
import Navbar from '../components/Navbar'
import Layout from '../layouts/Layout'

const index = () => {
  return (
    <div>
        <Layout>
        <div className='center'>
            <h1>Welcome!</h1>
            <h2>You can find the best music here!</h2>
        </div>
        </Layout>

        <style jsx>
            {`
                .center {
                    display: flex;
                    flex-direction: column;
                    justify-contetn: center;
                    align-items: center
                }
            `}
        </style>
    </div>
  )
}

export default index