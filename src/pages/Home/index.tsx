import React from 'react'
import styled from 'styled-components'

import GameSection from '../../components/GameSection'
import LatestMatches from '../../components/LatestMatches'
// import JogoDeCores from '../../components/GameSection'

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row nowrap;
  color: #333;
`

const Home: React.FC = () => {
  return (
    <PageWrapper>
      <LatestMatches />
      <GameSection />
    </PageWrapper>
  )
}

export default Home