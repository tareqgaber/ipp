import ElectricityIcon from '@/assets/icons/ElectricityIcon'
import { useTranslation } from 'react-i18next'

const ExcavationDetails = () => {
    const { t } = useTranslation()
    return (
        <div className='bg-white w-full h-auto lg:h-[385px] rounded-xl'>
            <div className='px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-[21px] gap-2 flex items-center border-b border-[#E9EAEB]'>
                <ElectricityIcon />
                <h1 className='text-[#144892] font-semibold text-[16px] sm:text-[18px]'>
                    {t("pages.permitRequests.ProjectDetails.ExcavationDetails")}
                </h1>
            </div>
            <div className='flex flex-col gap-4 px-4 sm:px-6 pb-4 sm:pb-6 pt-4'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>{t("pages.permitRequests.ProjectDetails.RequestType")}</h2>
                    <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>Normal Permit</h6>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>{t("pages.permitRequests.ProjectDetails.Location")}</h2>
                        <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>Jeddah, Rawdah district</h6>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>{t("pages.permitRequests.ProjectDetails.ExcavationDays")}</h2>
                        <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>15 days</h6>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>{t("pages.permitRequests.ProjectDetails.StartDate")}</h2>
                        <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>March 15, 2024 at 2:30 PM</h6>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>{t("pages.permitRequests.ProjectDetails.EndDate")}</h2>
                        <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>March 30, 2024</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExcavationDetails