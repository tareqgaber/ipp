import UsersIcon from '@/assets/icons/UsersIcon'
import React from 'react'
import { ReadOnlyTable, type ReadOnlyTableProps } from './ReadOnlyTable'

const Contractorinformation : React.FC<ReadOnlyTableProps> = ({data}) => {
    return (
        <div className='bg-white w-full rounded-xl'>
            <div className='px-6 pt-5 pb-[21px] gap-2 flex items-center border-b border-[#E9EAEB]'>
                <UsersIcon />
                <h1 className='text-[#144892] font-semibold text-[18px]'>
                    Contractor information
                </h1>
            </div>
            <div className='px-6 pb-6 pt-4'>
                <ReadOnlyTable data={data} />
            </div>
        </div>
    )
}

export default Contractorinformation