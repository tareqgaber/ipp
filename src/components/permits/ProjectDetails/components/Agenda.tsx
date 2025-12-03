

const Agenda = () => {
    return (
        <div className='p-4 sm:p-6 bg-white rounded-xl grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>Requested By</h2>
                <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>Balady / RIPC</h6>
            </div>
            <div className='flex flex-col gap-1'>
                <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>Assigned to</h2>
                <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>Elbnaa al hadeeth</h6>
            </div>
            <div className='flex flex-col gap-1'>
                <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>SLA Countdown</h2>
                <div className='py-0.5 px-2 rounded-md border border-[#FECDCA] bg-[#FEF3F2] text-[12px] w-[106px] font-medium text-[#B42318]'>Overdue -01:30</div>
            </div>
            <div className='flex flex-col gap-1'>
                <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>Permit Number</h2>
                <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>LIC-2024-9876</h6>
            </div>
            <div className='flex flex-col gap-1'>
                <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>Company</h2>
                <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>Saudi Telecom Company</h6>
            </div>
            <div className='flex flex-col gap-1'>
                <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>External Reference</h2>
                <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>EXT-789456</h6>
            </div>
        </div>
    )
}

export default Agenda