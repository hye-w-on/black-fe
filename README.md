### Apps and Packages

vite-ts sample app

---

### Components directory tree

- components
  - `atoms`
  - `molecules`
  - `organisms`
  - `templates` : layout
- pages
  - domains
    - BBS list : ReactQuery Pagination Prefetch 사용 예제 (with BE) [x]
    - Todo list : 불필요한 리렌더링 방지 React.memo 테스트 샘플 [x]

---

### Dependencies

#### API

- Axios
- react-query v5
- API Mocking : Mock Service Worker v2: https://mswjs.io/docs/cli/init

#### 상태관리

- Context를 사용한 상태관리 : `menu`

#### CSS Styling

- UI 라이브러리 : @mui/material @mui/icons-material
- Style : @emotion/react @emotion/styled (Mui 권장)

#### 다국어

- react-i18next i18next

#### ECT

- Router

  - react-router-dom v6
  - Router Component lazy loading

- uuid @types/uuid
- 달력 @mui/x-date-pickers dayjs
