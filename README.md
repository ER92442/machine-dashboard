# Machine Dashboard

A small React + Vite frontend for viewing machines.

## Run locally (development)

Requirements: Node 16+ and npm or yarn.

Install dependencies and start dev server:

```bash
npm install
npm run dev
```

Open in browser: http://localhost:5173

## Build (production)

Build the static site:

```bash
npm run build
```

Preview the production build locally (Vite):

```bash
npm run preview
```

Or build a Docker image and serve with Nginx:

```bash
docker build -t your-registry/machine-dashboard:latest .
docker push your-registry/machine-dashboard:latest
```

## Deploy to Kubernetes

1. Build and push the Docker image (see above).
2. Update `k8s/deployment.yaml` to use your image (replace `YOUR_IMAGE_HERE:latest`).
3. Apply the manifests:

```bash
kubectl apply -f k8s/
```

To update only the image on an existing deployment:

```bash
kubectl set image deployment/<deployment-name> <container-name>=your-registry/machine-dashboard:latest
```

Access the app in the cluster:

- Dev: http://localhost:5173
- Kubernetes (example NodePort): http://<node-ip>:30080 (replace `<node-ip>` with a node IP or use an Ingress)

## Assumptions and shortcuts taken

- Frontend is static; runtime config is injected via an entrypoint that writes `config.js` (see `k8s/` notes).
- Example Kubernetes manifests use a NodePort for simplicity (not production-ready).
- No CI/CD or automated image build pipeline included.
- Minimal security, logging, and observability configuration.

## What I'd improve or add with more time

- Add CI pipeline to build, test, and publish Docker images automatically.
- Create a proper Ingress with TLS and a DNS record (replace NodePort).
- Add health/readiness probes and better resource/replica settings for k8s.
- Improve accessibility, i18n, and error handling in the UI.
