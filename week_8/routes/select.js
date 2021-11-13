import express from "express";
//사용자가 만든 모듈 불러올 때 {}
import {selectSql} from "../database/sql";

const router = express.Router();
// /select를 /로 표현한 것입니다.
// /url 주소가 http://localhost:3000/select 일 때 실행될 것들을 써 줍니다.
router.get('/', async function(req,res){
    //employee 와 department 테이블에 삽입된 값들을 가져옵니다.
    const employee = await selectSql.getEmployee();
    const department = await selectSql.getDepartment();

    //hbs파일, select.hbs를 화면에 그려줍니다.
    //넘겨줄 것들은 title, title2, employee, department입니다.
    res.render('select', {
        title: '직원테이블',
        title2: '부서테이블',
        employee,
        department
    });
});

module.exports = router;