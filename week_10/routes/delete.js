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

//department를 삭제하는 페이지

import express from "express";
import { reset } from "nodemon";
//정보를 보여주거나 삭제할 수 있음
import { selectSql, deleteSql } from "../database/sql";

const router = express.Router();

// localhost:3000/delete이고 get 요청일 경우 실행
// router.get('/', async(req,res)=> {
//     const department = await selectSql.getDepartment();

//     res.render('delete',{
//         title:"삭제기능",
//         department
//     })
// });

// router.post('/',async(req,res)=>{
//     const data = {
//         Dnumber : req.body.delBtn
//     };

//     await deleteSql.deleteDepartment(data);
//     res.redirect('/delete');
// })
//주소가 localhost:3000/delete/department 이고, get 요청이면 실행
router.get('/department', async(req, res)=>{
    //const 인 department에 department 테이블에 저장되어 있는 정보들을 담아줍니다.
    const department = await selectSql.getDepartment();
    //deletedepartment.hbs 를 그려주고, title:삭제기능, department를 넘겨줍니다
    res.render('deletedepartment',{
    title:"삭제기능",
    department
    })
});
// 주소가 localhost:3000/delete/book 이고 get 요청이면 실행
router.get('/book', async(req,res)=>{
    const book = await selectSql.getBook();
    res.render('deletebook',
    {title:"book삭제",
    book}
    )
});
// 주소가 localhost:3000/delete/department이고 post 요청이면 실행
router.post('/department',async(req,res)=>{
    //data 에 넘겨받은 dnumber값을 저장
    const data = {
        Dname : req.body.delBtn
    };
    //넘겨받은 데이터에서 해당하는 dnumber를 가지는 department를 삭제
    await deleteSql.deleteDepartment(data);
    res.redirect('/delete/department');

});
//주소가 localhost:3000/delete/book이고 post 요청이면 실행
router.post('/book',async(req,res)=>{
    //data에 넘겨받은 booknumber를 저장
    const data = {
        bookname : req.body.delBtn
    };
    //넘겨받은 데이터에서 해당하는 booknumber를 가지는 book을 삭제
    await deleteSql.deleteBook(data);
    res.redirect('/delete/book');
});

module.exports = router;