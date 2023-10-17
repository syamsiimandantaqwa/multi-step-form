import bgSidebarMobile from '../assets/images/bg-sidebar-mobile.svg';
import bgSidebarDesktop from '../assets/images/bg-sidebar-desktop.svg';
import { SideBarType } from '../types';

type SideBarProps = {
  steps: SideBarType[];
  isActive: number;
};

export default function SideBar({ steps, isActive }: SideBarProps) {
  return (
    <>
      {/*mobile design*/}
      <div className="relative md:hidden">
        <ul className="absolute mt-[2rem] flex w-full justify-center gap-[2rem]">
          {steps.map((step) => (
            <li
              className={`h-[2rem] w-[2rem] rounded-full border-2 text-center leading-[1.7rem] ${
                isActive == step.id
                  ? 'bg-light-blue text-marine-blue'
                  : 'text-white'
              }`}
              key={step.id}
            >
              {step.id}
            </li>
          ))}
        </ul>
        <img className="h-[10rem] w-full object-cover" src={bgSidebarMobile} />
      </div>

      {/*dekstop design*/}
      <div className="relative mr-[2rem] hidden h-full w-[250px] md:block">
        <ul className="absolute ml-[2rem] mt-[2rem] text-white">
          {steps.map((step) => (
            <li key={step.id}>
              <DesktopBar step={step} isActive={isActive} />
            </li>
          ))}
        </ul>
        <img
          className="h-[10rem] h-full w-full rounded-md object-cover"
          src={bgSidebarDesktop}
        />
      </div>
    </>
  );
}

type DesktopBarProps = {
  isActive: number;
  step: SideBarType;
}

const DesktopBar = ({ step, isActive }: DesktopBarProps) => {
  return (
    <div className="mb-[1rem] flex items-center">
      <div
        className={`h-[2rem] w-[2rem] rounded-full border-2 text-center leading-[1.7rem] ${
          isActive == step.id ? 'bg-light-blue text-marine-blue' : 'text-white'
        }`}
      >
        {step.id}
      </div>
      <div className="ml-[1rem] uppercase">
        <span className="text-[11px] text-cool-gray">STEP {step.id}</span>
        <p className="text-sm font-bold">{step.name}</p>
      </div>
    </div>
  );
};
