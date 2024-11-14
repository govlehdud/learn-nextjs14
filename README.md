# learn-nextjs14

*이론이 햇갈린다면 #2.10을 다시 볼것*

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




--------------------------------------------------------------------------------------------------------------------------------------

## 2024-11-12 

**Conclusions** 

되짚어 봐야할 생각
1. 백엔드서버에서 클라이언트 컴포넌트와 서버 컴포넌트가 모두 랜더링된다!
2. 클라이언트 컴포넌트만 프론트엔드에서 다시 렌더링되거나 다시 hydrate된다!
3. 클라이언트 컴포넌트의 자바스크립트는 사용자가 다운로드하여 실행 / 서버컴포넌트의 자바스크립트는 사용자가 다운로드하지 않는다.. 서버에의해 딱 한번 실행된다
- 클라이언트 컴포넌트를 서버 컴포넌트 내에 포함시킬수도있다. <- 이 반대는 안됨

*모든 컴포넌트는 서버 컴포넌트이다 use client를 쓰면 프론트 컴포넌트가 된다.*
프론트 컴포넌트 즉 상호작용을 해야할떄 -> state를 사용하거나 API같은것들을 사용할때

클라이언트 컴포넌트는 meatadata를 export할수없다.

--------------------------------------------------------------------------------------------------------------------------------------

**어떤일이 발생하기를 기다리려고 await를 사용하는데 부모함수에는 무조건 async가 있어야함.**

Nextjs는 fetch같은걸로 데이터를 한번 가져오면 기억한다
어떤데이터를 얻었는지 기억하고 다시 fetch할 필요가 없는것이다.

front단에서 보면 관리자도구 - 네트워크 찾아봐도 영화 api에 관한건 나오지않는다
- back단에서 처리를 하기떄문에 사용자는 api정보를 알수도없고 front단에서 fetch를 하지않으니 속도면에서 더 좋다

현재 문제는 렌더링이 백단에서만 돌고있기 때문에 사용자는 진행과정이나 상태를 볼수가없다.

**해결방안**
- 해당폴더 loading 컴포넌트를 작성하면 된다.
usestate같은걸 안써또 즉각적인 로딩상태를 볼수있다.

원래 fetch는 순환식 진행하는걸 병렬처리하는법을 배워야한다.
const movie = await getMovie(id);
const videos = await getVideos(id);
movie가 20ms / videos가 1.5ms걸린다고 해도 합해서 21.5ms가 걸릴것이다.
**병렬수행 해결법은 promise.all함수이다.**
ex) const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);

**Promise.all()이란? **
자바스크립트에서 여러 비동기 작업을 동시에 실행하고, 모든 작업이 완료될 때까지 기다렸다가 결과를 배열 형태로 반환하는 함수입니다. 
쉽게 말해, 여러 Promise를 모두 이행할 때까지 기다린 후, 그 결과를 한꺼번에 받아볼 수 있게 해줍니다.

이 방식도 문제가있었는데 page파일에서 두가지 fetch해야했는데 이 두가지를 병렬적으로 fetch하는방법이있다.
- 두가지 컴포넌트를 만들어서 따로 fetch하게함
- 그 두개의 컴포넌트를 Suspense태그에 감싸 render함

**Suspense**
로딩창을 분리할수있게해주는 태그

-----------------------------------------------------------------------------------------------------------------------------------------

# 4.0 DEPLOYMENT

1. vercel.com 계정 만들기

2. github에 올리기전 .gitignore 생성후 업로드 안할 파일 적기
	gitignore 내용
	/node_modules
	/.pnp
	.pnp.js
	.yarn/install-state.gz

	/coverage

	/.next/
	/out/

	/build

	.DS_Store
	*.pem

	npm-debug.log*
	yarn-debug.log*
	yarn-error.log*

	.env*local

	.vercel

	*.tsbuildinfo
	next-env.d.ts


-------------------------------------------------------------------------------------------------------------------------------------------------

같은 파일내 모든 css를 만들고싶지 않아서 css 모듈을 만든다!
css 모듈파일 이름엔 name.module.css 를 해야한다.

export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
}는 동적인 metadata를 만들수있다.
- :[id] 를 받는 디테일 페이지처럼 동적으로 변하는 페이지에 대응하기위함이다 
