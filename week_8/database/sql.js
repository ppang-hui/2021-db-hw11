import mysql from "mysql2";

//db연결

const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root',
        database: 'week8',
        password: 'host4004',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit : 0
    }
);
//주석 X
const promisePool = pool.promise();

//async가 있으면 awiat가 끝날 때까지 기다려 주겠다는 것이다.
//database에서 select를 할 때, 즉 검색을 할 때 이용하는 함수입니다.
//query 안에는 실제 mysql의 문법대로 작성해 줍니다.
//example) select * from employee에서는 *은 all 을 의미하므로 getEmployee 함수를 실행하면 employee 테이블에 있는 모든 값들을 보여줍니다.
//외부에서 함수를 쓰기 위해서는 export를 붙여줘야 합니다.
export const selectSql = {
    getEmployee : async() => {
        const [rows] = await promisePool.query(`select * from employee`);
        console.log(rows);
        return rows
    },
    getDepartment : async() => {
        const [rows] = await promisePool.query(`select * from department`);

        return rows;
    }
}
//외부에서도 함수를 쓰기 위해 export를 앞에 붙여줍니다.
export const insertSql = {
//데이터 입력을 위한 변수 data를 받아온다.
    setEmployee : async (data) => {
        //쿼리
        //``백틱은 변수를 쓰기 위해서 씀
        //sql 변수에 들어가는 값은 insert 에 관련된 쿼리입니다.
        //data 라는 변수에 insert를  하기 위한 값들을 받아오므로
        //data 안에 있는 값들을 employee 테이블에 집어넣어 줍니다.
        const sql = `insert into employee values(
            "${data.Fname}", "${data.Minit}","${data.Lname}","${data.Ssn}",
            "${data.Bdate}", "${data.Address}", "${data.Sex}","${data.Salary}",
            "${data.Super_ssn}","${data.Dno}")`;

            await promisePool.query(sql);
    },
 //sql 변수에 들어가는 값은 insert 에 관련된 쿼리입니다.
        //data 라는 변수에 insert를  하기 위한 값들을 받아오므로
        //data 안에 있는 값들을 department 테이블에 집어넣어 줍니다.
    setDepartment: async (data) =>
    {
        const sql = `insert into department values (
            "${data.Dname}","${data.Dnumber}","${data.Mgr_ssn}","${data.Mgr_start_date}")`;
        console.log(data);
        await promisePool.query(sql);
    },

}
//조건을 설정해 줘야 함 
//update를 하기 위해서는 수정의 조건이 필요합니다.
//그 조건은 where로 넣어줍니다.
export const updateSql = {
    updateEmployee : async(data) => {
        //where 조건을 만족하는 것만 수정됩니다.
       const sql = `update employee set salary = "${data.Salary}" where Ssn='000000000'`;
       await promisePool.query(sql);
    },
    //where 조건을 만족하는 것만 수정됩니다.
    //수정되는 값은 사용자가 입력한 값입니다.
    updateDepartment: async(data) => {
        const sql = `update department set dname = "${data.Dname}" where Dnumber = 2`;
        await promisePool.query(sql)
    } 
}
