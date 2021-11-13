import mysql from "mysql2";

// 데이터베이스 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
      host: 'localhost',
      user: 'root',
      database: 'week10',
      password: 'host4004',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit : 0
  }
);

// async / await 사용
const promisePool = pool.promise();

// select query
export const selectSql = {
  //user 정보를 얻어옴
  getUsers : async () => {
    //쿼리는 user 테이블에서 모든 정보를 select함
    const [rows] = await promisePool.query(`select * from user`);
    return rows
  },
  getDepartment : async () => {
    // 쿼리는 department 테이블에서 모든 정보를 select함
    const [rows] = await promisePool.query(`select * from department`);

    return rows
  },
  //book의 정보를 불러오는 쿼리
  getBook: async () => {
    const [rows] = await promisePool.query(`select * from book`);

    return rows;
  },
}
//delete query
export const deleteSql = {
  //부서를 삭제
  deleteDepartment : async (data) => {
    //어떤 부서번호를 가지는 부서를 삭제하는지 console로 출력
    console.log('deleteSql.deleteDepartment: ', data.Dname);
    //해당하는 data.dnumber에 해당하는 부서를 삭제
    const sql = `delete from department where Dname = "${data.Dname}"`;

    await promisePool.query(sql);
  },
  deleteBook : async (data) => 
  {
    console.log('deleteSql.deletebook: ',data.bookname);
   
    const sql = `delete from book where bookname = "${data.bookname}"`;
    //const sql = `delete from book where booknumber = "${data.booknumber}"`;

    await promisePool.query(sql);
  }
}
