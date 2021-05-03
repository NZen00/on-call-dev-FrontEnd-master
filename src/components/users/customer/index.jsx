import React from 'react'
import { Footer } from '../../footer'
import { Navbar } from '../../navbar'
import { InnerPageContainer, PageContainer } from '../../pageContainer'

export function Customer ()
{
    return (
        <PageContainer>
            <Navbar />
            <InnerPageContainer>
                hello
             </InnerPageContainer>
            <Footer />
        </PageContainer>
    )
}
