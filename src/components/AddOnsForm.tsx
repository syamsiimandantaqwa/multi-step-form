import Form from './Form';
import { ValidatorContext } from '../contexts/ValidatorContext';
import { useState, useEffect, useContext } from 'react';
import { AddOns, User } from '../types';

type AddOnsFormProps = {
  addOns: AddOns[];
  planType: boolean;
  updateFields: (d: Partial<User>) => void;
};

export default function AddOnsForm({
  addOns,
  planType,
  updateFields,
}: AddOnsFormProps) {
  const { setValidator } = useContext(ValidatorContext);

  useEffect(() => {
    if (addOns.length) {
      setValidator(false);
      return;
    }
    setValidator(true);
  }, [addOns]);

  return (
    <div>
      <Form
        title="Pick add-ons"
        desc="Add-ons help enhance your gaming experience"
      >
        <div>
          {planType ? (
            <Services
              type={ADD_ONS_MONTHLY}
              addOns={addOns}
              onSelect={updateFields}
            />
          ) : (
            <Services
              type={ADD_ONS_YEARLY}
              addOns={addOns}
              onSelect={updateFields}
            />
          )}
        </div>
      </Form>
    </div>
  );
}

type ServicesProps = {
  addOns: AddOns[];
  type: AddOns[];
  onSelect: (d: Partial<User>) => void;
};

const Services = ({ addOns, type, onSelect }: ServicesProps) => {
  const [selected, setSelected] = useState(() =>
    addOns.map((data: AddOns) => data.id)
  );

  const filterAddOns = (): any => {
    const data = selected.map((id) => {
      const filteredAddOns = type.find((data) => data.id === id);
      return filteredAddOns;
    });

    return data;
  };

  const handleClick = (data: AddOns): void => {
    if (selected.includes(data.id)) {
      setSelected((prev) => prev.filter((id) => id !== data.id));
    } else {
      setSelected([...selected, data.id]);
    }
  };

  useEffect(() => {
    const addOns = filterAddOns();
    onSelect({ addOns });
  }, [selected]);

  return (
    <div>
      {type.map((data: AddOns) => {
        return (
          <div
            onClick={() => handleClick(data)}
            key={data.id}
            className={`${
              selected.includes(data.id)
                ? 'border-purplish-blue bg-magnolia'
                : 'border-light-gray'
            } my-[15px] flex w-full items-center gap-x-[10px] rounded-lg border-[1px] p-2 hover:cursor-pointer`}
          >
            <div className="relative h-[1.5rem] w-[1.5rem] rounded-md border-2 border-light-gray">
              <input
                readOnly
                className="h-full w-full appearance-none rounded-sm checked:bg-purplish-blue"
                type="checkbox"
                checked={selected.includes(data.id)}
              />
              <span className="absolute bottom-[5px] right-[7px] h-[12px] w-[2px] rotate-45 bg-white"></span>
              <span className="absolute bottom-[5px] left-[5px] h-[7px] w-[2px] rotate-[-46deg] bg-white"></span>
            </div>
            <div className="ml-[10px]">
              <h2 className="text-base font-bold text-marine-blue">
                {data.name}
              </h2>
              <p className="text-sm text-cool-gray ">{data.desc}</p>
            </div>
            <span className="ml-auto text-sm text-purplish-blue before:text-[10px] before:content-['+']">
              {data.price}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const ADD_ONS_MONTHLY: AddOns[] = [
  {
    id: 1,
    name: 'Online service',
    desc: 'Access to multiplayer games',
    price: '$1/mo',
  },
  {
    id: 2,
    name: 'Larger storage',
    desc: 'Extra 1TB cloud save',
    price: '$2/mo',
  },
  {
    id: 3,
    name: 'Customizable profile',
    desc: 'Custom theme on your profile',
    price: '$3/mo',
  },
];

const ADD_ONS_YEARLY: AddOns[] = [
  {
    id: 1,
    name: 'Online service',
    desc: 'Access to multiplayer games',
    price: '$10/yr',
  },
  {
    id: 2,
    name: 'Larger storage',
    desc: 'Extra 1TB cloud save',
    price: '$20/yr',
  },
  {
    id: 3,
    name: 'Customizable profile',
    desc: 'Custom theme on your profile',
    price: '$30/yr',
  },
];
