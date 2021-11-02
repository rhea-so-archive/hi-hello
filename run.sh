docker pull rheaso/hihello:1.0.0
kubectl apply -f kubernetes/deployments.yaml
kubectl apply -f kubernetes/services.yaml
kubectl apply -f kubernetes/horizontal_pod_autoscaler.yaml
