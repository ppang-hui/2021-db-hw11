// /employee = update/employee
import express from "express";
import {selectSql, updateSql} from "../database/sql";

//라우터 변수
const router = express.Router();

//라우트 경로는 /update/employee 
router.get('/employee', async (req,res) => {
    //Employee 테이블에 삽입된 데이터들을 가져옵니다
    const emp_res = await selectSql.getEmployee();
    //updateEmployee.hbs를 그려주고 title은 직원 테이블 갱신, emp_res를 넘겨줍니다.
    res.render('updateEmployee', {
        title: "직원 테이블 갱신",
        emp_res
    });
});

//라우트 경로는 /update/department
//updateDepartment.hbs를 화면에 그려주고, title: 부서 테이블 갱신, dept_res를 넘겨줍니다.
router.get('/department', async(req,res) => {
    const dept_res = await selectSql.getDepartment();
    res.render('updateDepartment', {
        title: "부서테이블 갱신",
        dept_res
    })
});
//post 방식, updateSql.updateEmployee 함수를 실행합니다.
//함수를 실행한 뒤 /select로 redirect 시켜줍니다.
router.post('/employee',async(req, res)=>{
    const vars =req.body;
    console.log(vars.salary);
    const data = {
        Salary : vars.salary
    }
    await updateSql.updateEmployee(data);

    res.redirect('/select');
});

//post 방식, updateSql.updateDepartment(data)를 실행합니다.

router.post('/department', async(req, res)=> {
//req.body를 vars 변수에 넣어줍니다.
    const vars = req.body;
    //값 이 제대로 들어왔는지 console로 확인합니다
    console.log(vars.dname);

    const data = {
        Dname : vars.dname
    }
    //매개변수를 data로 넣어주고 updateSql.updateDepartment를 실행합니다.
    await updateSql.updateDepartment(data);

    res.redirect('/select');
})


module.exports = router;