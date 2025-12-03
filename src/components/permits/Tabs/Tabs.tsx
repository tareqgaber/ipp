import React, { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface Tab {
    id: string;
    label: string;
    content: ReactNode;
    disabled?: boolean;
}

interface TabsProps {
    tabs: Tab[];
    defaultActiveTab?: string;
    onTabChange?: (tabId: string) => void;
    className?: string;
    headerClassName?: string;
    contentClassName?: string;
    activeTabClassName?: string;
    inactiveTabClassName?: string;
    showContent?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
    tabs,
    defaultActiveTab,
    onTabChange,
    className = '',
    headerClassName = '',
    contentClassName = '',
    activeTabClassName = 'bg-[#144892] py-2 px-3 rounded-md text-[14px] font-semibold text-white',
    inactiveTabClassName = 'py-2 px-3 text-[14px] font-semibold text-[#717680]',
    showContent = true
}) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [activeTab, setActiveTab] = useState<string>(defaultActiveTab || tabs[0]?.id || '');

    const handleTabClick = (tabId: string, disabled?: boolean) => {
        if (disabled) return;
        setActiveTab(tabId);
        onTabChange?.(tabId);
    };

    const getActiveTabContent = () => {
        const active = tabs.find(tab => tab.id === activeTab);
        return active?.content || null;
    };

    return (
        <div className={className}>
            <div
                className={`
        bg-white p-2 rounded-xl 
        flex items-center 
        overflow-x-auto scrollbar-hide
        gap-2.5 mb-6 
        ${headerClassName}
    `}
                dir={isRTL ? 'rtl' : 'ltr'}
            >
                {tabs.map((tab) => {
                    const isActive = tab.id === activeTab;
                    const isDisabled = tab.disabled;

                    return (
                        <div
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id, isDisabled)}
                            className={`
                    shrink-0
                    cursor-pointer transition-all duration-200
                    ${isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:opacity-80'}
                    ${isActive ? activeTabClassName : inactiveTabClassName}
                    whitespace-nowrap
                `}
                        >
                            {tab.label}
                        </div>
                    );
                })}
            </div>

            {showContent && (
                <div className={contentClassName}>
                    {getActiveTabContent()}
                </div>
            )}
        </div>
    );
};

export default Tabs;