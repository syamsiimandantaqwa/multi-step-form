import PersonalInfoForm from './components/PersonalInfoForm';
import SelectPlanForm from './components/SelectPlanForm';
import AddOnsForm from './components/AddOnsForm';
import ThanksForm from './components/ThanksForm';
import FinishingUpForm from './components/FinishingUpForm';
import SideBar from './components/SideBar';
import Button from './components/Button';
import { useMultiStepForm } from './hooks/useMultiStepForm';
import { SideBarType, User } from './types';
import { useState, useEffect } from 'react';
import { ValidatorContext } from './contexts/ValidatorContext';

const steps: SideBarType[] = [
  {
    id: 1,
    name: 'your info',
  },
  {
    id: 2,
    name: 'select plans',
  },
  {
    id: 3,
    name: 'add-ons',
  },
  {
    id: 4,
    name: 'summary',
  },
];

const INITIAL_USER: User = {
  name: '',
  email: '',
  phoneNumber: '',
  plan: {
    type: '',
    name: '',
    price: '',
  },
  addOns: [],
};

const DEFAULT_MONTHLY_TYPE: boolean = true;

const App = () => {
  const [data, setData] = useState(INITIAL_USER);
  const [planType, setPlanType] = useState(DEFAULT_MONTHLY_TYPE);
  const [isConfirm, setIsConfirm] = useState(false);
  const [validator, setValidator] = useState(true);

  const updateFields = (fieldData: Partial<User>): void => {
    setData((data) => ({ ...data, ...fieldData }));
  };

  const { currentForm, next, prev, currentIndex, isLastIndex, isFirstIndex } =
    useMultiStepForm([
      <PersonalInfoForm {...data} updateFields={updateFields} />,
      <SelectPlanForm
        {...data}
        updateFields={updateFields}
        planType={planType}
        setPlanType={setPlanType}
      />,
      <AddOnsForm {...data} planType={planType} updateFields={updateFields} />,
      <FinishingUpForm userData={data} />,
    ]);

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
  };

  const handleConfirm = () => {
    setIsConfirm(true);
  };

  const handleNext = () => {
    next();
    setValidator(true);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="relative h-[100vh] md:container sm:bg-white md:flex md:h-auto md:rounded-md md:p-2">
      <div>
        <SideBar steps={steps} isActive={currentIndex + 1} />
      </div>

      {/*form*/}
      <ValidatorContext.Provider value={{ setValidator }}>
        <form
          className="relative pb-[5rem] md:w-[500px] md:pb-0"
          onSubmit={(e) => handleSubmit(e)}
        >
          {isConfirm ? <ThanksForm /> : <div>{currentForm}</div>}

          {/*button navigation*/}
          <div
            className={`${
              isConfirm ? 'hidden' : ''
            } fixed bottom-0 flex w-full justify-between bg-white p-3 sm:absolute`}
          >
            {isFirstIndex && (
              <Button
                style="text-cool-gray hover:text-marine-blue"
                onClick={prev}
              >
                go back
              </Button>
            )}

            {isLastIndex ? (
              <Button
                style="text-white bg-purplish-blue ml-auto"
                onClick={handleConfirm}
              >
                confirm
              </Button>
            ) : (
              <Button
                style="text-white bg-marine-blue ml-auto hover:bg-pastel-blue disabled:bg-pastel-blue"
                onClick={handleNext}
                isDisabled={validator}
              >
                next step
              </Button>
            )}
          </div>
        </form>
      </ValidatorContext.Provider>
    </div>
  );
};

export default App;
