import React, {useState}from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
import { withRouter } from 'react-router-dom';

import './RegisterPage.css';

function RegisterPage(props) {

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");   
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  }


  const onSubmitHandler = (event) => {
    event.preventDefault(); //이걸 작성하지않으면 page가 무조건 refresh가 일어남

    if(Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같ㅇ아야 합니다.');
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
      confirmPassword: ConfirmPassword,
    }

    //redux를 안쓰면 여기서 바로 axios해서 보내면 되는데 redux를 위해 여기서 dispatch를 활용
    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success) {
          props.history.push('/login');
        }else {
          alert("Failed to sign up");
        }
      })

  }



  return (
    <div className="registerContainer">
      <form className="registerForm" onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br />
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);