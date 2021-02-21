import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';
import Router from 'next/router';

const Signup = () =>{
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');
    const  {isSigningUp, me} = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(me){
            alert('로그인했으니 메인페인지로 이동합니다.')
            Router.push('/');
        }
    },[me && me.id]);

    const onSubmit = useCallback((e) =>{
        e.preventDefault();
        
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                id,
                password,
                nickname
            }
        });

        //Router.push('/');
    }, [password, passwordCheck, term,id,nickname]);
   
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    },[ password ]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    },[]);


    return(
        <>
            <Form onSubmit={onSubmit} style={{ padding:'1em'}}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br/>
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br/>
                    <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호 확인</label>
                    <br/>
                    <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
                    {passwordError && <div className="alerts" style={{color:'red'}}> 비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div> 
                    <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의하시겠습니까?</Checkbox>
                    {termError && <div className="alerts" style={{color:'red'}}> 약관에 동의하셔야 합니다.</div>}
                </div>
                <div>
                    <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
                </div>
            </Form>
        </>
    );
};

export default Signup;