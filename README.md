# incidents-k8s

This repository contains a Kustomize package that
installs the Incidents project in a Kubernetes cluster.

## Usage

// Provide secrets.yml and apply it to the cluster
// Provide a PV and a PVC to be mounted by the Postgres Database
// Provide the ingress DNS records 

```
$ kubectl apply -k incident-k8s
```