import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";
import { Link, useParams } from "react-router";
import opportunityImage from "@/assets/images/temp/opportunity-details.png";
import {
  CurrencyDollarCircle,
  Data,
  Flag02,
  Globe04,
  ArrowLeft,
  Lightbulb02,
  CheckCircle,
} from "@untitledui/icons";
import { useSiteOpportunity } from "@/api/queries/site-opportunities";
import { useTranslation } from "@/hooks";

export function OpportunityDetailsPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useSiteOpportunity(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <div className="text-lg text-gray-600">
              {t("pages.opportunityDetails.loading")}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <div className="text-lg text-red-600">
              {t("pages.opportunityDetails.error")}:{" "}
              {error instanceof Error
                ? error.message
                : t("pages.opportunityDetails.errorMessage")}
            </div>
            <Button size="md" asChild className="mt-4">
              <Link to="/opportunities">{t("pages.opportunityDetails.backToOpportunities")}</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <div className="text-lg text-gray-600">{t("pages.opportunityDetails.notFound")}</div>
            <Button size="md" asChild className="mt-4">
              <Link to="/opportunities">{t("pages.opportunityDetails.backToOpportunities")}</Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const opportunity = data.data;

  return (
    <div className="min-h-screen">
      <Container>
        <div className="py-8 md:py-12 lg:py-16 xl:py-20">
          <Link
            to="/opportunities"
            className="text-primary font-semibold flex items-center mb-6"
          >
            <ArrowLeft className="w-5 h-5 me-1.5 directional-icon" />
            {t("pages.opportunityDetails.backToOpportunities")}
          </Link>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 md:mb-8 gap-4 md:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-3 md:mb-2">
                {opportunity.title}
              </h1>
              <p className="text-base md:text-lg text-gray-600 leading-6">
                {opportunity.description}
              </p>
            </div>
            <Button size="md" asChild className="w-full md:w-auto md:shrink-0">
              <Link to={`/login?opportunityId=${opportunity.id}`}>
                {t("pages.opportunityDetails.applyNow")}
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 pb-8 md:pb-12 lg:pb-16">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight mb-3 md:mb-2">
              {t("pages.opportunityDetails.demandTitle")}
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-6 mb-4 md:mb-6">
              {t("pages.opportunityDetails.demandDisclaimer")}
            </p>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainerVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={staggerItemVariants}>
                <Card className="bg-gray-50">
                  <CardContent>
                    <div className="flex items-center justify-center w-10 h-10 mb-4 bg-orange-500 rounded-lg shadow-xs outline outline-2 outline-offset-[-2px] outline-white/12 border border-white/10">
                      <CurrencyDollarCircle className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600 leading-5 mb-2">
                      {t("pages.opportunityDetails.spend")}
                    </p>
                    <div className="text-3xl font-semibold leading-9">
                      {opportunity.spendRange}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={staggerItemVariants}>
                <Card className="bg-gray-50">
                  <CardContent>
                    <div className="flex items-center justify-center w-10 h-10 mb-4 bg-orange-500 rounded-lg shadow-xs outline outline-2 outline-offset-[-2px] outline-white/12 border border-white/10">
                      <Data className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600 leading-5 mb-2">
                      {t("pages.opportunityDetails.quantity")}
                    </p>
                    <div className="text-3xl font-semibold leading-9">
                      {opportunity.quantityRange}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mt-8 md:mt-10 lg:mt-12">
              {t("pages.opportunityDetails.supplierBaseTitle")}
            </h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
              variants={staggerContainerVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={staggerItemVariants}>
                <Card className="bg-gray-50">
                  <CardContent>
                    <div className="flex items-center justify-center w-10 h-10 mb-4 bg-orange-500 rounded-lg shadow-xs outline outline-2 outline-offset-[-2px] outline-white/12 border border-white/10">
                      <Flag02 className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600 leading-5 mb-2">
                      {t("pages.opportunityDetails.local")}
                    </p>
                    <div className="text-3xl font-semibold leading-9">
                      {opportunity.localSuppliers}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={staggerItemVariants}>
                <Card className="bg-gray-50">
                  <CardContent>
                    <div className="flex items-center justify-center w-10 h-10 mb-4 bg-orange-500 rounded-lg shadow-xs outline outline-2 outline-offset-[-2px] outline-white/12 border border-white/10">
                      <Globe04 className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600 leading-5 mb-2">
                      {t("pages.opportunityDetails.global")}
                    </p>
                    <div className="text-3xl font-semibold leading-9">
                      {opportunity.globalSuppliers}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>

          <div className="w-full lg:w-[556px] lg:max-w-[50%] lg:shrink-0">
            <img
              src={opportunityImage}
              alt={opportunity.title}
              className="rounded-lg"
            />
          </div>
        </div>

        {opportunity.localizationAreas &&
          opportunity.localizationAreas.length > 0 && (
            <div className="pt-8 md:pt-12 lg:pt-16 pb-12 md:pb-16 lg:pb-20">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 md:mb-5 lg:mb-6">
                {t("pages.opportunityDetails.localizationAreasTitle")}
              </h2>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-4 md:mt-6"
                variants={staggerContainerVariants}
                initial="initial"
                animate="animate"
              >
                {opportunity.localizationAreas.map((area, index) => (
                  <motion.div key={index} variants={staggerItemVariants}>
                    <Card className="bg-gray-50 min-h-[300px]">
                      <CardContent>
                        <div className="flex items-center justify-center w-10 h-10 mb-4 bg-orange-500 rounded-lg shadow-xs outline outline-2 outline-offset-[-2px] outline-white/12 border border-white/10">
                          <Lightbulb02 className="h-5 w-5 text-white" />
                        </div>
                        <p className="font-semibold text-gray-900 leading-6 mb-4">
                          {area.title}
                        </p>
                        {area.items && area.items.length > 0 && (
                          <ul className="space-y-3 text-gray-600">
                            {area.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-center gap-3"
                              >
                                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-sm text-gray-600 leading-5">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
      </Container>
    </div>
  );
}
