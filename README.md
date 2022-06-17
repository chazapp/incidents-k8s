# incidents-k8s

This repository contains a Kustomize package that
installs the Incidents project in a Kubernetes cluster.

## Usage

// Provide secrets.yml and apply it to the cluster

```
---
kind: Secret
metadata:
    name: incidents-api-secret
type: Opaque
stringData:
    SECRET_KEY: ...
    DB_USER: ...
    DB_PASSWORD: ...
    DB_NAME: ...
```


// Provide a PV and a PVC to be mounted by the Postgres Database. The PVC is not applied by kustomize, to avoid
loss of data in the event of a `kubectl delete -k`.





// Provide the ingress DNS records 

```
$ kubectl apply -k incident-k8s
```