import Form from './Form';
import iconCheckmark from '../assets/images/icon-thank-you.svg';

export default function ThanksForm() {
  return (
    <Form>
      <div className="flex h-[300px] items-center">
        <div className="text-center">
          <img className="mx-auto w-[4rem]" src={iconCheckmark} />
          <h1 className="my-[1rem] text-2xl font-bold">Thank you!</h1>
          <p className="text-sm text-cool-gray">
            Thanks for confirming your subscription! we hope you have fun using
            our platform if you ever need support, please feel free to email us
            at support@loremgaming.com
          </p>
        </div>
      </div>
    </Form>
  );
}
