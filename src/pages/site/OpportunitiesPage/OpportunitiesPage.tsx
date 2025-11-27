import { Container } from "@/components/ui/container";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import OpportunityCard from "@/components/OpportunityCard";
import { useSiteOpportunities } from "@/api/queries";
import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";
import { Pagination } from "@/components/ui/pagination";
import { useTranslation } from "@/hooks";

// Custom stagger container with longer delay for more noticeable effect
const cardStaggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15, // 150ms delay between each card
      delayChildren: 0,
    },
  },
};

export function OpportunitiesPage() {
  const { t } = useTranslation();
  const [localSearchValue, setLocalSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input and reset page on search change
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(localSearchValue);
      setCurrentPage(1); // Reset to first page on search
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [localSearchValue]);

  // Fetch site opportunities using the query hook
  const { data, isLoading, isError } = useSiteOpportunities({
    search: debouncedSearchValue,
    page: currentPage,
    limit: 9,
  });

  // Calculate total pages
  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  return (
    <Container>
      <div className="pt-8 md:pt-16 lg:pt-20 mb-8 md:mb-12 lg:mb-14">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-[3.75rem] mb-2">
          {t("pages.opportunities.title")}
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600">
          {t("pages.opportunities.subtitle")}
        </p>
      </div>

      <div className="relative flex-1 w-full md:max-w-sm mb-8 md:mb-10 lg:mb-12">
        <Search className="absolute start-[21px] top-1/2 -translate-y-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 h-5 w-5 text-muted-foreground -translate-x-1/2" />
        <Input
          type="text"
          placeholder={t("pages.opportunities.searchPlaceholder")}
          onChange={(e) => setLocalSearchValue(e.target.value)}
          className="ps-10.5 h-12 text-md"
        />
      </div>

      <motion.div
        key={isLoading ? "loading" : "loaded"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-x-8 lg:gap-y-12 mb-10 md:mb-12 lg:mb-16"
        variants={cardStaggerContainer}
        initial="initial"
        animate="animate"
      >
        {isLoading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <OpportunityCard key={`skeleton-${index}`} isLoading={true} />
          ))
        ) : isError ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-red-600">
              {t("pages.opportunities.errorMessage")}
            </p>
          </div>
        ) : data?.data && data.data.length > 0 ? (
          data.data.map((opportunity) => (
            <motion.div key={opportunity.id} variants={staggerItemVariants}>
              <OpportunityCard opportunity={opportunity} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-gray-600">
              {t("pages.opportunities.emptyState")}
            </p>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {!isLoading && !isError && data && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mb-10 md:mb-12 lg:mb-16"
        />
      )}
    </Container>
  );
}
