import React from 'react'
import ProjectInformation from '../ProjectDetails/components/ProjectInformation'
import GISNetworkAnalysis from './components/GISNetworkAnalysis'

const GISNetwork = () => {
    return (
        <div className="flex flex-col gap-5 pb-5">
            <GISNetworkAnalysis />
        </div>
    )
}

export default GISNetwork