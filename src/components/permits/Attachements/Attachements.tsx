import AttachmentsIcon from "@/assets/icons/AttachmentsIcon"
import DownloadIcon2 from "@/assets/icons/DownloadIcon2"
import { AttachementsTable } from "../GISNetwork/components/AttachementsTable"
import { useTranslation } from "react-i18next"



const Attachements = () => {
    const { t } = useTranslation()
    return (
        <div className="">
            <div className='shadow bg-white mt-4 rounded-xl'>
                <div className='px-4 sm:px-6 pt-4 sm:pt-5 pb-4 mb-4 sm:pb-[21px] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 border-b border-[#E9EAEB]'>
                    <div className='gap-2 flex items-center'>
                        <AttachmentsIcon />
                        <h1 className='text-[#144892] font-semibold text-[16px] sm:text-[18px]'>
                            {t("pages.permitRequests.Gis.Attachments")}
                        </h1>
                    </div>
                    <div className='flex items-center gap-2 sm:gap-4 flex-wrap'>
                        <button className='py-2.5 cursor-pointer border border-[#A4A7AE] px-3 sm:px-3.5 gap-1 flex items-center bg-white rounded-lg'>
                            <DownloadIcon2 />
                            <h3 className='text-[12px] sm:text-[14px] font-semibold text-[#A4A7AE]'>{t("pages.permitRequests.Gis.Download")}</h3>
                        </button>
                    </div>
                </div>
                <div className='mx-3 sm:mx-6 pb-4 sm:pb-6'>
                    <AttachementsTable />
                </div>
            </div>
        </div>
    )
}

export default Attachements