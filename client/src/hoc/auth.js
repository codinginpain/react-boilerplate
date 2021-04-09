import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';

export default function (SpecificComponent, option, adminRoute = null) {
    //옵션의 종류
    //null => 아무나 출입이 가능한 페이지
    //true => login한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지
    //adminRoute는 기본 null이고 admin만 출입 가능하게하려면 hoc로 컴포넌트 감쌀때 true넣어주면됨

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            
            dispatch(auth())
                .then(response => {
                    console.log(response);

                    //로그인 하지 않은 상태
                    if(!response.payload.isAuth) {
                        if(option) {
                            props.history.push('/login');
                        }
                    }else {
                        //로그인 한 상태
                        if(adminRoute && !response.payload.isAdmin) {
                            props.history.push('/');
                        }else {
                            if(option === false) {
                                props.history.push('/');
                            }
                        }
                    }
                })
        }, [])

        return (
            <SpecificComponent />
        )
    }



    return AuthenticationCheck;
}