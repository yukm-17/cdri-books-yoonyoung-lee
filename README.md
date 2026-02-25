# 프로젝트 개요

카카오 도서 검색 API를 사용해 책을 검색하고, 원하는 책을 찜해서 목록으로 관리하는 웹앱입니다.

# 환경 설정

- Node.js: v20 이상
- npm: v11.6 이상

# 실행방법

### 1. 환경 변수 설정

프로젝트 루트 경로에 .env 파일을 생성하고 아래와 같이 작성합니다.
프론트에서 사용할 수 있도록 접두어 VITE\_를 붙여 작성합니다.

```
VITE_KAKAO_API_URL=API를 호출할 URL
VITE_KAKAO_API_KEY=발급받은 REST API KEY
```

### 2. 의존성 설치

프로젝트에 사용된 패키지를 설치합니다.

```
npm install or npm i
```

### 3. 서버 실행

서버를 실행하면 http://localhost:5173 에서 앱을 확인할 수 있습니다.

```
npm run dev
```

### 4. 빌드

배포할 빌드 파일을 확인할 수 있습니다.

```
npm run build
```

# 폴더 구조 및 주요 코드 설명

### > 폴더 구조

```
├── api // => axios 설정 및 인스턴스, API URL과 관련 타입 모음
│   ├── api.ts
│   ├── instance.ts
│   └── types.ts
├── App.tsx
├── assets // => 이미지, svg 등 파일 모음
│   ├── heart_outline.svg
│   ├── heart.svg
│   └── icon_book.png
├── components // => 공통 재사용 컴포넌트 모음
│   ├── ContentsLayout.tsx
│   ├── CountDescription.tsx
│   ├── Header.tsx
│   ├── ItemPrice.tsx
│   ├── ItemThumbnail.tsx
│   ├── ListItem.tsx
│   ├── ListWrap.tsx
│   ├── NoResults.tsx
│   └── ui // => Shadcn/ui 컴포넌트
│   ├── button.tsx
│   ├── input.tsx
│   ├── pagination.tsx
│   ├── popover.tsx
│   ├── select.tsx
│   └── sheet.tsx
├── consistent // => 공통 상수
│   └── consistent.ts
├── index.css
├── lib // => Tailwindcss 유틸리티
│   └── utils.ts
├── main.tsx
├── pages // => 메뉴별 페이지 레이아웃 모음
│   ├── SearchPage.tsx
│   └── WishListPage.tsx
├── router.tsx // => 라우터 설정
├── stores // => Zustand 스토어 설정
│   └── useWishiListStore.ts
└── types // => 공통 타입 모음
└── types.ts
```

### > 주요 코드 설명

### SearchPage.tsx

전체 검색과 상세 검색을 구분하기 위해 mode 플래그를 세워 구분하고, 동시 검색을 방지하기 위해 keyword는 통합해서 쿼리가 keyword에 따라 실행되도록 설정했습니다.
keyword는 전체 검색과 상세 검색 각 input에서 작성한 값으로 설정됩니다.

```
const [state, setState] = useState<SearchState>({
    mode: 'global',
    keyword: '',
})

const { data: searchData = DEFAULT_SEARCH_DATA, refetch } = useQuery({
    queryKey: ['search', state.keyword, page],
    queryFn: () =>
        searchBook({
            query: state.keyword,
            target: state.mode === 'global' ? undefined : target,
            page,
            size: PAGE_SIZE,
        }),
    select: ({ data }) => ({
        meta: data.meta,
        documents: data.documents.map(item => ({
            ...item,
            contents: item.contents.trim() ? item.contents : '-',
        })),
    }),
    placeholderData: prev => prev,
    enabled: !!state.keyword,
})
```

검색 결과가 없는 경우 별도 컴포넌트를 렌더링해서 빈 리스트가 아닌 '결과가 없는 상태'를 사용자 관점에서 명확히 인지할 수 있도록 하고자 했습니다.

```
{!searchData.documents.length ? (
    <NoResults>검색된 결과가 없습니다.</NoResults>
) : (
    <ListWrap
        totalCount={searchData.meta.total_count}
        isEnd={searchData.meta.is_end}
        page={page}
        setPage={setPage}
    >
        {searchData.documents.map(item => (
            <ListItem key={item.isbn} data={item} />
        ))}
    </ListWrap>
)}
```

### useWishiListStore.ts

전역 상태 관리 라이브러리를 활용해 새로고침 및 브라우저 재시작시에도 찜 목록이 유지되도록 persist 미들웨어를 사용, 사용자 로컬 스토리지에 데이터를 저장하는 형태로 스토어를 설정했습니다.
목록에서 찜 해제 등 상태가 변경되면 곧바로 데이터를 갱신해 사용자 관점에서 실시간으로 처리되도록 구현했습니다.

```
export const useWishiListStore = create(
	persist(
		subscribeWithSelector(
			combine(initialState, set => ({
				setWishList: (document: Document) =>
					set(state => {
						const documents = [...state.wishList.documents, document]

						return {
							wishList: {
								meta: {
									...state.wishList.meta,
									total_count: documents.length,
								},
								documents,
							},
						}
					}),
				removeWishList: (isbn: string) =>
					set(state => {
						const documents = state.wishList.documents.filter(item => item.isbn !== isbn)

						return {
							wishList: {
								meta: {
									...state.wishList.meta,
									total_count: documents.length,
								},
								documents,
							},
						}
					}),
			})),
		),
		{
			name: 'wishList',
		},
	),
)
```

# 라이브러리 선택 이유

### > shadcn

필요한 컴포넌트만 설치해서 사용하기에 번들 부담이 줄고, 직접 수정할 수 있으며 유지보수성이 높습니다.
Tailwind CSS 기반이라 css 파일없이 클래스만으로 스타일링이 가능합니다.

### > zustand

구조가 간단하고, React useState와 유사한 방식으로 필요한 전역 상태만 구독해서 간단하게 관리할 수 있습니다.

### > vite

상태를 유지한 채로 변경된 파일만 즉시 리로드 하기 때문에 체감 속도가 빠릅니다.
설정할 것이 거의 없어서 간단하게 쓸 수 있는 점이 있습니다.

# 강조 하고 싶은 기능

- 전체 검색은 엔터만으로 바로 검색 가능할 수 있습니다.
- 빈 문자열, 결과가 없는 상태 등 예외 상황을 빈 문자열이나 별도 컴포넌트를 생성해 사용자 관점에서 직관적으로 이해할 수 있도록 처리했습니다.
- 페이지 수가 많을 때 Ellisis 컴포넌트를 추가해서 더 많은 정보를 인지할 수 있도록 처리했습니다.
