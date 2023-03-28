import { UseFormRegisterReturn } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface iInputProps {
  label: string;
  type: string;
  errors: string | undefined;
  register: UseFormRegisterReturn;
}

const Input = ({ label, type, errors, register }: iInputProps) => (
  <fieldset>
    <StyledTextField label={label} type={type} {...register} />
    <StyledParagraph fontColor='red'>{errors}</StyledParagraph>
  </fieldset>
);

export default Input;
