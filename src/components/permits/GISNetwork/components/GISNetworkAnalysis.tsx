import GisIcon from '@/assets/icons/GisIcon'
import RetryIcon from '@/assets/icons/RetryIcon'

const GISNetworkAnalysis = () => {
    return (
        <div className='bg-white w-full h-auto lg:h-[385px] rounded-xl'>
            <div className='px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-[21px] flex justify-between items-center border-b border-[#E9EAEB]'>
                <div className='gap-2 flex items-center'>
                    <GisIcon />
                    <h1 className='text-[#144892] font-semibold text-[16px] sm:text-[18px]'>
                        GIS & Network Analysis
                    </h1>
                </div>
                <button className='py-2.5 cursor-pointer hover:bg-gray-100 px-5 gap-1 flex items-center bg-white border border-[#D5D7DA] rounded-lg'>
                    <RetryIcon />
                    <h3 className='text-[14px] font-semibold text-[#414651]'>Retry</h3>
                </button>
            </div>
        </div>
    )
}

export default GISNetworkAnalysis