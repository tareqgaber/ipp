
import { SettingsCard } from './components/SettingCard'
const SettingsPage = () => {
  return (
    <div className=" h-full w-full  flex flex-col gap-5">
      <div className="w-full flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold  leading-8">Settings</h2>
          <p className="text-Colors-Text-text-tertiary-(600) text-base font-normal ">
            Control account and application settings
          </p>
        </div>
      </div>
          <div className=" w-full flex items-center gap-5    ">
        {" "}
        <SettingsCard /> <SettingsCard /> <SettingsCard /> {" "}
      </div>


    </div>
  )
}

export default SettingsPage
