import type { ReactNode } from 'react';

type StepFromProps = {
  title?: string;
  desc?: string;
  children: ReactNode;
};

export default function Form({ title, desc, children }: StepFromProps) {
  return (
    <div className="relative mx-auto mt-[-4rem] w-[95%] rounded-md bg-white px-6 py-[2rem] shadow-lg md:mt-0 md:shadow-none">
      <h1 className="text-2xl font-bold text-marine-blue">{title}</h1>
      <p className="my-[.60rem] text-[16px] text-cool-gray">{desc}</p>
      <div>{children}</div>
    </div>
  );
}
