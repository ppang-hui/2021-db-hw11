//모듈 불러오기
import express from "express";
import logger from "morgan";
import path from "path";

//js 파일 불러오기, 사용자가 만든 파일

//로그인 페이지
import loginRouter from "../routes/login";
// 정보를 보여주는 페이지
import selectRouter from "../routes/select";
//정보를 삭제하는 페이지
import deleteRouter from "../routes/delete";

//포트번호 3000번
const PORT = 3000;
const app = express();
//This middleware is available in Express v4.16.0 onwards.
app.use(express.urlencoded({ extended: false }));
//This middleware is available in Express v4.16.0 onwards.
app.use(express.json());
//path.join은 String을 주게 되면 플랫폼별(windows냐 mac이냐) 구분자를 사용해서 경로를 정규화해서 리턴해준다
//// __dirname은 file 명을 제외한 절대 경로
app.set('views', path.join(__dirname, '../views'))
//보기 엔진을 설정한 후에는 앱에서 엔진을 지정하거나 템플리트 엔진 모듈을 로드할 필요가 없으며, 
//Express는 내부적으로 모듈을 로드합니다
//view 폴더에 hbs 파일을 작성합니다.
app.set('view engine', 'hbs')

//morgan 미들웨어에서 사용, 요청에 대한 정보를 콘솔에 기록해 준다.
app.use(logger("dev"));

//경로에 따라 페이지를 그려줌
// 주소가 localhost:3000 이면 loginRouter 페이지
app.use('/', loginRouter);
// 주소가 localhost:3000/select 이면 selectRouter페이지
app.use('/select', selectRouter);
// 주소가 localhost:3000/delete 이면 deleteRouter페이지
app.use('/delete', deleteRouter);

//포트 번호 3000번에서 listen을 하겠다
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})