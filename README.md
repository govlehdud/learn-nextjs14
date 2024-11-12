# learn-nextjs14

#Next.Js

React: 라이브러리 / next.js는 프레임워크

**라이브러리 : 코드내에서 내가 원하는 아키택처(원하는방식)으로 작성함**
- 사용의 주체는 내가함. 구조에 관한것은 내가 결정한다. 파일을 어디에 저장할지, 폴더의 이름은 무엇이될지, 우리가 필요할떄 사용가능*

**프레임워크 : 우리를위해 많은일을 대신해주지만 나에게 주도권이 없다.**
- 폴더이름이나 application같은 시작도 프레임워크가 다 해주는것이다. 
- Next.js가 제시하는 규칙을 따라야함.


**라이브러리와 프레임워크의 차이.**
- 내 생각 : 자동화와 주도권(통제권)을 맞 바꾼다고 생각한다. 스프링 Ioc 제어역전처럼 말이다.
- 라이브러리는 내가 규칙을 세우지만, 프레임워크는 우리가 규칙을 지켜야함.


--------------------------------------------------------------------------------------------------------------------------------------

# Nextjs Setup

원하는 위치에 폴더 생성 및 터미널 진입 eX) mkdir learn-nextjs14 / cd learn-nextjs14

1. npm init -y
2. package.json / script "license" -> MIT
3. npm install react@latest next@latest react-dom@latest
4. package.json / script "script" -> "dev": "next dev"
5. app 폴더안에 page.tsx or page.jsx 만들고
6. npm run dev 해보기



1. npm init -y 
ㄴ>  pakage.json생성 
2. JSON script licens
ㄴ> license : "ISC" -> "MIT"로 변경
3. npm install react@latest next@latest react-dom@latest
ㄴ> react@latest / next@latest / react-dom@latest 세가지가 각각 필요함
ㅁ react는 UI와 다른 모든것을 구성하는부분
ㅁ react-dom은 그것을 브라우저의 DOM에 렌더하는 역할
4. package.json / script "script" -> "dev": "next dev"
ㄴ> script: "dev": "next dev" 실행문 script 작성
5. app 폴더안에 page.tsx or page.jsx 만들고
ㄴ> 정확히 app/page라고 만들어야한다. / application이나 Page같이 쓰면 안된다. 빌드시 문제가 될 수 있다.
6. npm run dev 해보기
-> typescript설정을 해주지않았지만 page만들떄 .tsx확장자를 쓰니 자동으로 맞춤 설정을 nextjs가 해주었고
시작시 layout이 없으니 자동으로 app/layout을 생성해 주었다.

--------------------------------------------------------------------------------------------------------------------------------------

** client / server component ✔next14부터 새로 나온 개념

예전처럼 import react하지않아도 nextjs가 알아서 제공해준다.

react-router의 작동방식은  url을 지정하고 home이라는 컴포넌트  사용자가 그 컴포넌트에 접근할떄까지 render요청을 하는거다 
url이 컴포넌트를 랜더링하게끔 지정하는건 굉장히 수동적임!!
ex) 
"/" ----> <Home /> 
"/about-us" -----> <AboutUs />
":movie/:id" -----> <Movie />
하지만 nextjs는 그저 폴더를 생성하고 폴더안에 page를 만든뒤 export로 알려주면됨
파일시스템으로 생성할수있음. 꼭! page가 있어야 next는 사용자에게 실제로 보여지는 페이지를 표현할수있음.

next에서 중요한 파일 3가지가있다. 
page / layout 그리고 not-found파일이다.

--------------------------------------------------------------------------------------------------------------------------------------

#nextjs는 "/Home" 같은경우는 어떻게 이동하는가? react처럼 a태그를 사용하지않는다.
ex) navigation 상황의 경우 <Link />를 import 한다. import Link from "next/link";

## rendering이란
Javascript function을 가져와서 브라우저가 이해할수잇는 html로 변환하는 작업이다

