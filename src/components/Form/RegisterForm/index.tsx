import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { iRegisterUser, UserContext } from '../../../providers/UserContext';

const formSchema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup
    .string()
    .matches(/(\d)/, 'Deve conter ao menos 1 número')
    .matches(/[a-z]/, 'Deve conter ao menos 1 letra minúscula')
    .matches(/[A-Z]/, 'Deve conter ao menos 1 letra maiúscula')
    .matches(/(\W|_)/, 'Deve conter ao menos 1 caracter especial')
    .matches(/.{8,}/, 'Deve conter no mínimo 8 caracteres')
    .required('Senha obrigatória'),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref('password')],
      'A senha de confirmação deve ser igual a senha'
    )
    .required('Confirmação de senha obrigatória'),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iRegisterUser>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const { registerUser } = useContext(UserContext);

  return (
    <StyledForm onSubmit={handleSubmit(registerUser)}>
      <Input
        label='Nome'
        type='text'
        errors={errors.name?.message}
        register={register('name')}
      />
      <Input
        label='Email'
        type='text'
        errors={errors.email?.message}
        register={register('email')}
      />
      <Input
        label='Senha'
        type='password'
        errors={errors.password?.message}
        register={register('password')}
      />
      <Input
        label='Confirmar senha'
        type='password'
        errors={errors.passwordConfirmation?.message}
        register={register('passwordConfirmation')}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
