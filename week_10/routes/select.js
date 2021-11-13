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
import {selectSql} from "../database/sql";

const router = express.Router();
//localhost:3000/select 이고 get 요청이면 실행
router.get('/', async function(req, res){
//department에 department 테이블의 정보를 저장
    const department = await selectSql.getDepartment();
    const book = await selectSql.getBook();
    //select.hbs를 그려주고, title은 IT공대, const인 department를 넘겨줍니다
    res.render('select', {
        title: 'IT공대',
        title2:'book',
        department,
        book
    });
});
module.exports = router;