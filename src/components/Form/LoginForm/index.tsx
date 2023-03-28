import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { iLoginUser, UserContext } from '../../../providers/UserContext';

const formSchema = yup.object({
  email: yup.string().required('Email obrigatório').email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLoginUser>({
    resolver: yupResolver(formSchema),
  });

  const { loginUser } = useContext(UserContext);

  return (
    <StyledForm onSubmit={handleSubmit(loginUser)}>
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
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
