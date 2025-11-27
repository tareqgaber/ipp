import { LanguageSwitcher } from "./components/LanguageSwitcher";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { useTranslation } from "./hooks";
import 'react-phone-number-input/style.css';


function App() {
  const { t } = useTranslation();
  return (
    <>
      <LanguageSwitcher />
      <h1>{t("pages.dashboard.title")}</h1>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">{t("pages.dashboard.title")}</SelectItem>
          <SelectItem value="banana">{t("pages.dashboard.title")}</SelectItem>
          <SelectItem value="grape">{t("pages.dashboard.title")}</SelectItem>
          <SelectItem value="orange">{t("pages.dashboard.title")}</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

export default App;
