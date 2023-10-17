import Form from './Form';
import iconArcade from '../assets/images/icon-arcade.svg';
import iconAdvanced from '../assets/images/icon-advanced.svg';
import iconPro from '../assets/images/icon-pro.svg';
import { ValidatorContext } from '../contexts/ValidatorContext';
import { useState, useContext, useEffect } from 'react';

import { Plans, User } from '../types';

type PlanTypes = {
  icon: string;
  name: string;
  price: string;
  discount?: string;
};

type SelectPlanFormProps = {
  plan: Plans;
  planType: boolean;
  setPlanType: React.Dispatch<React.SetStateAction<boolean>>;
  updateFields: (d: Partial<User>) => void;
};

export default function SelectPlanForm({
  plan,
  planType,
  setPlanType,
  updateFields,
}: SelectPlanFormProps) {
  const { setValidator } = useContext(ValidatorContext);

  useEffect(() => {
    if (plan.name) {
      setValidator(false);
      return;
    }
    setValidator(true);
  }, [plan]);

  return (
    <Form
      title="Select your plan"
      desc="you have the option of monthly or yearly billing"
    >
      {planType ? (
        <Plan
          plan={plan}
          type={MONTHLY_TYPE}
          onSelect={updateFields}
          planType={planType}
          key="monthly"
        />
      ) : (
        <Plan
          plan={plan}
          type={YEARLY_TYPE}
          onSelect={updateFields}
          planType={planType}
          key="yearly"
        />
      )}

      <ToggleSwitch
        checked={planType}
        onChange={setPlanType}
        updateFields={updateFields}
      />
    </Form>
  );
}

type PlanProps = {
  plan: Plans;
  type: PlanTypes[];
  planType: boolean;
  onSelect: (d: Partial<User>) => void;
};

const Plan = ({ plan, type, planType, onSelect }: PlanProps) => {
  const [selected, setSelected] = useState<string | null>(plan.name || null);

  const handleClick = (data: PlanTypes): void => {
    const userSelectedPlan = {
      type: planType ? 'monthly' : 'yearly',
      name: data.name,
      price: data.price,
    };

    setSelected(data.name);
    onSelect({ plan: userSelectedPlan });
  };

  return (
    <div>
      {type.map((data) => {
        return (
          <div
            onClick={() => handleClick(data)}
            className={`${
              selected === data.name
                ? 'border-purplish-blue'
                : 'border-light-gray'
            } my-2 flex items-center rounded-[15px] border-[1px] px-2 py-4 hover:cursor-pointer hover:border-purplish-blue`}
            key={data.name}
          >
            <div>
              <img src={data.icon} />
            </div>
            <div className="ml-[10px]">
              <h2 className="font-bold text-marine-blue ">{data.name}</h2>
              <p className="text-sm text-cool-gray">{data.price}</p>
              <p className="text-[12px] text-marine-blue ">{data?.discount}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

type ToggleSwitchProps = {
  checked: boolean;
  updateFields: (d: Partial<User>) => void;
  onChange: (d: boolean) => void;
};

const ToggleSwitch = ({
  checked,
  onChange,
  updateFields,
}: ToggleSwitchProps) => {
  const updatePlan = () => {
    const updatedPlan = {
      type: checked ? 'yearly' : 'monthly',
      name: '',
      price: '',
    };
    onChange(!checked);
    updateFields({ plan: updatedPlan });
  };

  const handleClick = () => {
    updatePlan();
  };

  return (
    <>
      <input type="checkbox" checked={checked} hidden readOnly />
      <div className="mt-4 flex items-end justify-center gap-x-[15px]">
        <span
          className={`text-[15px] ${
            checked ? 'text-marine-blue' : 'text-cool-gray'
          }`}
        >
          Monthly
        </span>
        <button
          className="flex h-[25px] w-[50px] items-center rounded-full border-2 bg-marine-blue p-[2px]"
          onClick={handleClick}
        >
          <div
            className={`h-[15px] w-[15px] rounded-full bg-white ${
              checked ? 'mr-auto' : 'ml-auto'
            }`}
          ></div>
        </button>
        <span
          className={`text-[15px] ${
            checked ? 'text-cool-gray' : 'text-marine-blue'
          }`}
        >
          Yearly
        </span>
      </div>
    </>
  );
};

const MONTHLY_TYPE: PlanTypes[] = [
  {
    icon: iconArcade,
    name: 'Arcade',
    price: '$9/mo',
  },
  {
    icon: iconAdvanced,
    name: 'Advanced',
    price: '$12/mo',
  },
  {
    icon: iconPro,
    name: 'Pro',
    price: '$15/mo',
  },
];

const YEARLY_TYPE: PlanTypes[] = [
  {
    icon: iconArcade,
    name: 'Arcade',
    price: '$90/yr',
    discount: '2 months free',
  },
  {
    icon: iconAdvanced,
    name: 'Advanced',
    price: '$120/yr',
    discount: '2 months free',
  },
  {
    icon: iconPro,
    name: 'Pro',
    price: '$150/yr',
    discount: '2 months free',
  },
];
