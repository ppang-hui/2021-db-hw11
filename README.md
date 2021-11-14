# 2021-db-hw11

# 3주차

## <span>STUDENT</span>

필드명|타입|설명
---|---|---|
student_id|CHAR(8)|학번|
name|VARCHAR(80)|성명|
department|VARCHAR(30)|학과|
grade|INT|학년|
admission_date|DATETIME|입학일자|
email|VARCHAR(100)|이메일

# 8주차

## EMPLOYEE
필드명|타입|설명
---|---|---|
Fname|varchar(10)|이름
Minit|char(1)|중간 이니셜
Lname|varchar(20)|성
Ssn|char(9)|사회구성번호, 사람을 식별할 수 있는 고유한 번호
Bdate|date|생일
Address|varchar(30)|자택주소
Sex|char(1)|성별
Salary|decimal(5, 0)|봉급
Super_ssn|char(9)|관리자의 ssn
Dno|int|노동자가 속해있는 부서 번호
- KEY
> PK
>> Ssn 
>>> Ssn은 Employee마다 유일하기 때문에 Ssn으로 employee들을 식별할 수 있습니다.

## DEPARTMENT
필드명|타입|설명
---|---|---|
Dname|varchar(15)|부서이름
Dnumber|int|부서번호
Mgr_ssn|char(9)|부서관리자의 ssn
Mgr_start_date|date|부서관리자가 부서관리를 시작한 날짜

- KEY
> PK
>> Dnumber
>>> 부서 번호는 각 부서마다 유일하기 때문에 부서를 식별할 수 있는 PK입니다.

> FK
>> Mgr_ssn
>>> Mgr_ssn은 employee 테이블에서 ssn을 외부에서 가져옵니다.

# 10주차

## USER

필드명|타입|설명
---|---|---|
Id|varchar(20)|사용자 id
Password|varchar(20)|사용자 패스워드
Role|varchar(5)|사용자의 역할(ex. 관리자,일반사용자)

- KEY
> PK
>> id
>>> 사용자 id를 중복이 안되게끔 한다는 가정 하에 id는 사용자를 식별가능합니다.


## DEPARTMENT
필드명|타입|설명
---|---|---|
Dname|varchar(15)|부서이름
Dnumber|int|부서번호

- KEY
> PK
>> Dnumber
>>> 부서 번호가 중복되지 않는다는 가정 하에, 부서 번호로 여러 부서들을 식별할 수 있습니다.

## BOOK
필드명|타입|설명
---|---|---|
bookname|char(20)|책이름
booknumber|char(3)|책번호
writer|char(20)|작가

- KEY
> PK
>> booknumber
>>> 책 번호가 중복되지 않는다는 가정을 한 후에, 책 번호로 여러 책들을 식별할 수 있습니다.