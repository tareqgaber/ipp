import ExslamationIcon from '@/assets/icons/ExslamationIcon'
import { useTranslation } from 'react-i18next'

const ProjectInformation = () => {
    const { t } = useTranslation()
    return (
        <div className='bg-white w-full h-auto lg:h-[385px] rounded-xl'>
            <div className='px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-[21px] gap-2 flex items-center border-b border-[#E9EAEB]'>
                <ExslamationIcon />
                <h1 className='text-[#144892] font-semibold text-[16px] sm:text-[18px]'>
                    {t("pages.permitRequests.ProjectDetails.ProjectInformation")}
                </h1>
            </div>
            <div className='flex flex-col gap-4 px-4 sm:px-6 pb-4 sm:pb-6 pt-4'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>{t("pages.permitRequests.ProjectDetails.ProjectName")}</h2>
                    <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>Jeddah Metro Network Extension</h6>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>{t("pages.permitRequests.ProjectDetails.ProjectNumber")}</h2>
                        <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>12</h6>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>{t("pages.permitRequests.ProjectDetails.CoordinationOffice")}</h2>
                        <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>IPC Team - West</h6>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>{t("pages.permitRequests.ProjectDetails.Municipality")}</h2>
                        <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>Jeddah Municipality</h6>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>{t("pages.permitRequests.ProjectDetails.District")}</h2>
                        <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>Rawdah</h6>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-[#414651] text-[12px] sm:text-[14px] font-normal'>{t("pages.permitRequests.ProjectDetails.Description")}</h2>
                    <h6 className='text-[#414651] text-[14px] sm:text-[16px] font-semibold'>A placeholder text used to fill content in designs or prototypes, providing an idea of the final text.</h6>
                </div>
            </div>
        </div>
    )
}

export default ProjectInformation