# Kubernetes Manifests - Frontend

**Prerequisites:** Database, product, and order services must exist.

## Apply

```bash
kubectl apply -f dev/deployment.yaml
kubectl apply -f dev/service.yaml
```

## Image Update (Jenkins)

```bash
kubectl set image deployment/ecomm-frontend frontend=FULL_IMAGE -n ecomm-dev
```

## API URLs

The frontend uses `window.location.hostname` + NodePort for API calls. Default ports (30001, 30002) work for dev. For staging/prod, build the image with:

- Staging: `REACT_APP_PRODUCT_PORT=30101 REACT_APP_ORDER_PORT=30102`
- Prod: `REACT_APP_PRODUCT_PORT=30201 REACT_APP_ORDER_PORT=30202`

## NodePorts

| Env    | Frontend | Product | Order |
|--------|----------|---------|-------|
| dev    | 30000    | 30001   | 30002 |
| staging| 30100    | 30101   | 30102 |
| prod   | 30200    | 30201   | 30202 |

## Access

```bash
minikube service ecomm-frontend -n ecomm-dev --url
```
