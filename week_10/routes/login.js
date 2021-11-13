// Copyright 2021 kms
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from "express";
//sql.js에서 selectSql 사용
import { selectSql } from "../database/sql";

const router = express.Router();
//localhost:3000/이고 get 요청이면 이면 login.hbs를 그려준다
router.get('/', (req,res) => {
    res.render('login');
})
//localhost:3000/이고 post 요청이면 로그인 정보를 확인한다.
router.post('/', async(req, res) => {
    // 응답의 body를 vars에 저장
    const vars = req.body;
   //sql.js의 getUsers()사용. 사용자의 정보를 불러옴
    const users = await selectSql.getUsers();
    //내가 누구인지를 저장할 변수 whoAmI 선언
    let whoAmI = '';
    //로그인을 체크하기 전이므로 초기값은 false로
    let checkLogin = false;
// vars는 object이므로 vars.~~ 로 하면 됨.
    users.map((user)=> {
        //확인을 위해 user.Id를 console로 출력
        console.log(user.Id);
        //응답으로 들어온 id/password가 user 테이블에 있는 정보와 일치하면 login 성공
        if (vars.id === user.Id && vars.password === user.Password){
            console.log('login success!');
            checkLogin = true;
            // 로그인을 성공한 후에, 로그인을 한 사람이 admin이면
            if(vars.id === 'admin'){
                //나는 관리자이다.
                whoAmI = 'admin';
            }
            //관리자가 아니면
            else{
                //일반 user이다.
                whoAmI = 'user';
            }
        }
    })
    //로그인이 성공적으로 됐으면 checkLogin == true 이므로
    //성공적으로 로그인이 되고 관리자로 로그인을 하였으면
    if (checkLogin && whoAmI === 'admin'){
        //department를 삭제할 수 있는 페이지로 이동
        res.redirect('/delete/department');
    }else if (checkLogin && whoAmI === 'user'){
        //일반 유저이면
        //정보를 보여주는 페이지로 이동
        res.redirect('/select');
    }else {
        //checkLogin이 false이면
        //로그인 실패
        console.log('login failed!');
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/';</script>");
    }
})

module.exports = router;