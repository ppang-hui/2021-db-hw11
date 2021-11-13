import express from "express";
import {insertSql} from "../database/sql";

const router = express.Router();

//home.hbs 파일을 찾아서 화면에 그려줍니다.
router.get('/',(req,res) => {
    res.render("home");
});

router.post('/',(req,res)=> {
    const vars = req.body;
    //vars 라는 변수에 데이터의 길이를 담아줍니다.
    const var_length = Object.keys(req.body).length;
    //employee 테이블과 department 테이블에 삽입되는 데이터들 모두 값을 입력(삽입)했을 때 둘 다 post이며 home 화면으로 넘어오기 때문에
    //이 둘을 구분해 줄 필요가 있습니다.
    //구별할 때는 데이터의 개수로 구분을 하는데, department 테이블의 데이터 개수가 4개이므로
    //이보다 크면 employee 테이블에 집어넣는 데이터임을 알 수 있습니다.
    if (var_length > 4){
        const data = {
            //데이터 객체 생성
            //data 변수를 두 번 쓸 수 있는 이유는 둘 중 하나만 실행되기 때문.
            Fname: vars.fname,
            Minit: vars.minit,
            Lname: vars.lname,
            Ssn: vars.ssn,
            Bdate: vars.bdate,
            Address: vars.address,
            Sex: vars.sex,
            Salary: vars.salary,
            Super_ssn: vars.super_ssn,
            Dno: vars.dno
        };
        insertSql.setEmployee(data);
    } else{
        const data = {
            //데이터 객체의 개수가 4 이하일 때는 department에 해당하는 데이터가 입력되는 것입니다.
            //그러므로 department 테이블의 애트리뷰트에 해당하는 값들을 설정해 줍니다.
            Dname: vars.dname,
            Dnumber : vars.dnumber,
            Mgr_ssn: vars.mgr_ssn,
            Mgr_start_date: vars.mgr_start_date
        };
        insertSql.setDepartment(data);
    }
    //입력 후에 다시 홈화면으로 간다. (새로고침)
        res.redirect('/');
})

module.exports = router;