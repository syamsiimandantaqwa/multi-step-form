import Form from './Form';
import { ValidatorContext } from '../contexts/ValidatorContext';
import { useContext, useEffect } from 'react';
import { User } from '../types';
import type { ChangeEvent } from 'react';

type PersonalInfoFormProps = Partial<User> & {
  updateFields: (d: Partial<User>) => void;
};

export default function PersonalInfoForm({
  name,
  email,
  phoneNumber,
  updateFields,
}: PersonalInfoFormProps) {
  const { setValidator } = useContext(ValidatorContext);
  const valid: boolean = name !== "" && email !== "" && phoneNumber !== "";

  useEffect(() => {
    if (valid) {
      setValidator(false);
      return;
    }

    setValidator(true);
  }, [name, email, phoneNumber]);

  return (
    <Form
      title="Personal Info"
      desc="please provide your name, email address, and phone number"
    >
      <div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm">
            Name
          </label>
          <input
            required
            id="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateFields({ name: e.target.value })
            }
            className="fields text-alabastar"
            type="text"
            placeholder="e.g Stephen king"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm">
            Email Address
          </label>
          <input
            required
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateFields({ email: e.target.value })
            }
            className="fields text-alabastar"
            type="text"
            placeholder="e.g Stephen king@lorem.com"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm">
            Phone Number
          </label>
          <input
            required
            id="phone"
            value={phoneNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateFields({ phoneNumber: e.target.value })
            }
            className="fields text-alabastar"
            type="number"
            placeholder="e.g +123 456 789"
          />
        </div>
      </div>
    </Form>
  );
}
