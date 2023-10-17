import Form from './Form';
import { User } from '../types';

export default function FinishingUpForm({ userData }: { userData: User }) {
  const calculateTotal = (user: User): any => {
    const extractToNumber = (str: string): number =>
      parseInt(str.match(/[0-9]+/g)[0]);

    const price: number[] = user.addOns.map((data) =>
      extractToNumber(data.price as string)
    );
    const priceList: number[] = [...price, extractToNumber(user.plan.price)];

    return (
      priceList.reduce((a, b) => a + b) + user.plan.price.match(/.yr$|.mo$/)[0]
    );
  };

  const total: string = calculateTotal(userData);

  return (
    <Form
      title="Finishing up"
      desc="Double-check everything looks OK before confirming"
    >
      <div className="rounded-md bg-alabaster px-[1rem] py-[10px]">
        <div className="flex justify-between border-b-[1px] border-light-gray py-2 ">
          <h2 className="text-sm font-bold text-marine-blue">
            {userData.plan.name} ({userData.plan.type}) <br />
            <span className="font-normal text-cool-gray underline hover:cursor-pointer">
              Change
            </span>
          </h2>
          <span className="text-sm font-bold text-marine-blue">
            {userData.plan.price}
          </span>
        </div>
        <div>
          {userData.addOns.map((data) => {
            return (
              <div key={data.id} className="my-4 flex justify-between text-sm">
                <h2 className="text-cool-gray">{data.name}</h2>
                <span className="text-marine-blue before:text-[12px] before:content-['+']">
                  {data.price}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-[1rem] flex justify-between px-[1rem]">
        <p className="text-sm text-cool-gray">
          Total {userData.plan.type ? '(per month)' : '(per year)'}
        </p>
        <span className="text-lg font-bold text-purplish-blue">${total}</span>
      </div>
    </Form>
  );
}
