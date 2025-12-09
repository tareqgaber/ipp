import GisIcon from '@/assets/icons/GisIcon'
import RetryIcon from '@/assets/icons/RetryIcon'
import { TextArea } from "@/components/base/textarea/textarea";
import { Toggle } from "@/components/base/toggle/toggle";
import { AttachementsTable } from './AttachementsTable';
import AttachmentsIcon from '@/assets/icons/AttachmentsIcon';
import UploadIcon from '@/assets/icons/UploadIcon';
import DownloadIcon2 from '@/assets/icons/DownloadIcon2';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import { useTranslation } from 'react-i18next';

const GISNetworkAnalysis = () => {
    const { t } = useTranslation()
    return (
        <div className='bg-white w-full h-auto rounded-xl pb-5'>
            <div className='px-4 sm:px-6 pt-4 sm:pt-5 pb-4 sm:pb-[21px] flex justify-between items-center border-b border-[#E9EAEB]'>
                <div className='gap-2 flex items-center'>
                    <GisIcon />
                    <h1 className='text-[#144892] font-semibold text-[16px] sm:text-[18px]'>
                        {t("pages.permitRequests.Gis.GIS&NetworkAnalysis")}
                    </h1>
                </div>
                <button className='py-2.5 cursor-pointer hover:bg-gray-100 px-4 sm:px-5 gap-1 flex items-center bg-white border border-[#D5D7DA] rounded-lg'>
                    <RetryIcon />
                    <h3 className='text-[12px] sm:text-[14px] font-semibold text-[#414651]'>{t("pages.permitRequests.Gis.Retry")}</h3>
                </button>
            </div>
            <div className='flex flex-col lg:flex-row gap-4 sm:gap-6 px-4 py-4'>
                <div className='flex flex-col gap-4 w-full lg:w-7/12'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0'>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-[12px] sm:text-[14px] font-normal text-[#374151]'>{t("pages.permitRequests.Gis.GISAnalysis")}</h2>
                            <div className='flex items-center gap-2'>
                                <Toggle size="sm" />
                                <h6 className='text-[#414651] text-[10px] sm:text-[12px] font-semibold'>{t("pages.permitRequests.Gis.Conflict")}</h6>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-[12px] sm:text-[14px] font-normal text-[#374151]'>{t("pages.permitRequests.Gis.VIP")}</h2>
                            <div className='flex items-center gap-2'>
                                <Toggle size="sm" />
                                <h6 className='text-[#414651] text-[10px] sm:text-[12px] font-semibold'>{t("pages.permitRequests.Gis.Conflict")}</h6>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0'>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-[12px] sm:text-[14px] font-normal text-[#374151]'>{t("pages.permitRequests.Gis.NationalGrid")}</h2>
                            <div className='flex items-center gap-2'>
                                <Toggle size="sm" />
                                <h6 className='text-[#414651] text-[10px] sm:text-[12px] font-semibold'>{t("pages.permitRequests.Gis.Conflict")}</h6>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2 className='text-[12px] sm:text-[14px] font-normal text-[#374151]'>{t("pages.permitRequests.Gis.Distribution")}</h2>
                            <div className='flex items-center gap-2'>
                                <Toggle size="sm" />
                                <h6 className='text-[#414651] text-[10px] sm:text-[12px] font-semibold'>{t("pages.permitRequests.Gis.Conflict")}</h6>
                            </div>
                        </div>
                    </div>
                    <div className='relative'>
                        <TextArea
                            isRequired
                            placeholder={t("pages.permitRequests.Gis.EnteraComment")}
                            label={t("pages.permitRequests.Gis.Comment")}
                            className={'w-full'}
                            rows={5}
                        />
                        <button className='py-2 bg-white absolute bottom-3 left-3.5 px-3 font-medium text-[14px] sm:text-[16px] text-[#181D27] border border-[#D5D7DA] rounded-lg cursor-pointer'>{t("pages.permitRequests.Gis.InsertTemplate")}</button>
                    </div>
                </div>
                <div className='w-full lg:w-5/12'>
                    <iframe
                        src="https://www.google.com/maps?q=Cairo%20Egypt&output=embed"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className='h-[250px] sm:h-[300px] rounded-xl w-full'
                    ></iframe>
                </div>
            </div>
            <div className='shadow mx-2 sm:mx-4 mt-4 rounded-xl'>
                <div className='px-4 sm:px-6 pt-4 sm:pt-5 pb-4 mb-4 sm:pb-[21px] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 border-b border-[#E9EAEB]'>
                    <div className='gap-2 flex items-center'>
                        <AttachmentsIcon />
                        <h1 className='text-[#144892] font-semibold text-[16px] sm:text-[18px]'>
                            {t("pages.permitRequests.Gis.Attachments")}
                        </h1>
                    </div>
                    <div className='flex items-center gap-2 sm:gap-4 flex-wrap'>
                        <button className='py-2.5 cursor-pointer px-3 sm:px-3.5 gap-1 flex items-center bg-[#144892] rounded-lg'>
                            <UploadIcon />
                            <h3 className='text-[12px] sm:text-[14px] font-semibold text-white'>{t("pages.permitRequests.Gis.Upload")}</h3>
                        </button>
                        <button className='py-2.5 cursor-pointer border border-[#A4A7AE] px-3 sm:px-3.5 gap-1 flex items-center bg-white rounded-lg'>
                            <DownloadIcon2 />
                            <h3 className='text-[12px] sm:text-[14px] font-semibold text-[#A4A7AE]'>{t("pages.permitRequests.Gis.Download")}</h3>
                        </button>
                        <button className='p-2 rounded-md bg-[#F04438] cursor-pointer'>
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
                <div className='mx-3 sm:mx-6 pb-4 sm:pb-6'>
                    <AttachementsTable />
                </div>
            </div>
            <div className='gap-6 pl-4 flex items-center mt-6'>
                <button className='py-2.5 px-5 rounded-lg bg-[#144892] text-[12px] sm:text-[14px] font-semibold cursor-pointer text-white'>{t("pages.permitRequests.Gis.Save&Submit")}</button>
                <button className='py-2.5 px-5 rounded-lg bg-white text-[12px] border border-[#D5D7DA] cursor-pointer sm:text-[14px] font-semibold text-[#414651]'>{t("pages.permitRequests.Gis.Save")}</button>
            </div>
        </div>
    )
}

export default GISNetworkAnalysis