## csr (client side rendering) ex) create-react-app
페이지는 아무것도 없다가 js를 로드하고 그 후에 js가 UI를 빌드해야만 페이지가 로드된다.
이러한 방식은 사용자경험으로 하여금 최악을 선사하며 SEO검색엔진은 HTML을기준으로 판단하는데 csr은 내용이 없다고 판단하기 까지 한다.

## ssr (server side rendering) ex) next.js
js를 활성화하지않아도 html이 있따.
next.js application의 모든 page안의 모든 component들은 next.js가 그것들을 우선 server에서 render한다.
모든 컴포넌트와 페이지들은 먼저 backend에서 render된다 -> html로변환되고 -> html은 브라우저에 넘겨진다.
ex) 크롬에서 js비활성화를 하고 next.js에서 console.log('Hello')를 찍으면 개발자도구엔 안나오지만 ide에선 hello가 출력된다.

/about-us ----------> Boring Html ---------> : --------------> init(Boring HMTL)
사용자가 페이지에 도착한 순간에 아직 js도 프레임워크도 로드되지않은 js가비활성화 되어있거나 로드에 시간이 오래걸리는경우 hard nav가 될것이고
 작업이 완벽하게 되서 js 컴포넌트가되는거고 -> react컴포넌트가 되어야 nav가 제대로 interactive하게 움직인다.
 
--------------------------------------------------------------------------------------------------------------------------------------

hydration이란
단순 HTML을 React application으로 초기화 하는 작업 / backend에서 render되고 frontend에서 hydrate됨을 의미함.
ex) <button>0</button>
뒷단에서 next.js를로딩하고 framework를 초기화하고 이 버튼위에 reactapplicaiton을 생성하면 버튼은 interactive 해지고 eventListner가 추가된다.
- 이게 hydration과정이며 모든 component에 대해 발생하지는 않는다. 오직 use client 지시어를 맨 위에 갖고있는 component들뿐이다.

**interactive한 컴포넌트와 아닌 컴포넌트는 구분해야한다!**
- javascript Load가 필요치않은 페이지에 hydration 작업을 굳이해서 속도저하를 이르킬 이유가 없기떄문이다.

요약 : 모든 컴포넌트는 backend에서 먼저 render -> html로 변경 그 후 "use client"를 사용한 컴포넌트만이 front단에서 hydrate 한다.



Layout은 청사진을 그려둘수있는 파일이며 Default 파일과 폴더에 각각의 레이아웃이 존재할수있는데 default와 각각의 레이아웃은 서로 상쇄하지않고 중첩이 가능하다.



**route group**
ㅁ 폴더이름을 괄호로 묶어줘야한다
ㄴ> 괄호로묶어 폴더이름을 지정해주면 URL을 생성하지않고 바뀌지도않는다.
ㅁ routes를 그룹화해서 logical groups으로 만들 수 있다.

**metaData는 병합될수있다.**
내가 title을 변경하고 description을 지웟다고 해도 상위에서 description을 작성했다면 병합되어 title과 description이 나오게된다.

export const metadata: Metadata = {
  title: {
    template: "%s | Next Movies",
    default: "Loading...",
  },
};

export const metadata = {
  title: "About Us",
};

export const metadata = {
  title: "Home",
};


title : 
'About Us' | 'Next Movies' 이거나 'Home' | 'Next Movies' 인데  title이없으면 default값 'Loading...' 이 출력된다

## 폴더 구조를 [id] 대괄호를 쓰면
movie:id 처럼 id형식을 props로 받을수있따 == export default function MovieDetail({ params }: { params: { id: string }
console.log로 찍어보면 params: {id: 123} 이런식으로 받아지고
검색할떄 ?region:kr?page:2라고 쓰면 searchParams: {region: 'kr', page: '2'} 나온다. == <MovieDetail params={{id: 123}} />
