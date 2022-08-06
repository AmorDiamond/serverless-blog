import React, { useState } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
// @ts-ignore
import { history } from "umi";

export default function () {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png");

  async function submit() {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name: nickname, avatarUrl: avatar }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status !== 201) {
        console.error(await res.text());
        return;
      }
      const data = await res.json();
      alert(`欢迎使用，${data.name}`);
      history.push('/posts/create');
    } catch (err) {
      console.error(err)
    }
  }

  return <div className="w-full flex justify-center">
    <div className="container lg:px-64 px-8 pt-16">
      <p className="text-3xl font-extrabold">用户注册</p>
      <div className="mt-8">
        <p>邮箱</p>
        <TextInput value={email} onChange={setEmail} />
        <p className="mt-4">密码</p>
        <TextInput value={password} onChange={setPassword} />
        <p className="mt-4">昵称</p>
        <TextInput value={nickname} onChange={setNickname} />
        <p className="mt-4">头像</p>
        <TextInput value={avatar} onChange={setAvatar} />
        <Button onClick={submit}>注册</Button>
      </div>
    </div>
  </div>
}
