# CI/CD con GitHub Actions

Cada `git push` a `main` despliega automáticamente a Cloud Run.

Usamos **Workload Identity Federation (WIF)** — la forma moderna y segura,
sin manejar Service Account JSON Keys (que pueden leakear).

## Cómo funciona

```
┌─────────────────┐    OIDC token    ┌──────────────────┐
│  GitHub Actions │ ───────────────▶ │  Workload Identity│
│  (workflow)     │                  │  Pool (GCP)       │
└─────────────────┘                  └──────────────────┘
                                              │
                                              ▼
                                     ┌──────────────────┐
                                     │  Service Account  │
                                     │  + roles Cloud Run│
                                     └──────────────────┘
                                              │
                                              ▼
                                     ┌──────────────────┐
                                     │   Cloud Run      │
                                     │   (deploy)       │
                                     └──────────────────┘
```

GitHub firma un token OIDC corto (rota automáticamente). Ese token se intercambia
por credenciales de GCP que sólo ese repo específico puede usar.

## Setup (una sola vez, ~5 min)

### 1. Subí el proyecto a GitHub

Si todavía no lo hiciste:

```bash
cd /Users/alejandro/Documents/Personal/portafolio

# Inicializa git (si no lo hiciste)
git init -b main
git add .
git commit -m "feat: initial portfolio"

# Conecta con GitHub (reemplaza con tu repo)
git remote add origin https://github.com/Alejandro-Montepeque/portafolio.git
git push -u origin main
```

### 2. Configura WIF en GCP

Desde la raíz del proyecto:

```bash
./scripts/setup-github-actions.sh Alejandro-Montepeque/portafolio
```

(Reemplaza `Alejandro-Montepeque/portafolio` por tu `OWNER/REPO` real si difiere)

El script:

- Crea un Service Account `github-actions-deployer@...`.
- Le asigna los roles necesarios (Cloud Run, Cloud Build, Artifact Registry).
- Crea el Workload Identity Pool y Provider.
- Restringe el acceso solo a tu repo de GitHub.
- Imprime los 3 valores que necesitás para los secrets.

### 3. Agregá los secrets en GitHub

GitHub → tu repo → **Settings → Secrets and variables → Actions** → **New
repository secret**.

Crea los 3 secrets que el script te imprimió:

| Nombre                          | Valor                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| `GCP_PROJECT_ID`                | `portafolio-montepeque`                                                                     |
| `GCP_SERVICE_ACCOUNT`           | `github-actions-deployer@portafolio-montepeque.iam.gserviceaccount.com`                     |
| `GCP_WORKLOAD_IDENTITY_PROV`    | `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/...`  |

### 4. Probá el deploy automático

```bash
git commit --allow-empty -m "ci: trigger first auto-deploy"
git push origin main
```

Andá a tu repo → pestaña **Actions** → vas a ver un workflow "Deploy to Cloud
Run" corriendo. Tarda 3-5 minutos. Cuando termine en verde, tu nueva URL queda
publicada.

## Lanzar deploy manual desde GitHub

GitHub → repo → **Actions** → **Deploy to Cloud Run** → **Run workflow** →
selecciona la branch → **Run**.

Esto sirve si necesitás re-deployar sin hacer un commit.

## Troubleshooting

**Error "permission denied" en el workflow** — esperá 1-2 min después del setup
script (las policies de IAM tardan en propagar) y volvé a lanzar el workflow.

**Error "container not built"** — el build puede tardar. Revisá los logs en
Cloud Build: `console.cloud.google.com/cloud-build/builds`.

**El workflow no arranca** — revisá que el archivo esté en `.github/workflows/deploy.yml`
y que hayas hecho push a `main`.

**¿Cómo sé si alguien intenta usar las credenciales desde otro repo?** — no
puede. La WIF está restringida con `attribute.repository_owner == '${OWNER}'`,
así que solo tu repo puede impersonar el service account.

## Beneficio para tu portafolio

Un reclutador que mire tu repo va a ver:

- ✓ Badge verde "Deploy to Cloud Run" en cada commit a `main`
- ✓ Workflow file demostrando que sabés CI/CD
- ✓ Uso de WIF (best practice moderna, no muchos lo hacen)
- ✓ Deploy a Cloud Run con Docker

Esto comunica seniority. La mayoría de portafolios juniors usan Vercel/Netlify,
que es excelente pero no demuestra DevOps.
