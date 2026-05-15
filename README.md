# Projet Étudiants — Plateforme Micro Services

## Description

Projet pédagogique de gestion des étudiants basé sur une architecture micro services.  
La plateforme permet de gérer les étudiants, les notes, l’authentification et les notifications.  
Le projet utilise Spring Boot, Node.js, Next.js, PostgreSQL, MongoDB, Redis, Kafka, Docker, Kubernetes, Helm et AWS.

## Architecture

L’architecture finale est Kubernetes-native.  
Eureka, Feign et Spring Cloud Gateway ont été supprimés.  
La découverte de services est assurée par le DNS interne Kubernetes.  
L’exposition externe est assurée par Ingress.

<img width="1536" height="1024" alt="architecture global " src="https://github.com/user-attachments/assets/43f5f108-9923-43b7-a5b0-6980f8065ac3" />


## Micro services

| Service | Description | Port |
|---|---|---|
| etudiant-service | Gestion des étudiants | 8081 |
| grading-service | Gestion des notes | 8082 |
| notification-service | Notifications Kafka | 8083 |
| auth-service | Authentification JWT | 3001 |
| frontend | Interface Next.js | 3000 |

## Stack technique

| Composant | Technologie |
|---|---|
| Backend étudiant | Spring Boot, PostgreSQL, Redis |
| Backend notes | Spring Boot, PostgreSQL |
| Notifications | Spring Boot, Apache Kafka |
| Authentification | Node.js, Express, MongoDB, JWT |
| Frontend | Next.js, Tailwind CSS |
| Orchestration | Kubernetes, K3S, Helm |
| Observabilité | Prometheus, Grafana, ELK |
| CI/CD | GitHub Actions, Jira, Xray |

## Lancement rapide

### Prérequis

- Docker Desktop
- Java 25
- Maven 3.9+
- Node.js 20+
- kubectl
- Helm 3
- K3S

### Docker Compose

```bash
git clone https://github.com/sen5e1/projet-etudiants.git
cd projet-etudiants
docker compose up --build
````

### Kubernetes K3S

```bash
kubectl apply -f k8s/secrets/
kubectl apply -f k8s/postgres/
kubectl apply -f k8s/mongodb/
kubectl apply -f k8s/redis/
kubectl apply -f k8s/kafka/
kubectl apply -f k8s/etudiant-service/
kubectl apply -f k8s/grading-service/
kubectl apply -f k8s/notification-service/
kubectl apply -f k8s/auth-service/
kubectl apply -f k8s/frontend/
kubectl apply -f k8s/ingress.yaml
```

### Helm

```bash
helm install projet-etudiants ./helm/projet-etudiants/
kubectl get pods --watch
```

## Tests

### Tests backend

```bash
mvn verify
```

### Tests frontend Cypress

```bash
cd frontend
npx cypress run
```

### Tests de charge Gatling

```bash
mvn gatling:test
```

## Structure du projet

```text
/projet-etudiants/
├── api-spring-boot/ # Micro service étudiant (Spring Boot)
├── grading-service/ # Micro service notes (Spring Boot)
├── notification-service/ # Micro service notifications + Kafka consumer
├── auth-service/ # Micro service auth (Node.js + Express + MongoDB)
├── frontend/ # Application Next.js
│ └── cypress/e2e/ # Tests E2E Cypress
├── mobile-app/ # Application Flutter ou React Native
├── helm/
│ └── projet-etudiants/ # Chart Helm packagisant toute la plateforme
│ ├── Chart.yaml
│ ├── values.yaml
│ ├── values-prod.yaml
│ └── templates/
├── k8s/ # Manifests Kubernetes bruts (avant Helm)
│ ├── secrets/
│ ├── postgres/
│ ├── mongodb/
│ ├── redis/
│ ├── kafka/
│ ├── etudiant-service/
│ ├── grading-service/
│ ├── notification-service/
│ ├── auth-service/
│ ├── frontend/
│ └── ingress.yaml
├── observability/
│ ├── logstash/pipeline/
│ └── prometheus/
├── .github/
│ ├── workflows/
│ │ └── test-and-report.yml
│ ├── ISSUE_TEMPLATE/
│ └── pull_request_template.md
├── docker-compose.yml
└── README.md # README professionnel avec captures d'écran
```

## Architecture AWS

La version cloud repose sur Amazon EKS pour Kubernetes, RDS pour PostgreSQL, DocumentDB pour MongoDB, MSK pour Kafka, ElastiCache pour Redis, ECR pour les images Docker, Secrets Manager pour les secrets, CloudWatch et Managed Grafana pour l’observabilité.

## Auteur

Nawres Zarrouki
Formation DevOps / Cloud
Année 2026

```
```
