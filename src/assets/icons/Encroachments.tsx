interface IconProps {
    bg?: string;
    opacity?: string
}

const Encroachments = ({ bg ,opacity }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="14" fill={bg} fill-opacity={opacity} />
            <path d="M13.9997 12.25V14.5833M13.9997 16.9166H14.0055M13.192 9.27015L8.39411 17.5573C8.12799 18.017 7.99493 18.2468 8.0146 18.4355C8.03175 18.6 8.11795 18.7495 8.25174 18.8468C8.40514 18.9583 8.67071 18.9583 9.20185 18.9583H18.7975C19.3287 18.9583 19.5943 18.9583 19.7476 18.8468C19.8814 18.7495 19.9676 18.6 19.9848 18.4355C20.0045 18.2468 19.8714 18.017 19.6053 17.5573L14.8074 9.27015C14.5423 8.81214 14.4097 8.58313 14.2367 8.50622C14.0858 8.43913 13.9136 8.43913 13.7627 8.50622C13.5897 8.58313 13.4571 8.81214 13.192 9.27015Z" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default Encroachments