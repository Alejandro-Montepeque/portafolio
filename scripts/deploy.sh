#!/usr/bin/env bash
#
# Build de imagen Docker, push a Artifact Registry y deploy a Cloud Run.
# Uso: ./scripts/deploy.sh

set -euo pipefail

SERVICE_NAME="${SERVICE_NAME:-portfolio}"
REGION="${REGION:-us-central1}"
REPOSITORY="${REPOSITORY:-cloud-run-source-deploy}"

PROJECT_ID="$(gcloud config get-value project 2>/dev/null || true)"
if [[ -z "${PROJECT_ID}" ]]; then
  echo "[error] no hay proyecto activo. Corre: gcloud config set project TU_PROJECT_ID"
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "[error] docker no está instalado o no está corriendo."
  exit 1
fi

IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${SERVICE_NAME}"
TAG="$(git rev-parse --short HEAD 2>/dev/null || date +%s)"

cat <<EOF
Proyecto: ${PROJECT_ID}
Servicio: ${SERVICE_NAME}
Región:   ${REGION}
Imagen:   ${IMAGE}:${TAG}

EOF

read -r -p "¿Continuar? [y/N] " confirm
if [[ ! "${confirm}" =~ ^[yY]$ ]]; then
  echo "Cancelado."
  exit 0
fi

echo
echo "Configurando Docker para Artifact Registry..."
gcloud auth configure-docker "${REGION}-docker.pkg.dev" --quiet

echo
echo "Verificando repositorio Artifact Registry..."
if ! gcloud artifacts repositories describe "${REPOSITORY}" --location="${REGION}" >/dev/null 2>&1; then
  gcloud artifacts repositories create "${REPOSITORY}" \
    --repository-format=docker \
    --location="${REGION}" \
    --description="Cloud Run images" \
    --quiet
fi

echo
echo "Build de imagen Docker..."
docker build \
  -t "${IMAGE}:${TAG}" \
  -t "${IMAGE}:latest" \
  .

echo
echo "Push a Artifact Registry..."
docker push --all-tags "${IMAGE}"

echo
echo "Deploy a Cloud Run..."
gcloud run deploy "${SERVICE_NAME}" \
  --image="${IMAGE}:${TAG}" \
  --region "${REGION}" \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 256Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 2 \
  --quiet

echo
echo "URL:"
gcloud run services describe "${SERVICE_NAME}" \
  --region "${REGION}" \
  --format='value(status.url)'
