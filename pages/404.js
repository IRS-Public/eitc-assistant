import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import EITCTemplate from '../templates/eitc/EITCTemplate'
import Heading from '../components/Heading'

const Default = () => (
  <EITCTemplate page="default" testId="404Header">
    <div className="flex flex-col">
      <FontAwesomeIcon 
        className="text-6xl mt-20 mx-auto w-full text-red-500" 
        icon={faExclamationTriangle} 
        style={{
          width: '1em',
          height: '1em'
        }}
      />
      <Heading level="1" className="text-6xl mt-6 font-bold text-center">Page Not Found.</Heading>
      <p className="mt-10 font-bold text-2xl text-center">Error 404.</p>
      <p className="mt-4 text-2xl text-center">Sorry, this page isn't available.</p>
    </div>
  </EITCTemplate>
)

export default Default
