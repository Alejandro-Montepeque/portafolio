# Despliegue en Google Cloud Run (gratis)

Esta guía te lleva de cero a un portafolio público en una URL `https://...run.app`,
manteniéndote **dentro del free tier de Google Cloud para siempre**.

## ¿Por qué Cloud Run y por qué es gratis?

**Cloud Run** ejecuta contenedores Docker que escalan automáticamente. Cuando
nadie visita tu sitio, **escala a cero contenedores corriendo = $0**.

**Always Free Tier** (renovable cada mes, sin caducidad):

- 2,000,000 de requests / mes
- 360,000 segundos de vCPU / mes
- 180,000 GiB-segundos de memoria / mes
- 1 GiB de tráfico de salida desde Norteamérica / mes

Un portafolio recibe típicamente entre 10 y 1,000 visitas al mes. Estás
**varios órdenes de magnitud** por debajo del límite. El costo real es **$0**.

## Pasos en Google Cloud (una sola vez)

### 1. Crear cuenta y proyecto

1. Andá a [console.cloud.google.com](https://console.cloud.google.com).
2. Iniciá sesión con tu Gmail (`jonathanmontepeque@gmail.com` está bien).
3. Aceptá los términos. Te van a pedir tarjeta de crédito **solo para verificar
   identidad** — no se cobra si te quedás en free tier. Te dan $300 USD
   de crédito gratis los primeros 90 días, pero ni los vas a usar.
4. Arriba, en la barra superior, hacé click en el selector de proyecto y dale
   en **"Nuevo proyecto"**. Llamalo por ejemplo `portafolio-alejandro`.
5. Anotá el **Project ID** (es lo que aparece debajo del nombre, tipo
   `portafolio-alejandro-123456`).

### 2. Habilitar billing

1. Menú lateral → **Billing** → **Vincular cuenta de facturación**.
2. Si es tu primera vez, vas a crear una cuenta de facturación con la tarjeta.

> **Tranquilo:** tu portafolio no va a generar costo. Te explico abajo cómo
> ponerle alertas para asegurarte.

### 3. Habilitar APIs necesarias

Menú lateral → **APIs y servicios** → **Biblioteca**. Activá estas tres:

- Cloud Run API
- Cloud Build API
- Artifact Registry API

O si ya tenés `gcloud` instalado, en una terminal:

```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com
```

### 4. Instalar gcloud CLI (en tu Mac)

```bash
brew install --cask google-cloud-sdk
gcloud init
```

`gcloud init` te abre el navegador para que te loguees y elijas tu proyecto.

Verificá:

```bash
gcloud config list
```

Debería mostrar tu cuenta y `project = portafolio-alejandro-...`.

## Pasos en tu repo (ya están hechos)

Ya tenés en este proyecto los 3 archivos clave:

- **`Dockerfile`** — multi-stage: build con Node, runtime con nginx alpine
- **`nginx.conf`** — escucha en `$PORT` (Cloud Run inyecta esa variable)
- **`cloudbuild.yaml`** — pipeline opcional para CI/CD

No necesitás tocar nada para desplegar.

## Desplegar (un solo comando)

### Opción A — Script automatizado (recomendado)

Desde la raíz del proyecto:

```bash
./scripts/deploy.sh
```

El script lee tu proyecto activo de `gcloud`, construye y despliega.

### Opción B — Manualmente

```bash
gcloud run deploy portfolio \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 256Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 2
```

¿Qué hace cada flag?

- `--source .` — Cloud Build empaqueta tu carpeta y construye la imagen.
- `--region us-central1` — Iowa, USA. Free tier más generoso aquí.
- `--allow-unauthenticated` — público en internet (lo que querés).
- `--port 8080` — puerto que escucha nginx en el contenedor.
- `--memory 256Mi` — mínima posible (suficiente para nginx).
- `--cpu 1` — 1 vCPU.
- `--min-instances 0` — **clave para gratis**: si nadie visita, no hay nada
  corriendo y no se cobra.
- `--max-instances 2` — tope de seguridad para no salirte del free tier ni
  aunque te llegue mucho tráfico.

Después de 3–5 minutos te muestra:

```
Service URL: https://portfolio-XXXXX-uc.a.run.app
```

Esa es tu URL pública. Funciona desde el primer momento, con HTTPS automático.

## Dominio propio (opcional)

Si comprás un dominio (ej. `alejandromontepeque.dev` en Namecheap por ~$15/año):

```bash
gcloud beta run domain-mappings create \
  --service portfolio \
  --domain alejandromontepeque.dev \
  --region us-central1
```

Te va a dar registros DNS (CNAME / A) que pegás en tu proveedor del dominio.
Listo.

## CI/CD: deploy automático en cada push a GitHub (opcional)

1. Andá a la consola → **Cloud Build** → **Triggers** → **Crear trigger**.
2. Conectá tu repo de GitHub `Alejandro-Montepeque/portafolio` (te va a pedir
   autorizar la app de Cloud Build).
3. Configurá:
   - Evento: **Push to a branch** (`^main$`)
   - Configuración: **Cloud Build configuration file** → `/cloudbuild.yaml`
4. Guardá. A partir de ahora, cada `git push origin main` → deploy automático.

## Alertas de costo (recomendadísimo)

Para dormir tranquilo, ponete una alerta a $1:

1. Menú → **Billing** → **Budgets & alerts** → **Crear presupuesto**.
2. Nombre: `portfolio-budget`. Monto: **$1 USD**.
3. Alertas: marcá **50%, 90%, 100%**.

Si por algún motivo empezás a gastar (no debería pasar), te llega correo
inmediatamente.

## Troubleshooting

**"Permission denied"** — corré `gcloud auth login` de nuevo.

**Build falla con "Dockerfile not found"** — asegurate de estar en la raíz
del proyecto donde está el `Dockerfile`.

**El sitio carga pero las rutas dan 404** — el `nginx.conf` ya tiene el
fallback SPA configurado. Si seguís viendo el error, verificá que se haya
copiado correctamente al contenedor.

**Tarda mucho en cargar la primera vez** — es el "cold start" de Cloud Run
porque escala a cero. Carga la página una vez y la siguiente está caliente
por unos minutos. Para evitarlo del todo: `--min-instances 1` (pero ya no
es gratis, te cuesta como $5/mes).

## Resumen

```bash
# 1. Una vez: setup
gcloud init
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

# 2. Cada vez que querés actualizar:
./scripts/deploy.sh
```

Eso es todo. Bienvenido al free tier de GCP.
