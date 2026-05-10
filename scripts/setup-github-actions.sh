#!/usr/bin/env bash
#
# Configura Workload Identity Federation para que GitHub Actions pueda
# deployar a Cloud Run sin usar Service Account JSON keys.
#
# Uso: ./scripts/setup-github-actions.sh OWNER/REPO

set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Uso: $0 OWNER/REPO"
  exit 1
fi

GITHUB_REPO="$1"
if [[ ! "${GITHUB_REPO}" =~ ^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$ ]]; then
  echo "[error] formato inválido. Usa OWNER/REPO"
  exit 1
fi

PROJECT_ID="$(gcloud config get-value project 2>/dev/null)"
if [[ -z "${PROJECT_ID}" ]]; then
  echo "[error] no hay proyecto activo. Corre: gcloud config set project TU_PROJECT_ID"
  exit 1
fi
PROJECT_NUMBER="$(gcloud projects describe "${PROJECT_ID}" --format='value(projectNumber)')"

SERVICE_ACCOUNT_NAME="github-actions-deployer"
SERVICE_ACCOUNT_EMAIL="${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
POOL_ID="github-pool"
PROVIDER_ID="github-provider"

cat <<EOF
Proyecto:        ${PROJECT_ID}
Service Account: ${SERVICE_ACCOUNT_EMAIL}
Pool/Provider:   ${POOL_ID} / ${PROVIDER_ID}
Repo:            ${GITHUB_REPO}

EOF

read -r -p "¿Continuar? [y/N] " confirm
if [[ ! "${confirm}" =~ ^[yY]$ ]]; then
  echo "Cancelado."
  exit 0
fi

echo
echo "Habilitando APIs..."
gcloud services enable \
  iam.googleapis.com \
  iamcredentials.googleapis.com \
  sts.googleapis.com \
  --quiet

echo
echo "Creando Service Account..."
if ! gcloud iam service-accounts describe "${SERVICE_ACCOUNT_EMAIL}" --quiet >/dev/null 2>&1; then
  gcloud iam service-accounts create "${SERVICE_ACCOUNT_NAME}" \
    --display-name="GitHub Actions Deployer" \
    --quiet
else
  echo "  ya existe"
fi

echo
echo "Otorgando roles..."
for role in \
  "roles/run.admin" \
  "roles/iam.serviceAccountUser" \
  "roles/cloudbuild.builds.editor" \
  "roles/artifactregistry.admin" \
  "roles/storage.admin" \
  "roles/logging.logWriter"; do
  gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
    --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" \
    --role="${role}" \
    --condition=None \
    --quiet >/dev/null
  echo "  ${role}"
done

echo
echo "Creando Workload Identity Pool..."
if ! gcloud iam workload-identity-pools describe "${POOL_ID}" \
    --location=global --quiet >/dev/null 2>&1; then
  gcloud iam workload-identity-pools create "${POOL_ID}" \
    --location=global \
    --display-name="GitHub Actions Pool" \
    --quiet
else
  echo "  ya existe"
fi

echo
echo "Creando Workload Identity Provider..."
if ! gcloud iam workload-identity-pools providers describe "${PROVIDER_ID}" \
    --workload-identity-pool="${POOL_ID}" \
    --location=global --quiet >/dev/null 2>&1; then
  gcloud iam workload-identity-pools providers create-oidc "${PROVIDER_ID}" \
    --location=global \
    --workload-identity-pool="${POOL_ID}" \
    --display-name="GitHub Provider" \
    --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.repository_owner=assertion.repository_owner" \
    --attribute-condition="assertion.repository_owner == '${GITHUB_REPO%%/*}'" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --quiet
else
  echo "  ya existe"
fi

echo
echo "Vinculando repo al Service Account..."
gcloud iam service-accounts add-iam-policy-binding "${SERVICE_ACCOUNT_EMAIL}" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/attribute.repository/${GITHUB_REPO}" \
  --quiet >/dev/null

PROVIDER_RESOURCE="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/providers/${PROVIDER_ID}"

cat <<EOF

Listo. Pegá estos valores en GitHub > Settings > Secrets and variables > Actions:

  GCP_PROJECT_ID              ${PROJECT_ID}
  GCP_SERVICE_ACCOUNT         ${SERVICE_ACCOUNT_EMAIL}
  GCP_WORKLOAD_IDENTITY_PROV  ${PROVIDER_RESOURCE}

EOF
