# WrenchFlow ERP

Workshop management app split into two folders:

- **frontend** (this folder) — React 18 + Vite, Redux Toolkit, React Router, Axios, Bootstrap 5 (dark theme, English only).
- **backend/** — a standalone [json-server](https://github.com/typicode/json-server) API with the JSON database and all business-rule handlers.

## Run

Two terminals:

```bash
# 1) backend
cd backend
npm install
npm start          # http://localhost:3001/api

# 2) frontend
npm install
npm run dev
```

From the project root you can also use `npm run backend` / `npm run backend:install`.

Demo accounts: `m.adel / admin123` (Admin), `heba / 1234` (Receptionist), `omar.k / 1234` (Technician).

## Configuration

`.env`:

```
VITE_API_BASE_URL=http://localhost:3001/api
VITE_SHOW_DEMO=true
```

`VITE_API_BASE_URL` is where the frontend calls the backend, `VITE_SHOW_DEMO` shows the demo-account box
on the login page.

## Backend

```
backend/
  server.js            json-server app: /api handlers + raw REST over data/db.json
  data/db.json         the mock database (edit it freely; writes are persisted)
  src/
    api.js             route table mounted on /api
    store.js           data access over the json-server lowdb instance
    dto.js             joined/computed response shapes
    errors.js          ApiError + { code, params } error responses
    constants.js       roles and specialization rules
    handlers/          auth, people, users, jobOrders, faults, spareParts, invoices, releases
```

Auth is a demo token: `POST /api/auth/login` returns `wf-token-<userId>`, sent back as `Authorization: Bearer wf-token-<userId>`.
Besides `/api`, json-server also serves the raw collections (`GET /people`, `GET /jobOrders`, ...) for debugging.

## Structure (frontend)

```
src/
  api/
    axiosClient.js        axios instance, auth header, 401 handling
    services/             one file per resource (REST calls only)
  app/                    store, createCrudSlice, createApiThunk
  components/
    common/               DataTable, FormModal, CrudModals, ContextMenu, Panel, StatCard...
    layout/               Sidebar, Topbar, MainLayout
  features/               one folder per module: slice + page(s)
    auth  ui  dashboard  people  customers  users  specializations
    jobOrders  faults  spareParts  invoices  releases
  hooks/                  useT, useLoad, useActions, useModalState, usePermissions, useContextMenu
  i18n/                   en.js + translate()
  routes/                 routesConfig (single source for router + sidebar), ProtectedRoute
  styles/index.css        small dark-theme layer on top of Bootstrap
  utils/                  constants, validators, badges, errors, format
```

## Conventions

- **Language**: UI text lives in `src/i18n/en.js` (English only, LTR). Data and status codes stay in English; the UI translates them with `t('enums.<group>.<value>')`.
- **Errors**: the API answers `{ code, params }`; the UI shows `errors.<code>`.
- **Roles**: `Admin`, `Receptionist`, `Technician`; access is defined in `routes/routesConfig.jsx`.
- **New CRUD page**: create a service, `createCrudSlice(...)`, register it in `app/store.js`, then copy `PeoplePage.jsx` (table + `CrudModals`), and add the matching route + handler in `backend/src`.

## Backend notes (gaps between the SQL schema and the UI)

- `Users` has no role column. The UI expects `role` (`Admin | Receptionist | Technician`) and one `specializationId` per user.
- Release rule: an unpaid balance can only be overridden by an admin, who must enter a reason (stored in `VehicleReleases.AdminApprovalReason`).
- `InvoiceItems`, `JobOrderFaultSpareParts` and `ActivityLogs` have no screens yet.
