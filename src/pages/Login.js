import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../statics/css/pages/login.css';
import { Card, Input, Button, Spin, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import servicePath from '../config/apiUrl';
import axios from 'axios';
function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    let history = useHistory()
    const checkLogin = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        if (!userName) {
            message.error('用户名不能为空')
            return false
        } 
        else if (!/^[A-Za-z0-9]+$/.test(userName)) {
            message.error("用户名只有英文大小写和数字字符")
            return false
        }
        else if (!password) {
            message.error('密码不能为空')
            return false
        }
        else if (!/^[a-zA-Z0-9_]+$/.test(password)) {
            message.error('密码只能包含数字英文字母与下划线')
            return false
        }
        else {
            let dataProps = {
                'userName': userName,
                'password': password
            }
            axios({
                method: 'post',
                url: servicePath.checkLogin,
                data: dataProps,
                withCredentials: true
            }).then(
                res => {
                    setIsLoading(false)
                    if (res.data.data === '登录成功') {
                        console.log(res.data.openId)
                        localStorage.setItem('openId', res.data.openId)
                        history.push('/adminIndex')
                    } else {
                        message.error('用户名密码错误')
                    }
                }
            ).catch(err => {
                console.log(err)
                message.error('登录失败')
            })
        }
    }
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="Berwin Blog  System" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserOutlined type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                    <br /><br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <br /><br />
                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login